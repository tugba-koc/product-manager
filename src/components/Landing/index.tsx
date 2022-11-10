import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProduct } from '../../api/fetch';
import { renderProduct } from '../../helpers';
import { selectProductState } from '../../redux/product/productReducer';
import { INewProductItem, IProductItem } from '../../types/reducer';
import AddModal from '../AddModal';
import ProductList from '../ProductList';
import './style.scss';

type Props = {};

const Landing = (props: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [newProductData, setNewProductData] = useState<INewProductItem>({
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
  });
  const dispatch = useDispatch();
  const product = useSelector(selectProductState);
  const getProductData = useCallback(async () => {
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
    getProductData();
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductData({...newProductData, [e.target.name]: e.target.value });
  };

  const saveProduct = async (newProductData: INewProductItem) => {
    let val = await addProduct(newProductData);
    renderProduct([...product, val], dispatch);
    setIsShown(false);
  };

  return (
    <div className='main__Outer'>
      <div className='main__header'>
        <h2>Products</h2>
        <div className='main__header-right'>
          <input className='main__header--search-bar' type='text' name='text' />
          <button
            onClick={() => setIsShown(true)}
            className='main__header--add-btn'
          >
            + New
          </button>
        </div>
      </div>
      <ProductList />
      {isShown ? (
        <AddModal
          saveProduct={saveProduct}
          newProductData={newProductData}
          onChangeHandler={onChangeHandler}
          // updateData={updateData}
          // onChangeHandler={onChangeHandler}
        />
      ) : null}
    </div>
  );
};

export default Landing;
