import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authguard';
import { SurveyStatisticsComponent } from './survey-statistics/survey-statistics.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
    { path: 'statistics', component: SurveyStatisticsComponent, canActivate: [AuthGuard]},
    { path: '', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);