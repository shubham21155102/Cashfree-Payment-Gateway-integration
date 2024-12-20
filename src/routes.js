import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Success from './components/success';
import Failure from './components/failure';
import App from './App';
import Pending from './components/pending';

function Routes_() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
            <Route exact path='/' element={<App />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} />
          <Route exact path='/pending' element={<Pending />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routes_;