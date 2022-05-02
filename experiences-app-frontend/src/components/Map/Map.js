import React from 'react';
import './Map.css'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW5sdWlzYSIsImEiOiJjanljNWxiaGQwZnluM2NsZG1wZ3Q3dHRsIn0.St7BhCiZXPL78pfxYA79YQ';

export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 9
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount(){
    const {lng, lat, zoom} = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
  }
  render(){
    return(
      <div ref={this.mapContainer} className="flex-child"></div>
    );
  }
}