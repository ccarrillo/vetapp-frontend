import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-registrar',
  templateUrl: './empresa-registrar.component.html',
  styleUrls: ['./empresa-registrar.component.sass']
})
export class EmpresaRegistrarComponent implements OnInit {

  register: FormGroup;
  hide = true;
  
  constructor(
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.register = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]]
    });
  }

  onRegister() {
    console.log('Form Value', this.register.value);
  }

}
