import { Component, OnInit, OnChanges } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { Observable } from "rxjs";
import { ChatMessage } from "../models/chat-message.model";
import { AngularFireList } from "angularfire2/database";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, OnChanges {
  feed: any;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat
      .getMessages()
      .valueChanges()
      .subscribe(arr => {
        this.feed = arr;
      });
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }
}
