import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Map from './components/Map/Map';
import Home from './components/Home/Home';
import FilesUploadComponent from './components/PostUpload/PostUpload.js';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW5sdWlzYSIsImEiOiJjanljNWxiaGQwZnluM2NsZG1wZ3Q3dHRsIn0.St7BhCiZXPL78pfxYA79YQ';

export default function App() {

    return (
      <div>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/map" element={<Map/>}></Route>
            <Route exact path="/post" element={<FilesUploadComponent/>}></Route>
          </Routes>
        
      

      </div>
    );

}