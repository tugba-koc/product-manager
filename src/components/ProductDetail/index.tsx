import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, updateProductDetail } from '../../api/fetch';
import { renderProductDetail } from '../../helpers';
import { selectProductDetailState } from '../../redux/product/productReducer';
import { IProductItem, IUpdateData } from '../../types/reducer';
import EditModal from '../EditModal';
import Spinner from '../Spinner';
import './style.scss';

const ProductDetail = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [updateData, setUpdateData] = useState<IUpdateData>({
    title: '',
    brand: '',
    price: 0,
  });
  const productDetail = useSelector(selectProductDetailState);
  const dispatch = useDispatch();
  let { id } = useParams();

  const getProductDetail = useCallback(
    async (id: string) => {
      try {
        setisLoaded(false);
        let data = await fetchProductDetail(id);
        if (data.message) {
          throw new Error(data.message);
        }
        renderProductDetail(data, dispatch);
      } catch {
        setError('Please try again later.');
      } finally {
        setisLoaded(true);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) getProductDetail(id);
  }, [getProductDetail, id]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const editHandler = (data: IProductItem) => {
    setIsShown(true);
    setUpdateData({
      title: data.title,
      brand: data.brand,
      price: data.price,
    });
  };

  const saveProductDetail = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    data: IUpdateData
  ) => {
    e.preventDefault();
    // check if the input is empty or not
    let isEmptyValue = Object.values(data).some(
      (el) => el.toString().trim().length === 0
    );
    try {
      if (!isEmptyValue) {
        let val = await updateProductDetail(id, data);
        if (val.message) {
          throw new Error(val.message);
        }
        renderProductDetail(val, dispatch);
        setIsShown(false);
      } else {
        alert('Please type something, not leave blank.');
      }
    } catch (err) {
      setError('Please try again later.');
    }
  };

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '60px' }}>
        {error}
      </div>
    );
  }
  if (!isLoaded) {
    return <Spinner />;
  }
  return (
    <div className='product-detail--Outer'>
      <button
        className='product-detail--edit-button'
        onClick={() => editHandler(productDetail)}
      >
        Edit
      </button>

      <div className='product-detail--Inner'>
        <img
          className='product-detail--image'
          src={
            productDetail.thumbnail
              ? productDetail.thumbnail
              : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
          }
          alt=''
        />
        <p className='product-detail--text-block'>
          brand : {productDetail.brand}
        </p>
        <p className='product-detail--text-block'>
          title : {productDetail.title}
        </p>
        <p className='product-detail--text-block'>
          price : {productDetail.price} $
        </p>
        <p className='product-detail--description'>
          {productDetail.description}
        </p>
        <div className='product-detail--image-gallery'>
          {productDetail?.images.map((img, index) => (
            <img
              loading='lazy'
              className='single-detail--image'
              key={index}
              src={img}
              alt=''
            />
          ))}
        </div>
      </div>
      {isShown ? (
        <EditModal
          setIsShown={setIsShown}
          id={id}
          saveProductDetail={saveProductDetail}
          updateData={updateData}
          onChangeHandler={onChangeHandler}
        />
      ) : null}
    </div>
  );
};

export default ProductDetail;
