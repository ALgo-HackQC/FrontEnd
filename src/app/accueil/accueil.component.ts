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
  afficher_report: boolean = false;
  afficher_connexion: boolean = false;
  afficher_region: boolean = false;
  afficher_details: boolean = true;
  afficher_suggerer: boolean = false;

  detailsCourants: Details[] = [];

  enChargement = false;

  region: string = "";

  toggle_report() {
    this.afficher_report = !this.afficher_report;
  }

  toggle_connexion() {
    this.afficher_connexion = !this.afficher_connexion;
  }

  toggle_suggerer() {
    this.afficher_suggerer = !this.afficher_suggerer;
  }

  map: Map | undefined;

  ngOnInit(): void {
    // Test
    this.detailsCourants = this.parse_details("PARC GHISLAIN-MARTINEAU - Basketball - Terrain réglementaire - 2 paniers - Pavage avec marquage");

    let region = localStorage.getItem('region')
    if (region) {
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

  set_region(region: string) {
    this.region = region;
    localStorage.setItem('region', region);
    this.afficher_region = false;
    this.save_region();
  }

  save_region() {
    localStorage.setItem('region', this.region);
  }

  montrer_details(id: number) {

    this.afficher_details = true;
  }

  cacher_details() {
    this.afficher_details = false;
  }


  /* Processus d'affichage d'infos */

  parse_details(features: string) {
    let caracteristiques: Details[] = [];
    let features_list = features.split(" - ");
    caracteristiques.push({
      icon: "map-marker",
      caracteristique: "Lieu",
      detail: features_list[0]
    })
    for (let i = 1; i < features_list.length; i++) {
      let feature = features_list[i];
      if (feature.indexOf("ans") != -1) {
        caracteristiques.push({
          icon: "account-check",
          caracteristique: "Age",
          detail: features_list[i]
        })
      } else if (feature.indexOf("Équipement") != -1) {
        caracteristiques.push({
          icon: "toolbox",
          caracteristique: "Équipement",
          detail: features_list[i]
        })
      } else {
        caracteristiques.push({
          icon: "information",
          caracteristique: features_list[i],
          detail:""
        })
      }
    }
    return caracteristiques;
  }



}

interface Details {
  icon: string,
  caracteristique: string,
  detail: string
}


