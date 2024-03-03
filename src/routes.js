import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Success from './components/success';
import Failure from './components/failure';
import App from './App';

function Routess() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
            <Route exact path='/' element={<App />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routess;