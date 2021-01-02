const ACCESS_TOKEN = 'pk.eyJ1IjoiYmF5dWxheGFuYSIsImEiOiJja2phejB0bnYyY3pjMnBudnhkNjByYTYzIn0.Hwr5bsW7j420s1yI6U1brA';
const MAP_STREET_VIEW = 'mapbox/streets-v11';
const MAP_SATELLITE_VIEW = 'mapbox/satellite-v9';
const MAP_SATELLITE_STREET_VIEW = 'mapbox/satellite-streets-v11';
const DEFAULT_ZOOM_LEVEL = 13;
const DEFAULT_MAP_VIEW = MAP_STREET_VIEW;

/**
 * 
 * @param {string} elem 
 * @param {Array<number>} latlng
 */
function initializeMap(elem, latlng = null) {
  let maplayer = L.map(elem, {
    zoomControl: false,
  });

  if (latlng) maplayer.setView(latlng, DEFAULT_ZOOM_LEVEL);
  else maplayer.setView([-7.23333, 112.73333], DEFAULT_ZOOM_LEVEL);

  let tilelayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: DEFAULT_MAP_VIEW,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  });

  tilelayer.addTo(maplayer);
  return [maplayer, tilelayer];
}

/**
 * 
 * @param {string} location 
 */
function getForwardGeocodingAPI(location) {
  let locstr = encodeURI(location);
  let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locstr}.json?autocomplete=false&access_token=${ACCESS_TOKEN}`;
  return api;
}

/**
 * 
 * @param {string} mapview
 */
function createTileLayer(mapview) {
  let newlayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: mapview,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  });

  return newlayer;
}