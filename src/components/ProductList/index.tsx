import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductState } from '../../redux/product/productReducer';
import { IProductItem } from '../../types/reducer';
import ProductItem from './ProductItem';

type Props = {};

const ProductList = () => {
  const product = useSelector(selectProductState);
  return (
    <>
      {product.map((item: IProductItem) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default ProductList;
