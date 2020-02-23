import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // API URL
  // One thing to be noticed, requesting from localhost your server does not respond(CORS).
  url = 'https://rest.bandsintown.com';

  constructor(private http: HttpClient) {
  }

  /**
   * This function returns the artist with the provided name.
   * @param name - Name of the artist to be found
   */
  getArtistsByName(name: string) {
    return this.http.get(this.url + '/artists/' + name, {params: {app_id: 'x'}});
  }

  /**
   * This function returns events associated to the provided artist name.
   * @param name - Name of the artist whose events are to be found.
   */
  getEventsByArtistName(name: string) {
    return this.http.get(this.url + '/artists/' + name + '/events', {params: {app_id: 'x'}});
  }
}
