import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

function Navbar() {

    return(
      <header>
      <nav>
        <h1>Experiences App</h1>
        <ul>
          {MenuItems.map((item, index) => {
            return(
              <li key={index}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            )
          })}
  
        </ul>

      </nav>
      </header>

    )

}

export default Navbar