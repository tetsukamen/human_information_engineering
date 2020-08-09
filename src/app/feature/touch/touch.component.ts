import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TouchService } from './touch.service';
import { Observable, Subscription } from 'rxjs';
import { Time } from 'src/app/core/models/time';
import { FormGroup } from '@angular/forms';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-touch',
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.scss']
})
export class TouchComponent implements OnInit, OnDestroy {
  settingForms: FormGroup; // DとWの設定を保持するフォーム
  counter: number = 0;
  message: string = "スタートボタンを押さえてください";
  onTestFlag: boolean = false; // テスト中フラグ
  subs: Subscription[] = []; // subscriptionを格納
  correctLabel: null | "right" | "left" = null; // 左右どちらの指示器を点灯するか、またはどちらも点灯しないか
  startTime;
  endTIme;

  // fontawsome
  faPlus = faPlus;
  faCircle = faCircle;


  constructor(
    private touchService: TouchService
  ) { }

  ngOnInit(): void {
    this.settingForms = this.touchService.createSettingForms();
    this.subs.push(this.settingForms.valueChanges.subscribe(_ => this.counter = 0));
  }

  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event) {
  //   this.inspect()
  // }

  @HostListener('touchstart', ['$event']) onTouchStart(event) {
    const id = event.target.id;
    switch (id) {
      case "start-position":
        this.startTest();
        break;
      case "right-target":
        console.log("right-target");
        break;
      case "left-target":
        console.log("left-target");
        break;
      case "fail-area":
        console.log("fail-area");
    }
  }

  startTest(): void {
    if (!this.onTestFlag) {
      this.onTestFlag = !this.onTestFlag;
      this.setMessage("計測中");
      const waitMiliSecond = 1000 + Math.random() * 2000; // 1~3秒の範囲の乱数生成（単位はミリ秒）
      // waitMileSecondが経過したらランダムに左右どちらかを点灯
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.correctLabel = "left";
        } else {
          this.correctLabel = "right";
        }
      }, waitMiliSecond);
    }
  }

  setStartTime(): void {
    this.startTime = new Date().getTime();
  }

  setEndTime(): void {
    this.endTIme = new Date().getTime();
  }

  // かかった時間を記録を該当のデータベースにポスト
  recordTime(D: number, W: number, time: number): Observable<Time> {
    return this.touchService.recordTime(D, W, time);
  }

  // メッセージを表示
  setMessage(m: string): void {
    this.message = m;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  inspect(): void {
    this.setMessage("こんにちは")
  }

}
