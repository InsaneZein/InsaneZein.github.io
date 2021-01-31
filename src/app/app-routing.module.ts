import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'survey', component: SurveyComponent },
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    SurveyComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
