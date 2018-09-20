import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChatFormComponent } from "./chat-form/chat-form.component";
import { ChatRoomComponent } from "./chat-room/chat-room.component";
import { FeedComponent } from "./feed/feed.component";
import { MessageComponent } from "./message/message.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserItemComponent } from "./user-item/user-item.component";

import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";

import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment.prod";

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatRoomComponent,
    FeedComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, "chatapp"),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ChatService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
