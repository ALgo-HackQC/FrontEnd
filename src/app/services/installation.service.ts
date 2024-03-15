import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private http_client: HttpClient) { }
  // /installation/cree

  // {
  //   String name,
  //   String type,
  //   String description, 
  //   Long locationId
  // }
  createLocation(name: string, type: string, description: string, locationId: number) {
    return this.http_client
      .post('http://localhost:8080/installation/cree', {
        name: name,
        type: type,
        description: description,
        locationId: locationId
      }).subscribe({
        next: (data) => {
          console.log('Data:', data);
          
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });

    }
  }


