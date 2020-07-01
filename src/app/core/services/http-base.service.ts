import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  private _isConnecting = false; // 通信中フラグ

  get isConnecting(): boolean {
    return this._isConnecting;
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  url(srcUrl: string, version?: string): string {
    version = version === undefined ? environment.defaultApiVersions : version;
    return `${environment.apiBaseUrls[version]}${srcUrl}`
  }

  headers(additionalHeaders: { [key: string]: string } = {}): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    for (const [key, value] of Object.entries(additionalHeaders)) {
      headers = headers.set(key, value);
    }
    return headers;
  }

  handleError(error: HttpErrorResponse, errorDisplay = true): void {
    if (errorDisplay) {
      let text: string;
      switch (error.status) {
        case 400:
          // badrequestの場合はサーバーからのメッセージを表示する
          if (error.error) {
            // 複数のエラーメッセージがある場合は' / 'で結合して表示
            const messages = [];
            for (const value of Object.values(error.error)) {
              messages.push(`${value}`);
            }
            text = messages.join(' / ');
          }
          break;
        case 401:
          // unauthorize
          text = 'ログインしてください';
          break;
        case 403:
          // forbidden
          text = 'アクセスできません';
          break;
        default:
          // others
          text = `${error.status}: エラーが発生しました。`;
          break;
      }
      this.messageService.pushMessage({
        type: 'danger',
        text: text,
        icon: 'danger',
      });
    }
  }

  /**
   * @param version
   *  APIのバージョンを'v1', 'v2', ...　の形式で指定する。
   *  指定しない場合はenvironment.defaultApiVersionが使われる。
   * @param errorDisplay
   *  エラー発生した場合にメッセージを出すかどうか
   */
  getRequest<T>(
    srcUrl: string,
    options: {
      query?: QueryParams;
      version?: string;
      errorDisplay?: boolean;
    } = {}
  ): Observable<T> {
    this._isConnecting = true; // 通信中フラグを立てる
    return this.http
      .get<T>(this.url(srcUrl, options.version), {
        params: options.query,
      })
      .pipe(
        catchError(error => {
          this.handleError(error, options.errorDisplay);
          return observableThrowError(error);
        }),
        finalize(() => {
          // 通信終了時に通信中フラグを下ろす
          this._isConnecting = false;
        })
      );
  }

  /**
   * @param version
   *  APIのバージョンを'v1', 'v2', ...　の形式で指定する。
   *  指定しない場合はenvironment.defaultApiVersionが使われる。
   * @param errorDisplay
   *  エラー発生した場合にメッセージを出すかどうか
   * @param headers
   *  追加のヘッダ
   */
  postRequest<T>(
    srcUrl: string,
    data: any,
    options: {
      version?: string;
      errorDisplay?: boolean;
      headers?: { [key: string]: string };
      responseType?: 'arraybuffer' | 'json' | 'blob';
    } = {}
  ): Observable<T> {
    this._isConnecting = true; // 通信中フラグを立てる
    return this.http
      .post<T>(this.url(srcUrl, options.version), data, {
        headers: this.headers(options.headers),
        responseType: options.responseType
          ? (options.responseType as 'json')
          : 'json',
      })
      .pipe(
        catchError(error => {
          this.handleError(error, options.errorDisplay);
          return observableThrowError(error);
        }),
        finalize(() => {
          // 通信終了時に通信中フラグを下ろす
          this._isConnecting = false;
        })
      );
  }

  /**
   * @param version
   *  APIのバージョンを'v1', 'v2', ...　の形式で指定する。
   *  指定しない場合はenvironment.defaultApiVersionが使われる。
   * @param errorDisplay
   *  エラー発生した場合にメッセージを出すかどうか
   * @param headers
   *  追加のヘッダ
   */
  putRequest<T>(
    srcUrl: string,
    data: T,
    options: {
      version?: string;
      errorDisplay?: boolean;
      headers?: { [key: string]: string };
    } = {}
  ): Observable<T> {
    this._isConnecting = true; // 通信中フラグを立てる
    return this.http
      .put<T>(this.url(srcUrl, options.version), data, {
        headers: this.headers(options.headers),
      })
      .pipe(
        catchError(error => {
          this.handleError(error, options.errorDisplay);
          return observableThrowError(error);
        }),
        finalize(() => {
          // 通信終了時に通信中フラグを下ろす
          this._isConnecting = false;
        })
      );
  }

  /**
   * @param version
   *  APIのバージョンを'v1', 'v2', ...　の形式で指定する。
   *  指定しない場合はenvironment.defaultApiVersionが使われる。
   * @param errorDisplay
   *  エラー発生した場合にメッセージを出すかどうか
   * @param headers
   *  追加のヘッダ
   */
  deleteRequest<T>(
    srcUrl: string,
    options: {
      version?: string;
      errorDisplay?: boolean;
      headers?: { [key: string]: string };
    } = {}
  ): Observable<T> {
    this._isConnecting = true; // 通信中フラグを立てる
    return this.http
      .delete<T>(this.url(srcUrl, options.version), {
        headers: this.headers(options.headers),
      })
      .pipe(
        catchError(error => {
          this.handleError(error, options.errorDisplay);
          return observableThrowError(error);
        }),
        finalize(() => {
          // 通信終了時に通信中フラグを下ろす
          this._isConnecting = false;
        })
      );
  }

  /**
   * @param version
   *  APIのバージョンを'v1', 'v2', ...　の形式で指定する。
   *  指定しない場合はenvironment.defaultApiVersionが使われる。
   * @param errorDisplay
   *  エラー発生した場合にメッセージを出すかどうか
   * @param headers
   *  追加のヘッダ
   */
  patchRequest<T>(
    srcUrl: string,
    data: any,
    options: {
      version?: string;
      errorDisplay?: boolean;
      headers?: { [key: string]: string };
    } = {}
  ): Observable<T> {
    this._isConnecting = true; // 通信中フラグを立てる
    return this.http
      .patch<T>(this.url(srcUrl, options.version), data, {
        headers: this.headers(options.headers),
      })
      .pipe(
        catchError(error => {
          this.handleError(error, options.errorDisplay);
          return observableThrowError(error);
        }),
        finalize(() => {
          // 通信終了時に通信中フラグを下ろす
          this._isConnecting = false;
        })
      );
  }
}
