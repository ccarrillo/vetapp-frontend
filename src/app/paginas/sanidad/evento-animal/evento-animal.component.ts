import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// declare const M: any;
interface Gender {
  id: string;
  value: string;
}

@Component({
  selector: 'app-evento-animal',
  templateUrl: './evento-animal.component.html',
  styleUrls: ['./evento-animal.component.sass']
})
export class EventoAnimalComponent implements OnInit {

  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  selectedRowData: selectRowInterface;
  newUserImg = 'assets/images/user/user1.jpg';
  data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [
    { name: 'ID' },
    { name: 'Fecha' },
    { name: 'Dias antes' },
    { name: 'Evento' },
    { name: 'Anotaciones' },
    { name: 'Informacion del evento' }
    
  ];
  genders = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' }
  ];
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  // Table 2
  tb2columns = [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Address' }
  ];
  tb2data = [];
  tb2filteredData = [];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  breadscrums = [
    {
      title: 'ngx-datatable',
      items: ['Table'],
      active: 'ngx-datatable'
    }
  ];

  constructor( private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal) { 
      this.editForm = this.fb.group({
        id: new FormControl(),
        img: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        phone: new FormControl(),
        email: new FormControl(),
        address: new FormControl()
      });
    }

  ngOnInit(): void {
        
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
    });
    // Table 2
    this.tb2fetch((data) => {
      this.tb2data = data;
      this.tb2filteredData = data;
    });
    this.register = this.fb.group({
      id: [''],
      fecha: ['', [Validators.required]],
      tipo: ['',[Validators.required]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      address: ['']
    });

  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/adv-tbl-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // Table 2
  tb2fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/ngx-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // Table 2
  tb2filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.tb2columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.tb2filteredData[0]);
    // assign filtered matches to the active datatable
    this.tb2data = this.tb2filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table2.offset = 0;
  }
  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.editForm.setValue({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      email: row.email,
      address: row.address,
      img: row.img
    });
    this.selectedRowData = row;
  }
  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.register.patchValue({
      id: this.getId(10, 100),
      img: this.newUserImg
    });
  }
  deleteRow(row) {
    this.data = this.arrayRemove(this.data, row.id);
    this.showNotification(
      'bg-red',
      'Delete Record Successfully',
      'bottom',
      'right'
    );
  }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });
  }
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        value.phone = form.value.phone;
        value.gender = form.value.gender;
        value.email = form.value.email;
        value.address = form.value.address;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.showNotification(
      'bg-black',
      'Edit Record Successfully',
      'bottom',
      'right'
    );
  }
  onAddRowSave(form: FormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    // console.log(this.data);
    form.reset();
    this.modalService.dismissAll();
    this.showNotification(
      'bg-green',
      'Add Record Successfully',
      'bottom',
      'right'
    );
  }
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const value = event.target.value.toLowerCase();

    // get the amount of columns in the table
    const count = this.columns.length;

    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);

    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter((item) => {
      // iterate through each row's column data
      for (let i = 0; i <= count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSort(event) {
    // event was triggered, start sort sequence
    setTimeout(() => {
      const rows = [this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return (
          a[sort.prop].localeCompare(b[sort.prop]) *
          (sort.dir === 'desc' ? -1 : 1)
        );
      });

      this.rows = rows;
    }, 1000);
  }

  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['bg-red']
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

}

export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}
