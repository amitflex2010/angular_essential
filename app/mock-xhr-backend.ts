import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
         
          if (request.url.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            var medium;
            console.log(request.url);
            if (request.url.indexOf('?') >= 0) {
              console.log(request.url);
              medium = request.url.split('=')[1];
              if (medium === 'undefined') medium = '';
            }
           
            var mediaItems;
            if (medium) {
              mediaItems = this._mediaItems.filter(mediaItem => mediaItem.medium === medium);
            } else {
              mediaItems = this._mediaItems;
            }
            responseOptions = new ResponseOptions({
              body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
              status: 200
            });
          } else {
            
            var id = parseInt(request.url.split('=')[1]);
           
            mediaItems = this._mediaItems.filter(mediaItem => mediaItem.id === id);
           
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var mediaItem = JSON.parse(request.text().toString());
          mediaItem.id = this._getNewId();
          this._mediaItems.push(mediaItem);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteMediaItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
     
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });

 
    return { response };
  }

  _deleteMediaItem(id) {
    var mediaItem = this._mediaItems.find(mediaItem => mediaItem.id === id);
    var index = this._mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this._mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._mediaItems.length > 0) {
      return Math.max.apply(Math, this._mediaItems.map(mediaItem => mediaItem.id)) + 1;
    }
  }

  _mediaItems = [
    {
      id: 1,
      name: "Firebug",
      medium: "Series",
      category: "Science Fiction",
      year: 2010,
      rating:3,
      watchedOn: "Wed Jan 05 2011",
      isFavorite: false,
      synopsis:"Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly."
    },
    {
      id: 2,
      name: "The Small Tall",
      medium: "Movies",
      category: "Comedy",
      year: 2015,
      rating:4,
      watchedOn: "Wed Jan 05 2011",
      isFavorite: true,
      synopsis:"Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly. Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly. Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly."
    }, {
      id: 3,
      name: "The Redemption",
      medium: "Movies",
      category: "Action",
      year: 2016,
      rating:4,
      watchedOn: "Wed Jan 05 2011",
      isFavorite: false,
      synopsis:"Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly."
    }, {
      id: 4,
      name: "Hoopers",
      medium: "Series",
      category: "Drama",
      year: 2014,
      rating:4,
      watchedOn: "Wed Jan 05 2011",
      isFavorite: true,
      synopsis:"Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly."
    }, {
      id: 5,
      name: "Happy Joe: Cheery Road",
      medium: "Movies",
      category: "Action",
      year: 2015,
      watchedOn: "Wed Jan 05 2011",
      rating:4,
      isFavorite: false,
      synopsis:"Former U.S. Army Special Forces sergeant Chris Vaughn (The Rock) returns to his small home town in Kitsap County, Washington. Looking for work, he finds the local cedar mill was closed down three years prior by its heir, Jay Hamilton (Neal McDonough), who opened a new casino that now accounts for the majority of revenue for the local area. Hamilton, who was also Vaughn's school friend, invites him to a night of fun at the casino. While checking out the VIP lounge, Vaughn stumbles upon his childhood friend Deni (Ashley Scott), who is now working as a stripper. Later, he notices the craps dealer using loaded dice and demonstrates this to the patrons by placing a bet and calling out the roll before throwing the dice. When the floorman declares no payout, Vaughn instigates a fight. Although he beats down most of the security guards, he is subsequently subdued with a cattle prod and knocked unconscious. The security staff take Vaughn into the basement and Hamilton's right-hand man and head of security Booth (Kevin Durand) tortures him by cutting his torso with a utility knife before dumping him on a roadside. He is found by a trucker and hospitalized, but recovers quickly."
    }
  ];
}