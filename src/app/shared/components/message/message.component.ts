import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { Message, messageIcon, messageIconMap } from 'src/app/core/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  messages: Message[] = [];
  sub: Subscription;

  constructor(messageService: MessageService) {
    this.sub = messageService.message$.subscribe(message => {
      this.messages.push(message);
      if (!message.isStayForever) {
        window.setTimeout(() => this.closeAlert(message), message.timeout);
      }
    })
  }

  closeAlert(message: Message): void {
    this.messages = this.messages.filter(x => x !== message);
  }

  getMessateIconName(icon: messageIcon): string {
    return messageIconMap[icon];
  }

}
