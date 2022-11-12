import './style.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import {
  selectFilteredProductState,
  selectProductState,
} from '../../redux/product/productReducer';
import { IProductItem } from '../../types/reducer';
import Spinner from '../Spinner';
import ProductItem from './ProductItem';

type Props = {
  input: string;
  currentList: IProductItem[];
};

const ProductList = ({ input, currentList }: Props) => {
  const filteredProduct = useSelector(selectFilteredProductState);
  const product = useSelector(selectProductState);

  return (
    <div className='product__list'>
      {currentList.map((item: IProductItem) => (
        <ProductItem key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
