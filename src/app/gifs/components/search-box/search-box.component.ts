import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('texTagInput')
  tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService ){

  }

  serchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.serchTag(newTag);
    this.tagInput.nativeElement.value= "";
    

  }

}
