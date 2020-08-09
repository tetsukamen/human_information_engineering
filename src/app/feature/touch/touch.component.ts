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
  message: string = "スタートボタンを押さえてください";
  subs: Subscription[] = []; // subscriptionを格納

  constructor(
    private touchService: TouchService
  ) { }

  ngOnInit(): void {
    this.settingForms = this.touchService.createSettingForms();
    this.subs.push(this.settingForms.valueChanges.subscribe(_ => this.counter = 0));
  }


  // かかった時間を記録を該当のデータベースにポスト
  recordTime(D: number, W: number, time: number): Observable<Time> {
    return this.touchService.recordTime(D, W, time);
  }

  // メッセージを表示
  setMessage(m: string): void {
    this.message = m;
  }

  start(): void {
    console.log("計測開始")
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  inspect(): void {
    this.setMessage("こんにちは")
  }
}
