import { Component, OnInit } from '@angular/core';
import { TouchService } from './touch.service';
import { Observable } from 'rxjs';
import { Time } from 'src/app/core/models/time';

@Component({
  selector: 'app-touch',
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.scss']
})
export class TouchComponent implements OnInit {

  constructor(
    private touchService: TouchService
  ) { }

  ngOnInit(): void {
  }


  // かかった時間を記録を該当のデータベースにポスト
  recordTime(D, W, time): Observable<Time> {
    return this.touchService.recordTime(D, W, time);
  }



  start(): void {
    console.log("計測開始")
  }
}
