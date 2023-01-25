import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
/**
 * Node for to-do item
 */
 export class TodoItemNode {
  children: TodoItemNode[];
  nombre: string;
  /*id: number;
  padre: number;
  level: number;*/
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  hasChild:boolean; // new property
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  CAMAY: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  /*Empresa: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]*/
};
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
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
         
        console.log("ENTRO LISTAR CARGAR");
       // console.log(TREE_DATA);
        console.log(data);
        //this.dataSource = data; //No pagina
        if (data) {
         
           const treee= this.buildFileTree(data, 0);
           console.log(treee);
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
     
      /*const datas = this.buildFileTree(TREE_DATA, 0);
       console.log(datas);
     // Notify the change.
       this.dataChange.next(datas);*/
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
  
  
   deleteItem(parent: TodoItemNode,name: string) {
    //if (!parent.children) parent.children=[];
   //const nuevo= parent.children.filter(ite => ite.item !== name);
     //console.log('nuevo array'+this. );
    //this.dataChange.next(this.data);
}
  
  
  

 }

@Component({
  selector: 'app-grupo-animal-registrar',
  templateUrl: './grupo-animal-registrar.component.html',
  styleUrls: ['./grupo-animal-registrar.component.sass'],
  providers: [ChecklistDatabase],
})
export class GrupoAnimalRegistrarComponent implements OnInit {
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

constructor(private _database: ChecklistDatabase) {
  this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  _database.dataChange.subscribe(data => {
    this.dataSource.data = data;
  });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(){

  }

getLevel = (node: TodoItemFlatNode) => node.level;

isExpandable = (node: TodoItemFlatNode) => node.expandable;

getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

/**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
transformer = (node: TodoItemNode, level: number) => {
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode = existingNode && existingNode.item === node.nombre
      ? existingNode
      : new TodoItemFlatNode();
  flatNode.item = node.nombre;
  flatNode.level = level;
  flatNode.expandable = true;                   // edit this to true to make it always expandable
  flatNode.hasChild = !!node.children?.length;  // add this line. this property will help 
                                                // us to hide the expand button in a node
  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);
  return flatNode;
}

/** Whether all the descendants of the node are selected. */
/*descendantsAllSelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const descAllSelected = descendants.length > 0 && descendants.every(child => {
    return this.checklistSelection.isSelected(child);
  });
  return descAllSelected;
}*/

/** Whether part of the descendants are selected */
/*descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const result = descendants.some(child => this.checklistSelection.isSelected(child));
  return result && !this.descendantsAllSelected(node);
}*/

/** Toggle the to-do item selection. Select/deselect all the descendants node */
/*todoItemSelectionToggle(node: TodoItemFlatNode): void {
  this.checklistSelection.toggle(node);
  const descendants = this.treeControl.getDescendants(node);
  this.checklistSelection.isSelected(node)
    ? this.checklistSelection.select(...descendants)
    : this.checklistSelection.deselect(...descendants);

  // Force update for the parent
  descendants.forEach(child => this.checklistSelection.isSelected(child));
  this.checkAllParentsSelection(node);
}*/

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
  const parentNode = this.flatNodeMap.get(node);
  this._database.insertItem(parentNode!, '');
  this.treeControl.expand(node);
}

/** Save the node to database */
saveNode(node: TodoItemFlatNode, itemValue: string) {
  const nestedNode = this.flatNodeMap.get(node);
  this._database.updateItem(nestedNode!, itemValue);
  console.log(this._database);
}

deleteNode(node: TodoItemFlatNode): void {

    //console.log('alex'+node.item);
    const nestedNode = this.flatNodeMap.get(node);
     console.log(nestedNode);
     //console.log(this._database.dataChange.value[0].item);
     //console.log(this._database.dataChange.value.length);
     /*for (let index = 0; index < this._database.dataChange.value.length; index++) {
      const element = this._database.dataChange.value[index];
           console.log(element.item);
     }*/
    //this._database.deleteItem(nestedNode!,nestedNode.item);
   /* function recorrer( obj ) {
      let pila = [ [ '', obj ] ];
    
      while( pila.length ) {
        let curr = pila.pop( );
    
        if( ( typeof( curr[1] ) == 'object' ) && ( curr[1] ) ) {
          for( let idx in curr[1] ) {
            if( ( typeof( curr[1] ) == 'object' ) && ( curr[1] ) ) {
              if( curr[0].length ) {
                pila.push( [ `${curr[0]}.${idx}`, curr[1][idx] ] );
              } else {
                pila.push( [ idx, curr[1][idx] ] );
              }
            }
          }
        } else {
          console.log( `${curr[0]}: ${curr[1]}` );
        }
      }
    }
    
    recorrer( TREE_DATA );*/
   
}

    editarNode(node: TodoItemFlatNode): void {

      //console.log('alex'+node.item);
      const nestedNode = this.flatNodeMap.get(node);
      console.log(nestedNode);
    }

}
