import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { FormFieldComponent } from './components/form-field/form-field.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

@NgModule({
  declarations: [ContentLayoutComponent, TextInputComponent, FormFieldComponent, TextareaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslocoModule
  ],

  exports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TranslocoModule,

    TextInputComponent,
    FormFieldComponent,
    TextareaComponent
  ]
})
export class SharedModule {}
