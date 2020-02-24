import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {HttpHeaders} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artist: any = null;
  artistName: string = null;
  displayName: string = null;
  isLoading: boolean;

  constructor(private dataService: DataService, private spinner: NgxSpinnerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // Function to fetch the artist with specified name
  fetchArtist() {
    if (this.artistName) {
      this.isLoading = true;
      this.spinner.show();
      this.dataService.getArtistsByName(this.artistName)?.subscribe(data => {
        this.artist = data;
        if (this.artist.error || this.artist === '') {
          this.artist = null;
        }
        this.displayName = this.artistName;
        this.isLoading = false;
        this.spinner.hide();
      });
    } else {
      this.artist = '';
      this.artistName = this.displayName = null;
    }
  }

  // Navigates to events
  viewEvents(name) {
    const promise = this.router.navigate(['events/' + name]);
  }

}
