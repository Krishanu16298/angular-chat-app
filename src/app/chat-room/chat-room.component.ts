import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from "@angular/core";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.scss"]
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  @ViewChild("scroller")
  private feedController: ElementRef;

  constructor() {}

  ngOnInit() {}

  scrollToBottom(): void {
    this.feedController.nativeElement.scrollTop = this.feedController.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
