import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchProduct } from './api/fetch';
import './App.css';
import GlobalNav from './components/GlobalNav';
import { renderProduct } from './helpers';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  const getProductData = useCallback(async () => {
    try {
      setisLoaded(false);
      let data = await fetchProduct();
      if (data.message) {
        throw new Error(data.message);
      }
      renderProduct(data, dispatch);
    } catch {
      setError('Please try again later.');
    } finally {
      setisLoaded(true);
    }
  }, [dispatch]);

  // It should be called in this component to prevent running of useeffect event when passing from product page to product detail page
  // Load all product data initially
  useEffect(() => {
    getProductData();
  }, [getProductData]);

  return (
    <div className='App'>
      <GlobalNav />
      <Outlet context={{ isLoaded, setisLoaded, error, setError }} />
    </div>
  );
}

export default App;
