import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TextInputComponent } from './components/text-input/text-input.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    TextInputComponent,
    FormFieldComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TextInputComponent,
    FormFieldComponent,
    TextareaComponent
  ]
})
export class SharedModule { }
