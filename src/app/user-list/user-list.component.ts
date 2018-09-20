import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import * as firebase from "firebase/app";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.getOnlineUsers()
      .valueChanges()
      .subscribe(data => {
        this.users = data;
      });
  }

  getOnlineUsers() {
    return this.db.list<firebase.User[]>("users", ref => ref.orderByKey());
  }
}
