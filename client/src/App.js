import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import WeatherPage from './WeatherPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

          <Route path="/" element={<AuthPage/>}/>

          <Route path="/weather" element={<WeatherPage/>}/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
