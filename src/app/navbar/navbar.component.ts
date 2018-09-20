import { Component, OnChanges } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnChanges {
  user: any;
  userName: any;
  email: string;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      if (this.user !== undefined) {
        this.getUser()
          .valueChanges()
          .subscribe(res => {
            this.userName = res;
            if (this.userName.displayName !== undefined) {
              this.email = this.userName.email;
              this.userName = this.userName.displayName;
            }
          });
      }
    });
  }

  ngOnChanges() {}

  getUser() {
    let userId = this.user.uid;
    let path = `/users/${userId}`;
    return this.db.object(path);
  }

  logout() {
    this.auth.logout(this.email, this.userName);
  }
}
