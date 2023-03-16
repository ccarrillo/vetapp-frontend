import { Component,  Injectable, OnInit, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';




/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  nombre: string;
  nombredetallado: string;
  id: number;
  padre: number;
  level: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  nombre: string;
  nombredetallado: string;
  level: number;
  expandable: boolean;
  id: number;
  padre: number;
  hasChild:boolean; // new property
}



 @Injectable()
 export class ChecklistDatabase {
   dataChange = new BehaviorSubject<TodoItemNode[]>([]);
   get data(): TodoItemNode[] { return this.dataChange.value; }
   sinData: boolean = false;
   dataSource = new MatTableDataSource<any>();
   constructor(private _api: ApiService,) {
    
     this.initialize();
   }
 
   initialize() {
     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
     //     file node as children.

     this._api.getTypeRequest('grupoanimal').subscribe({
      next: (data: any) => {
 
        //this.dataSource = data; //No pagina
        if (data) {
           const treee= this.buildFileTree(data, 0);
           this.dataChange.next(data);
           this.sinData = false;
          
          
        } else {
          this.sinData = true;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

   }
 
   /**
    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
    * The return value is the list of `TodoItemNode`.
    */
   buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    //console.log(obj.nombre );
     return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
       const value = obj[key];
       //console.log(value );
       const node = new TodoItemNode();
       node.nombre = key;
 
       if (value != null) {
         if (typeof value === 'object') {
           node.children = this.buildFileTree(value, level + 1);
         } else {
           node.nombre = value;
         }
       }
 
       return accumulator.concat(node);
     }, []);
   }

 
   /** Add an item to to-do list */
 insertItem(parent: TodoItemNode, name: string) {
     if (!parent.children) parent.children=[];
     parent.children.push({ nombre: name } as TodoItemNode);
     this.dataChange.next(this.data);
 }
 
   updateItem(node: TodoItemNode, name: string) {
     node.nombre = name;
     this.dataChange.next(this.data);
   }
  
  
   deleteItem(parent: TodoItemNode,name: string): void {
    if (parent.children) {
      parent.children = parent.children.filter(c => c.nombre !== name);
      this.dataChange.next(this.data);
    }
}
  
  
  

 }



@Component({
  selector: 'app-grupoanimal',
  templateUrl: './grupoanimal.component.html',
  styleUrls: ['./grupoanimal.component.sass'],
  providers: [ChecklistDatabase],
})
export class GrupoanimalComponent implements OnInit {
  id_grupo:any;
  editable:boolean = true;
  valororiginal="";
  textoDeInput: string = "";
  nuevoNombreTemporal: TodoItemFlatNode;

/** Map from flat node to nested node. This helps us finding the nested node to be modified */
flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

/** Map from nested node to flattened node. This helps us to keep the same object for selection */
nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

/** A selected parent node to be inserted */
selectedParent: TodoItemFlatNode | null = null;

/** The new item's name */
newItemName = '';

treeControl: FlatTreeControl<TodoItemFlatNode>;

treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;



/** The selection for checklist */
checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

constructor(private _database: ChecklistDatabase, private _api: ApiService,) {
  this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  _database.dataChange.subscribe(data => {
    this.dataSource.data = data;
  });
}
  ngOnInit(): void {
    
  }
  ngOnChanges(){

  }

getLevel = (node: TodoItemFlatNode) => node.level;

isExpandable = (node: TodoItemFlatNode) => node.expandable;

getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.nombre === '';

/**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
transformer = (node: TodoItemNode, level: number) => {
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode = existingNode && existingNode.nombre === node.nombre
      ? existingNode
      : new TodoItemFlatNode();
  
  flatNode.nombre = node.nombre;
  flatNode.nombredetallado = node.nombredetallado;
  flatNode.id= node.id;
  flatNode.padre= node.padre;
  flatNode.level = level;
  flatNode.expandable = true;                   // edit this to true to make it always expandable
  flatNode.hasChild = !!node.children?.length;  // add this line. this property will help 
                                                // us to hide the expand button in a node
  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);
  return flatNode;
}

/** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
  this.checklistSelection.toggle(node);
  this.checkAllParentsSelection(node);
}

/* Checks all the parents when a leaf node is selected/unselected */
checkAllParentsSelection(node: TodoItemFlatNode): void {
  let parent: TodoItemFlatNode | null = this.getParentNode(node);
  while (parent) {
    this.checkRootNodeSelection(parent);
    parent = this.getParentNode(parent);
  }
}

/** Check root node checked state and change it accordingly */
checkRootNodeSelection(node: TodoItemFlatNode): void {
  const nodeSelected = this.checklistSelection.isSelected(node);
  const descendants = this.treeControl.getDescendants(node);
  const descAllSelected = descendants.length > 0 && descendants.every(child => {
    return this.checklistSelection.isSelected(child);
  });
  if (nodeSelected && !descAllSelected) {
    this.checklistSelection.deselect(node);
  } else if (!nodeSelected && descAllSelected) {
    this.checklistSelection.select(node);
  }
}

/* Get the parent node of a node */
getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
  const currentLevel = this.getLevel(node);

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = this.treeControl.dataNodes[i];

    if (this.getLevel(currentNode) < currentLevel) {
      return currentNode;
    }
  }
  return null;
}

