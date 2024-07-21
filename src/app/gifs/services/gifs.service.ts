import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '4y3VRVDJ3Sj4JRZLVbnImQgz7jMk510n';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('gif services')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('hisory')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //si no hay nada no hace la busqueda
    if(this._tagsHistory.length === 0)return;
    this.serchTag(this._tagsHistory[0]);
  }

  serchTag(tag: string): void {
    if (!tag || tag.trim().length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SerchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
        console.log(this.gifsList);
      });
  }
}
