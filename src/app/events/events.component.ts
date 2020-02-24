import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {DataService} from '../data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  name: string;
  isLoading: boolean;
  artist: any;
  events: any = [];

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.fetchArtist();
  }

  // Fetches the artist and initiates the call for events on the callback from artists
  fetchArtist() {
    if (this.name) {
      this.isLoading = true;
      this.spinner.show();
      this.dataService.getArtistsByName(this.name)?.subscribe(data => {
        this.artist = data;
        this.fetchEvents();
      });
    }
  }

  // Featches events
  fetchEvents() {
    this.dataService.getEventsByArtistName(this.name)?.subscribe(events => {
      this.events = events;
      this.isLoading = false;
      this.spinner.hide();
    });
  }

}
