import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './core/components/task-list/task-list.component';
import { TaskComponent } from './core/components/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/components/login/login.component';
import { UtilityModule } from './shared/utility/utility.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UtilityModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
