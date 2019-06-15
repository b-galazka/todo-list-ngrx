import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import {
  ContentLayoutComponent
} from 'src/app/shared/layouts/content-layout/content-layout.component';

const routes: Routes = [

  {
    path: '**',
    component: ContentLayoutComponent,
    children: [
      { path: '', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
