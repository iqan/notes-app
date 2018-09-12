import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Login } from '../login';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    submitMessage = '';
    username = new FormControl('', [ Validators.required ]);
    password = new FormControl('', [ Validators.required ]);

    constructor(private authenticationService: AuthenticationService,
                private routerService: RouterService) { }

    loginSubmit() {
      this.submitMessage = '';
      const login = new Login(this.username.value, this.password.value);
      this.authenticationService.authenticateUser(login).subscribe(
        data => {
          this.authenticationService.setBearerToken(data['token']);
          this.authenticationService.setUserName(this.username.value);
          this.routerService.routeToDashboard();
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

    routeToRegister(): void {
      this.routerService.routeToRegister();
    }
}
