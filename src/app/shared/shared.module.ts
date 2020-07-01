import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MessageComponent } from './components/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    MessageComponent,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
