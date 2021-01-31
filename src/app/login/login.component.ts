import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string = 'survey';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
    this.createForm();
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => console.log(users));
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.email],
      password: ['']
    })
  }

  onLogin() {
    this.authenticationService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.error('incorrect login')
          });
  }

}
