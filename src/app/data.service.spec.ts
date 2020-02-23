import {TestBed} from '@angular/core/testing';
import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // This test will not pass because your server does not allow cross origin requests. For any other server, it will work.
  it('should return artist',
    (done) => {
      const artist = {
        thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/8479721.jpeg',
        mbid: '0ab49580-c84f-44d4-875f-d83760ea2cfe',
        facebook_page_url: 'http://www.facebook.com/5330548481',
        image_url: 'https://s3.amazonaws.com/bit-photos/large/8479721.jpeg',
        name: 'Maroon 5',
        options: {display_listen_unit: false},
        id: '510',
        tracker_count: 5588607,
        upcoming_event_count: 53,
        url: 'https://www.bandsintown.com/a/510?came_from=267&app_id=x'
      };
      const name = 'Maroon 5';
      service.getArtistsByName(name).subscribe(data => {
        expect(data).not.toBeNull();
        expect(data).toEqual(artist);
        done();
      });
    });

  // for the same reason as above, this test will fail as well.
  it('should return events of the specified artist', (done) => {
    const name = 'Maroon 5';
    service.getEventsByArtistName(name).subscribe((data: []) => {
      expect(data).not.toBeNull();
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });
});
