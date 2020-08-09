import { Component, OnInit, OnDestroy } from '@angular/core';
import { TouchService } from './touch.service';
import { Observable, Subscription } from 'rxjs';
import { Time } from 'src/app/core/models/time';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-touch',
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.scss']
})
export class TouchComponent implements OnInit, OnDestroy {
  settingForms: FormGroup; // DとWの設定を保持するフォーム
  counter: number = 0;
  subs: Subscription[] = []; // subscriptionを格納

  constructor(
    private touchService: TouchService
  ) { }

  ngOnInit(): void {
    this.settingForms = this.touchService.createSettingForms();
    this.subs.push(this.settingForms.valueChanges.subscribe(_ => this.counter = 0));
  }


  // かかった時間を記録を該当のデータベースにポスト
  recordTime(D, W, time): Observable<Time> {
    return this.touchService.recordTime(D, W, time);
  }



  start(): void {
    console.log("計測開始")
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  inspect(): void {
    console.log(this.counter)
  }
}
