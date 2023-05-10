import { useState } from 'react';
import '../styles/App.css';
import Navbar from '../components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';

// routing
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Search from './search';
import Houses from './houses';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
