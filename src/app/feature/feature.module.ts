import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { TouchComponent } from './touch/touch.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TouchComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class FeatureModule { }
