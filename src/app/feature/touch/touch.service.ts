import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base.service';
import { Observable } from 'rxjs';
import { Time } from 'src/app/core/models/time';

@Injectable({
  providedIn: 'root'
})
export class TouchService {
  DWtable = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]

  constructor(
    private httpBaseService: HttpBaseService
  ) { }

  // かかった時間を記録を該当のデータベースにポスト
  recordTime(D, W, time): Observable<Time> {
    const dbNumber = this.DWtable[D][W];
    return this.httpBaseService.postRequest<Time>(`${dbNumber}`, { time });
  }

}
