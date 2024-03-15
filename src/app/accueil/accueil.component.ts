import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  afficher_report:boolean = false;
  afficher_connexion:boolean = false;
  afficher_region:boolean = false;
  afficher_details:boolean = false;
  afficher_suggerer:boolean = true;

  enChargement = false;

  region:string = "";

  toggle_report(){
    this.afficher_report = !this.afficher_report;
  }

  toggle_connexion(){
    this.afficher_connexion = !this.afficher_connexion;
  }

  map: Map | undefined;

  ngOnInit(): void {

    let region = localStorage.getItem('region')
    if(region){
      this.region = region;
      this.afficher_region = false;
    } else {
      this.afficher_region = true;
    }

    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }

  set_region(region:string){
    this.region = region;
    localStorage.setItem('region', region);
    this.afficher_region = false;
    this.save_region();
  }

  save_region(){
    localStorage.setItem('region', this.region);
  }

  montrer_details(id:number){

    this.afficher_details = true;
  }

  cacher_details(){
    this.afficher_details = false;
  }
}


