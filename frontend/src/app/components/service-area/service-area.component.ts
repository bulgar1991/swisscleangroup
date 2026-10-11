import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import type { FeatureCollection } from 'geojson';
import type { LayerGroup, Map as LeafletMap } from 'leaflet';

type Leaflet = typeof import('leaflet');

// Leaflet is a CommonJS package: loaded on demand, its API sits under `default`.
async function loadLeaflet(): Promise<Leaflet> {
  const module: Leaflet & { default?: Leaflet } = await import('leaflet');
  return module.default ?? module;
}

// Grey national map from swisstopo - free open government data, no API key.
const TILES_URL =
  'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg';
const TILES_ATTRIBUTION = '&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>';

// Borders of Vaud, Valais and Fribourg (swisstopo data via the swiss-maps package, simplified).
const CANTONS_URL = 'assets/data/service-area-cantons.geojson';

// Headquarters - the pin with the logo.
const HEADQUARTERS: [number, number] = [46.2331, 7.3606];

// Where each canton name sits on the map (by its code in the GeoJSON).
const CANTON_LABELS: Record<string, [number, number]> = {
  VD: [46.68, 6.42],
  FR: [46.7, 7.08],
  VS: [46.13, 7.72],
};

/**
 * "Notre zone d'intervention": an interactive map with the cantons we work in (Vaud, Valais,
 * Fribourg) highlighted and our logo on the headquarters in Sion. Home and contact pages.
 */
@Component({
  imports: [TranslatePipe],
  selector: 'app-service-area',
  styleUrl: './service-area.component.scss',
  templateUrl: './service-area.component.html',
})
export class ServiceAreaComponent {
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private mapEl = viewChild.required<ElementRef<HTMLElement>>('mapEl');

  private map?: LeafletMap;
  private labels?: LayerGroup;

  constructor() {
    // Browser only - Leaflet needs the real DOM. Loaded on demand, outside the main bundle.
    afterNextRender(async () => {
      const [leaflet, cantons] = await Promise.all([
        loadLeaflet(),
        fetch(CANTONS_URL).then((response) => response.json() as Promise<FeatureCollection>),
      ]);
      this.createMap(leaflet, cantons);
      // Canton names and the headquarters label follow the language.
      const subscription = this.translate.onLangChange.subscribe(() => this.drawLabels(leaflet));
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    });
    this.destroyRef.onDestroy(() => this.map?.remove());
  }

  private createMap(leaflet: Leaflet, cantons: FeatureCollection): void {
    const map = leaflet.map(this.mapEl().nativeElement, {
      // Don't hijack page scrolling: zoom with the buttons, drag only on desktop.
      scrollWheelZoom: false,
      dragging: !leaflet.Browser.mobile,
      // Fractional zoom, so the three cantons fill the frame.
      zoomSnap: 0.25,
    });
    this.map = map;
    leaflet.tileLayer(TILES_URL, { attribution: TILES_ATTRIBUTION, maxZoom: 18 }).addTo(map);

    // Colours come from the stylesheet (.service-map-canton), not from here.
    const area = leaflet
      .geoJSON(cantons, { style: { className: 'service-map-canton' } })
      .addTo(map);
    map.fitBounds(area.getBounds(), { padding: [16, 16] });

    const logo = leaflet.divIcon({
      className: 'service-map-icon',
      html: '<span class="service-map-hq"><img src="assets/images/header/site-logo.png" alt="" width="40" height="40" /></span>',
      iconSize: [56, 64],
      iconAnchor: [28, 64],
    });
    leaflet.marker(HEADQUARTERS, { icon: logo, keyboard: false, zIndexOffset: 1000 }).addTo(map);

    this.labels = leaflet.layerGroup().addTo(map);
    this.drawLabels(leaflet);
  }

  private drawLabels(leaflet: Leaflet): void {
    if (!this.labels) return;
    this.labels.clearLayers();
    for (const [code, position] of Object.entries(CANTON_LABELS)) {
      this.labels.addLayer(
        leaflet.tooltip(position, {
          content: this.translate.instant('serviceArea.cantons.' + code),
          permanent: true,
          direction: 'center',
          className: 'service-map-label',
        }),
      );
    }
    this.labels.addLayer(
      leaflet.tooltip(HEADQUARTERS, {
        content: 'Swiss Clean Group · ' + this.translate.instant('serviceArea.headquarters'),
        permanent: true,
        direction: 'top',
        offset: [0, -66],
        className: 'service-map-label service-map-label--hq',
      }),
    );
  }
}
