import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationDTO} from "../interface/LocationDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/location';
  }

  getLocationById(id: number | undefined): Observable<LocationDTO> {
    return this.http.get<LocationDTO>(`${this.url}/${id}`);
  }
}
