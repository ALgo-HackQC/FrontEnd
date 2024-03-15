import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as maplibregl from 'maplibre-gl';
import { CoordonneesServiceService } from '../services/coordonnees-service.service';
import { InstallationService } from '../services/installation.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  form: any;
  constructor(
    private service: CoordonneesServiceService,
    private serviceInstalation: InstallationService
  ) {
    this.service.getLocalisation();
    // this.serviceInstalation.createLocation("test", "test", "test", 2);
  }

  test = 'test';

  afficher_report: boolean = false;
  afficher_connexion: boolean = false;
  afficher_region: boolean = false;
  afficher_details: boolean = false;
  afficher_suggerer: boolean = false;

  detailsCourants: Details[] = [];

  enChargement = false;

  region: string = '';
  currentSource: string = 'coordonnees'; // Garder une trace de la source actuelle
  currentLayer: string = 'coordonnees';

  

  map!: maplibregl.Map;

  module = {
    name: ' ',
    type: ' ',
    description: ' ',
    locationId: 0,
  };

  initializeMap() {
    this.map = new maplibregl.Map({
      container: 'ol-map',
      style:
        'https://api.maptiler.com/maps/basic-v2/style.json?key=5KJA8YAGNso1aVnlBTMc',
      center: [-71.208, 48.415],
      zoom: 12,
      minZoom: 0,
      maxZoom: 20,
    });

    this.map.on('load', () => {
      this.addSourceAndLayer(this.currentSource, this.currentLayer); // Ajouter la source et le layer initiaux
    });

    this.map.on('click', 'coordonnees', (e) => {
      const features = e.features;
      if (features!.length > 0) {
        const feature = features![0];
        let nom = feature.properties['nom'];
        console.log(nom);
        let id = feature.properties['id'];
        // Vous pouvez maintenant effectuer des actions en fonction de la fonctionnalité cliquée
        this.afficher_features(nom, id);
      }
    });

    this.map.on('click', 'saguenay', (e) => {
      const features = e.features;
      if (features!.length > 0) {
        const feature = features![0];

        // Vous pouvez maintenant effectuer des actions en fonction de la fonctionnalité cliquée
        this.afficher_features(
          'PARC DES ÉRABLES - Équipement bersant à ressorts - 18 mois à 5 ans'
        );
      }
    });
  }

  addSourceAndLayer(source: string, layer: string) {
    // Effacer la source et le layer actuels
    if (this.map.getSource(this.currentSource)) {
      this.map.removeLayer(this.currentLayer);
      this.map.removeSource(this.currentSource);
    }

    // Ajouter la nouvelle source et le nouveau layer
    this.map.addSource(source, {
      type: 'vector',
      url: `http://127.0.0.1:3000/${source}`,
      tiles: [`http://127.0.0.1:3000/${source}/{z}/{x}/{y}`],
      minzoom: 0,
      maxzoom: 14,
    });

    this.map.addLayer({
      id: layer,
      source: source,
      'source-layer': layer,
      type: 'circle',
      paint: {
        'circle-radius': 8,
        'circle-color': '#ff0000',
        'circle-opacity': 0.8,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1,
      },
    });

    // Mettre à jour les valeurs actuelles
    this.currentSource = source;
    this.currentLayer = layer;
  }

  toggle_report() {
    this.afficher_report = !this.afficher_report;
  }

  toggle_connexion() {
    this.afficher_connexion = !this.afficher_connexion;
  }

  toggle_suggerer() {
    this.afficher_suggerer = !this.afficher_suggerer;
  }

  // map2: Map | undefined;

  ngOnInit(): void {
    this.initializeMap();
    // Test

    let region = localStorage.getItem('region');
    if (region) {
      this.region = region;
      this.afficher_region = false;
    } else {
      this.afficher_region = true;
    }

    // this.map2 = new Map({
    //   view: new View({
    //     center: [0, 0],
    //     zoom: 1,
    //   }),
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   target: 'ol-map',
    // });
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
    let features_list = features.split(' - ');
    caracteristiques.push({
      icon: 'map-marker',
      caracteristique: 'Lieu',
      detail: features_list[0],
    });
    for (let i = 1; i < features_list.length; i++) {
      let feature = features_list[i];
      if (feature.indexOf('ans') != -1) {
        caracteristiques.push({
          icon: 'account-check',
          caracteristique: 'Age',
          detail: features_list[i],
        });
      } else if (feature.indexOf('Équipement') != -1) {
        caracteristiques.push({
          icon: 'toolbox',
          caracteristique: 'Équipement',
          detail: features_list[i],
        });
      } else {
        caracteristiques.push({
          icon: 'information',
          caracteristique: features_list[i],
          detail: '',
        });
      }
    }
    return caracteristiques;
  }

  afficher_features(features: string, id?: number) {
    this.detailsCourants = this.parse_details(features);
    this.afficher_details = true;
    this.module.locationId = id!;
    
  }

  populer_localisation() {
    this.serviceInstalation.createLocation(
      this.module.name,
      this.module.type,
      this.module.description,
      this.module.locationId
    );
  }
}

interface Details {
  icon: string;
  caracteristique: string;
  detail: string;
}
