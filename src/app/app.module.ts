import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { TasksModule } from './modules/tasks/tasks.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, TasksModule, NotFoundModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
