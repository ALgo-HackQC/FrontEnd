import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoordonneesServiceService {
  constructor(private http_client: HttpClient) {}

  getLocalisation() {
    return this.http_client
      .get('http://localhost:8080/location/1')
      .subscribe({
        next: (data) => {
          console.log('Data:', data);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
