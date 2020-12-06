import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./template/Header";
import Footer from "./template/Footer";
import Routing from "./routes";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Header />
            <Routing />
            <Footer />
          </Router>
        </header>
      </div>
    );
  }
}
