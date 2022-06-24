import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";

import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { DigitOnlyDirective } from "./directive/digit-only.directive";
import { NumberDirective } from "./directive/numbers-only.directive";
import { TwoDigitDecimaNumberDirective } from "./directive/TwoDigitDecimaNumberDirective";
import { UpperCaseInputDirective } from "./directive/upper-case-input.directive";
@NgModule({
  declarations: [
    DigitOnlyDirective, 
    NumberDirective, 
    TwoDigitDecimaNumberDirective,
    UpperCaseInputDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    FeatherIconsModule,
    DigitOnlyDirective, 
    NumberDirective, 
    TwoDigitDecimaNumberDirective,
    UpperCaseInputDirective,
  ],
})
export class SharedModule {}
