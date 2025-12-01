import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ecosystem from './pages/Ecosystem';
import Events from './pages/Events';
import Funding from './pages/Funding';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/events" element={<Events />} />
          <Route path="/funding" element={<Funding />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;