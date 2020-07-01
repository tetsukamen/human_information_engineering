import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/core/models/message';
const defaultTimeout = 5000;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource$ = new Subject<Message>();
  message$ = this.messageSource$.asObservable();

  pushMessage(message: Message | Message[]) {
    if (Array.isArray(message)) {
      for (const msg of message) {
        this.setDefaultValues(msg);
        this.messageSource$.next(msg);
      }
    } else {
      this.setDefaultValues(message);
      this.messageSource$.next(message);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  // 必須でない項目のデフォルト値を設定する
  private setDefaultValues(message: Message) {
    message.isStayForever = !!message.isStayForever;
    if (!message.isStayForever && message.timeout == null) {
      message.timeout = defaultTimeout;
    }
  }

}
