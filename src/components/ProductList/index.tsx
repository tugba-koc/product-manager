import './style.scss';
import { IProductItem } from '../../types/reducer';
import ProductItem from './ProductItem';

type Props = {
  currentList: IProductItem[];
};

const ProductList = ({ currentList }: Props) => {

  return (
    <div className='product__list'>
      {currentList.map((item: IProductItem) => (
        <ProductItem key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
