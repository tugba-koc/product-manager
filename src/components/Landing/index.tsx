import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../api/fetch';
import { renderProduct } from '../../helpers';
import { selectProductState } from '../../redux/product/productReducer';
import ProductList from '../ProductList';
import './style.scss'

type Props = {};

const Landing = (props: Props) => {
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    await fetchProduct()
      .then((data) => {
        renderProduct(data, dispatch);
        // setisLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='main__Outer'>
      <div className='main__header'>
        <h2>Products</h2>
        <div className='main__header-right'>
          <input className='main__header--search-bar' type='text' name='text' />
          <button className='main__header--add-btn'>+ New</button>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Landing;
