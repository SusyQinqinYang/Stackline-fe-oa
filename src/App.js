import React from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { fetchSharkNinja } from './redux/productSlice';

import ProductOverview from './components/product-overview';
import Chart from './components/chart';
import Table from './components/table';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchSharkNinja());
  }, [dispatch])

  return (
    <div className="App">
      <header className="header">
        <a href="https://stackline-oa.herokuapp.com/">
          <img src="stackline-logo.png" alt="Stackline Logo" />
        </a>
      </header>
      <div className="Main">
        <ProductOverview className="Main-side"/>
        <Chart className="Main-top"/>
        <Table className="Main-bottom"/>
      </div>
    </div>
  );
}

export default App;
