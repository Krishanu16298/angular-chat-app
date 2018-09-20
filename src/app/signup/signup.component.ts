import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { resolve } from "q";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  errMsg: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signUp() {
    let email = this.email;
    let password = this.password;
    let displayName = this.displayName;
    this.authService
      .signUp(email, password, displayName)
      .then(resolve => (window.location.pathname = "/chat"))
      .catch(err => (this.errMsg = err));
  }
}
