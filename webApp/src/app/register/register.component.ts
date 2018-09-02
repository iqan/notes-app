import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Login } from '../login';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitMessage = '';
  successMessage = '';
  username = new FormControl('', [ Validators.required ]);
  password = new FormControl('', [ Validators.required ]);

  constructor(private authenticationService: AuthenticationService,
              private routerService: RouterService) { }

  ngOnInit(): void { }

  registerSubmit() {
    this.submitMessage = '';
    const login = new Login(this.username.value, this.password.value);
    this.authenticationService.register(login).subscribe(
      data => {
        const username = data['userInfo'];
        this.successMessage = `You are registered. Login with "${username}."`;
        setTimeout(() => {
          this.routerService.routeToLogin();
        }, 3000);
      },
      err => this.handleErrorResponse(err)
    );
  }

  getUserNameInvalidMessage(): string {
    return this.username.hasError('required') ? 'You must enter a value for username.' : '';
  }

  getPasswordInvalidMessage(): string {
    return this.password.hasError('required') ? 'You must enter a value for password.' : '';
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.submitMessage = `Http failure response for ${error.url}: 404 Not Found`;
    } else {
      this.submitMessage = error.error.message;
    }
  }

  routeToLogin(): void {
    this.routerService.routeToLogin();
  }
}
