import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './container/LandingPage';
import ParkSpace from './container/ParkSpace';

function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/parkspace' element={<ParkSpace />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
