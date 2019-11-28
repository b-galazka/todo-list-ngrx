import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from 'src/app/shared/layouts/content-layout/content-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '**',
    component: ContentLayoutComponent,
    children: [{ path: '', component: NotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule {}