/** Select the category so we can insert the new item. */
addNewItem(node: TodoItemFlatNode) {
 this.nuevoNombreTemporal = node ;
     if (this.editable == true)
      {
        //Oculta el campo de texto
        this.editable = false;
       
      }
  const parentNode = this.flatNodeMap.get(node);
  this._database.insertItem(parentNode!, '');
  this.treeControl.expand(node);
}

cancelarItem(node: TodoItemFlatNode){
  const parentNode = this.getParentNode(node);

  // Map from flat node to nested node.
  const parentFlat = this.flatNodeMap.get(parentNode);

  this._database.deleteItem(parentFlat!, node.nombre);
  this.treeControl.expand(node);
  this.editable = true;
  this.id_grupo = '';

}

/** Save the node to database */
saveNode(node: TodoItemFlatNode, itemValue: string) {

  const nestedNode = this.flatNodeMap.get(node);
  this._database.updateItem(nestedNode!, itemValue);
  this.editable = true;
  this.id_grupo = '';
  node.level = node.level+1;
  node.nombre = itemValue;
  node.nombredetallado = this.nuevoNombreTemporal.nombredetallado+`/${itemValue}`;
  node.padre = this.nuevoNombreTemporal.id;
  //console.log(node);
  this._database.dataChange.next(this._database.data);
  this._api.postTypeRequest('grupoanimal', node).subscribe({
    next: (data) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Datos registrados Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
     
    },
    error: (error) => {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocurrio un error inesperado, vuelva a intentar',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

}

deleteNode(node: TodoItemFlatNode): void {

  this._api.getTypeRequest(`grupoanimal/existe/${node.id}`).subscribe({
    next: (data) => {
         if(!data){
               
          this._api.deleteTypeRequest('grupoanimal/' + node.id).subscribe({
            next: (data) => {
              let indice= this._database.dataChange.value[0].children.findIndex(index => index.id == node.id);
              this._database.dataChange.value[0].children.splice(indice, 1);
            
              this._database.dataChange.next(this._database.dataChange.value);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos eliminados correctamente',
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ocurrio un error inesperado, vuelva a intentar',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });


         
         }
         else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se puede elimnar este grupo, existe animales ligados a este grupo ',
            showConfirmButton: false,
            timer: 3500
          });
         }
      
    },
    error: (error) => {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocurrio un error inesperado, vuelva a intentar',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });


   
   
 }

 

  EditNode(nodeToBeEdited) {
        console.log(nodeToBeEdited);
         const id = nodeToBeEdited.id;
         this.valororiginal = nodeToBeEdited.item;
         this.textoDeInput = nodeToBeEdited.item;
      if (this.editable == true)
      {
        //Oculta el campo de texto
        this.editable = false;
        //Manda la variable con la que se va a comparar
        this.id_grupo = id;
      }
      else
      {
        this.editable = true;
        this.id_grupo = '';
      }
    };
      
   

   actualizar(node){
  
      let posicion = node.nombredetallado.indexOf("/");
      let ultimaPosicion=0;
       while ( posicion != -1 ) {
            ultimaPosicion=posicion;
            posicion = node.nombredetallado.indexOf("/",posicion+1);
            
          }
      if(ultimaPosicion>0)
      node.nombredetallado = node.nombredetallado.slice(0, ultimaPosicion+1).concat(node.nombre);
      else
      node.noombredetallado = node.nombre;
      
    this._api.putTypeRequest('grupoanimal/' + node.id, node).subscribe({
      next: (data) => {
        this._database;
        this.editable = true;
        this.id_grupo = '';
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos actualizados Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
       
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
   
    
   }

   cancelar(nodeToBeEdited) {
    console.log("ingreso a cancelar");
    this.editable = true;
    this.id_grupo = '';
    nodeToBeEdited.item=this.valororiginal;
   }


}
