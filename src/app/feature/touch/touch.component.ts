import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TouchService } from './touch.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-touch',
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.scss']
})
export class TouchComponent implements OnInit, OnDestroy {
  settingForms: FormGroup; // DとWの設定を保持するフォーム
  counter: number = 1; // カウンター
  displayCounter: number; // 表示用カウンター
  message: string = "スタートボタンを押さえてください";
  onTestFlag: boolean = false; // テスト中フラグ
  subs: Subscription[] = []; // subscriptionを格納
  correctLabel: null | "right" | "left" = null; // 左右どちらの指示器を点灯するか、またはどちらも点灯しないか
  startTime;
  endTime;

  // fontawsome
  faPlus = faPlus;
  faCircle = faCircle;


  constructor(
    private touchService: TouchService
  ) { }

  ngOnInit(): void {
    this.settingForms = this.touchService.createSettingForms();
    this.subs.push(this.settingForms.valueChanges.subscribe(_ => this.counter = 1));
  }

  // タッチされたら場所ごとのメソッドを実行
  @HostListener('touchstart', ['$event']) onTouchStart(event) {
    const id = event.target.id;
    switch (id) {
      case "start-position":
        this.startTest();
        break;
      case "right-target":
        this.endTest("right");
        break;
      case "left-target":
        this.endTest("left");
        break;
      default:
        this.onTestFlag == false;
        this.setMessage("失敗 スタートボタンタッチで次の計測開始");
    }
  }

  // 手が離れた際のイベント
  @HostListener('touchend', ['$event']) onTouchEnd(event) {
    const id = event.target.id;
    if (id == "start-position") {
      this.setStartTime();
    }
  }

  // 指示器点灯ロジックスタート
  startTest(): void {
    this.correctLabel = null;
    this.displayCounter = this.counter;
    if (!this.onTestFlag) {
      this.onTestFlag = true;
      this.setMessage("計測中");
      const waitMiliSecond = 1000 + Math.random() * 2000; // 1~3秒の範囲の乱数生成（単位はミリ秒）
      // waitMileSecondが経過したらランダムに左右どちらかを点灯
      setTimeout(() => {
        if (this.onTestFlag) {
          if (Math.random() > 0.5) {
            this.correctLabel = "left";
          } else {
            this.correctLabel = "right";
          }
        }
      }, waitMiliSecond);
    } else {
      this.onTestFlag = false;
      this.setMessage("失敗 スタートボタンタッチで次の計測開始");
    }
  }

  // タイマーストップしてかかった時間を保持
  endTest(touchedLabel): void {
    // タイマーストップ
    if (this.onTestFlag) {
      this.setEndTime();
      this.counter += 1; // カウンターを１加算
    }
    // 計測中フラグOFF
    this.onTestFlag = false;
    const progressTime = this.endTime - this.startTime;
    // タッチが成功しているかチェックする
    if (this.correctLabel == touchedLabel) {
      this.setMessage(`${progressTime}ms スタートボタンタッチで次の計測開始`);
    } else {
      this.setMessage("失敗 スタートボタンタッチで次の計測開始");
    }

    console.log(this.onTestFlag)
  }

  // タイマースタート
  setStartTime(): void {
    this.startTime = new Date().getTime();
  }

  // タイマーストップ
  setEndTime(): void {
    this.endTime = new Date().getTime();
  }

  // メッセージを表示
  setMessage(m: string): void {
    this.message = m;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  // inspect(): void {
  //   console.log(Math.random())
  // }

}
