import './style.scss'
import { useSelector } from 'react-redux';
import { selectProductState } from '../../redux/product/productReducer';
import { IProductItem } from '../../types/reducer';
import ProductItem from './ProductItem';

type Props = {};

const ProductList = () => {
  const product = useSelector(selectProductState);
  return (
    <div className='product__list'>
      {product.map((item: IProductItem) => (
        <ProductItem key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
