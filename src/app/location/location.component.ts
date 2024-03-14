import { Component } from '@angular/core';
import { LocationService } from '../service/location.service';
import { LocationDTO } from '../interface/LocationDTO';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  title = 'testbd';
  location : LocationDTO;
  locationId ?: number;

  constructor(private locationsService: LocationService) {
    this.location = {
      id: 0,
      longitude: 0,
      latitude: 0
    }
  }

  getLocation(locationId: number | undefined) {
    this.locationsService.getLocationById(locationId).subscribe(
      location => {
        this.location = location;
      });
  }
}
