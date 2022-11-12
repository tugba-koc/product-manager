import './style.scss';
import { Link } from 'react-router-dom';
import { IProductItem } from '../../../types/reducer';

type Props = {
  item: IProductItem;
};

const ProductItem = ({ item }: Props) => {
  return (
    <div className='list__item'>
      <img
        className='list__item--img'
        src={
          item.thumbnail
            ? item.thumbnail
            : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
        }
        alt=''
      />
      <div className='list__item--title'>
        <Link to={`/products/${item.id}`}>{item.title}</Link>
      </div>
      <div className='list__item--desc'>{item.description.slice(0, 40)}...</div>
    </div>
  );
};

export default ProductItem;
