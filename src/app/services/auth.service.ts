import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  private uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user = this.authState;
  }

  authUser() {
    return this.afAuth.user;
  }

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        let status = "online";
        this.afAuth.user.subscribe(arr => {
          console.log(arr.uid);
          let path = `users/${arr.uid}`;
          let data = {
            status: status
          };

          this.db
            .object(path)
            .update(data)
            .catch(err => console.log(err));
        });
        window.location.pathname = "/chat";
      })
      .catch(err => console.log(err));
  }

  setUserStatus(status: string): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      status: status
    };
    this.db
      .object(path)
      .update(data)
      .catch(error => console.log(error));
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        let status = "online";
        this.setUserData(email, displayName, status);
      })
      .catch(err => console.log("Error : " + err));
  }

  setUserData(email: string, displayName: string, status: string): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db
      .object(path)
      .update(data)
      .catch(err => console.log(err));
  }

  get currentUserId(): string {
    return this.authState !== undefined ? this.authState.user.uid : "";
  }

  logout(email: string, displayName: string) {
    this.afAuth.user.subscribe(arr => {
      console.log(arr.uid);
      let path = `users/${arr.uid}`;
      let data = {
        email: email,
        displayName: displayName,
        status: "offline"
      };

      this.db
        .object(path)
        .update(data)
        .catch(err => console.log(err));
    });
    this.afAuth.auth.signOut().catch(err => console.log(err));
    window.location.pathname = "/login";
  }
}
