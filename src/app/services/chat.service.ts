import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase/app";

import { ChatMessage } from "../models/chat-message.model";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: any;
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser()
        .valueChanges()
        .subscribe(res => {
          this.userName = res;
          if (this.userName.displayName !== undefined) {
            this.userName = this.userName.displayName;
          }
        });
    });
  }

  getUser() {
    this.userId = this.user.uid;
    let path = `/users/${this.userId}`;
    return this.db.object(path);
  }

  getUserById() {
    console.log(this.userId);
    return this.userId;
  }

  getUsers() {
    let path = "/users";
    return this.db.object(path);
  }

  sendMessage(msg: string) {
    let timestamp = this.getTimeStamp();
    let email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      email: email,
      userName: this.userName,
      message: msg,
      timeSent: timestamp
    });
    console.log("Sending Messages ..");
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    return this.db.list<ChatMessage[]>("messages", ref =>
      ref.orderByKey().limitToLast(200)
    );
  }

  getTimeStamp() {
    let now = new Date();
    let date =
      now.getUTCFullYear() +
      "/" +
      (now.getUTCMonth() + 1) +
      "/" +
      now.getUTCDate();

    let time =
      now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

    return date + " " + time;
  }
}
