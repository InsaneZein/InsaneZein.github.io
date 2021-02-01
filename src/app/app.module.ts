import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SurveyComponent } from './survey/survey.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { fakeBackendProvider } from './fake-backend';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SurveyStatisticsComponent } from './survey-statistics/survey-statistics.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [
    BrowserModule,
    appRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SurveyComponent,
    SurveyStatisticsComponent
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
