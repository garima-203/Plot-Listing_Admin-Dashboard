'use strict'

const modalShowcase = `
 
` 
// Jsvectormap
var world_map = new jsVectorMap({
  selector: '#world-map',
  map: 'world', 
  zoomButtons: false,  
    zoomOnScroll: false,
  regionStyle: {
    hover: {
      fill: '#435ebe'
    }
  },
  
  markers: [
    {
      name: 'Maharashtra',
      coords: [-6.229728, 106.6894311],
      style: {
        fill: '#435ebe'
      }
    },
    {
      name: 'Karnataka',
      coords: [38.8936708, -77.1546604],
      style: {
        fill: '#28ab55'
      }
    },
    {
      name: 'Delhi',
      coords: [55.5807481, 36.825129],
      style: {
        fill: '#f3616d'
      }
    },
    {
      name: 'Tamil Nadu',
      coords: [39.9385466, 116.1172735]
    },
    {
      name: 'Gujarat',
      coords: [51.5285582, -0.2416812]
    } 
  ],
  onRegionTooltipShow (event, tooltip) {
    tooltip.css({ backgroundColor: '#435ebe' })
  }
})

  
