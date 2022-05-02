import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Map from './components/Map/Map';
import About from './pages/about';
import { BrowserRouter as Router, Switch, Routes, Link, Route } from "react-router-dom";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import FilesUploadComponent from './components/files-upload-component';

mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW5sdWlzYSIsImEiOiJjanljNWxiaGQwZnluM2NsZG1wZ3Q3dHRsIn0.St7BhCiZXPL78pfxYA79YQ';

export default class App extends React.PureComponent {

  render() {
    return (
      <div className="flex-container">
        <Router>
          <Routes>
            <Route exact path="/map" element={<Map/>}></Route>
            <Route exact path="/post" element={<FilesUploadComponent/>}></Route>
          </Routes>
        </Router>
        <Navbar/>

      </div>
    );
  }
}