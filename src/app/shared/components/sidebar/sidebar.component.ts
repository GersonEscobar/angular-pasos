import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifService: GifsService){}

  get tagHistory(){
    return this.gifService.tagsHistory;
  }

  searchTag(tag : string){
    this.gifService.serchTag(tag)
  }

}
