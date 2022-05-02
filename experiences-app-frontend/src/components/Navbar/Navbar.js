import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

class Navbar extends Component {



  render(){
    return(
      <Router>
      <nav className="NavbarItems">
        <h1 className="navbar-logo">React</h1>
        <div className="menu-icon"></div>
        
        <ul className="nav-menu">

          {MenuItems.map((item, index) => {
            return(
              <li key={index}>
                <Link className={item.cName} to={item.url}>{item.title}</Link>
              </li>
            )
          })}
  
        </ul>

      </nav>
      </Router>
    )
  }
}

export default Navbar