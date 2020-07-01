import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MessageComponent } from './components/message/message.component';



@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class SharedModule { }
