import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MediaItemService {
  constructor(private http: Http) {}

  get(medium) {
    let searchParams = new URLSearchParams();
    searchParams.append('medium', medium);
    return this.http.get('mediaitems', { search: searchParams })
      .map(response => {
        console.log(response);
        return response.json().mediaItems;
      });
  }

  getMediaItemsFromId(id)
  {
    let searchParams = new URLSearchParams();
    searchParams.append('id', id);
    return this.http.get('mediaitems', { search: searchParams })
      .map(response => {
        console.log(response.json());
        return response.json();
      });
  }
  
  add(mediaItem) {
    return this.http.post('mediaitems', mediaItem)
      .map(response => {});
  }
  
  delete(mediaItem) {
    return this.http.delete(`mediaitems/${mediaItem.id}`)
      .map(response => {});
  }
}
