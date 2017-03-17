import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {Rating} from './rating.component';



import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-detail',
  templateUrl: 'app/media-item-detail.component.html',
  styleUrls: ['app/media-item-detail.component.css'],
  
 
})
export class MediaItemDetailComponent {
  id;
  mediaItems = [];
  paramsSubscription;
 
  

  constructor(private mediaItemService: MediaItemService,
    private activatedRoute: ActivatedRoute) {

  }

  // Load data ones componet is ready
  ngOnInit() {
       this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let id = params['id'];
        this.getMediaItemsFromId(id);
      });
  }

  ngOnDestroy() {
      // Clean sub to avoid memory leak
    this.paramsSubscription.unsubscribe();
  }

   getMediaItemsFromId(id) {
    this.id = id;
    this.mediaItemService.getMediaItemsFromId(id)
      .subscribe(mediaItems => {

          console.log(mediaItems);
        this.mediaItems = mediaItems;
      });
  }

  setFavorite()
  {
      if(this.mediaItems.isFavorite)
      {
         this.mediaItems.isFavorite = false; 
      }
      else
      {
           this.mediaItems.isFavorite = true;
      }

  }

  
}