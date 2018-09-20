import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService) {}

  login() {
    console.log("login() called from login-form component");
    this.authService
      .login(this.email, this.password)
      .catch(error => (this.errorMsg = error.message));
  }
}
