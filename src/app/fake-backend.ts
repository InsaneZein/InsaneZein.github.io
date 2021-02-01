import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from './models/user';


let adminUser: User = {
    name: 'Admin',
    email:'admin@admin.com',
    password: 'password',
    token: 'fake-jwt-token',
    userId: 1
}

let surveyUser: User = {
    name: 'Survey Giver',
    email: 'survey@giver.com',
    password: 'password',
    token: 'fake-jwt-token',
    userId: 2
}
// array in local storage for registered users
localStorage.setItem('users', JSON.stringify([surveyUser, adminUser]))
let users = JSON.parse(localStorage.getItem('users')) || [surveyUser, adminUser];
let surveys = JSON.parse(localStorage.getItem('surveys')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.match('/surveys') && method === 'GET':
                    return getSurveys();
                case url.match('/surveys/submitResponse') && method === 'POST':
                    return submitSurvey();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
                }    
            }
    
            // route functions
    
            function authenticate() {
                const { email, password } = body;
                const user = users.find(x => x.email === email && x.password === password);
                if (!user) return error('Email or password is incorrect');
                return ok({
                    userId: user.userId,
                    email: user.email,
                    name: user.name,
                    token: 'fake-jwt-token'
                })
            }
    
            function register() {
                const user = body
    
                if (users.find(x => x.email === user.email)) {
                    return error('Email "' + user.email + '" is already taken')
                }
    
                user.userId = users.length ? Math.max(...users.map(x => x.userId)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
    
                return ok();
            }
    
            function getUsers() {
                if (!isLoggedIn()) return unauthorized();
                return ok(users);
            }
    
            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();
                users = users.filter(x => x.userId !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            function getSurveys() {
                return ok(surveys);
            }

            function submitSurvey() {
                const survey = body;
                surveys.push(survey);
                localStorage.setItem('surveys', JSON.stringify(surveys));
                
                return ok();
            }
    
            // helper functions
    
            function ok(body?) {
                return of(new HttpResponse({ status: 200, body }))
            }
    
            function error(message) {
                return throwError({ error: { message } });
            }
    
            function unauthorized() {
                return throwError({ status: 401, error: { message: 'Unauthorised' } });
            }
    
            function isLoggedIn() {
                return headers.get('Authorization') === 'Bearer fake-jwt-token';
            }
    
            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        }
    }

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};