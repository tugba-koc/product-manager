import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, updateProductDetail } from '../../api/fetch';
import { renderProductDetail } from '../../helpers';
import { selectProductDetailState } from '../../redux/product/productReducer';
import { IProductItem, IUpdateData } from '../../types/reducer';
import EditModal from '../EditModal';
import './style.scss';

type Props = {};

const ProductDetail = (props: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
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
      await fetchProductDetail(id).then((data) =>
        renderProductDetail(data, dispatch)
      );
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

  const saveProductDetail = async (id: string, data: IUpdateData) => {
    let val = await updateProductDetail(id, data);
    renderProductDetail(val, dispatch);
    setIsShown(false);
  };

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
        src={productDetail.thumbnail}
        alt=''
      />
        <p className='product-detail--text-block'>
          brand : {productDetail.brand}
        </p>
        <p className='product-detail--text-block'>
          title : {productDetail.title}
        </p>
        <p className='product-detail--text-block'>
          price : {productDetail.price}
        </p>
        <p className='product-detail--description'>
          {productDetail.description}
        </p>
        <div className='product-detail--image-gallery'>
          {productDetail.images.map((img, index) => (
            <img
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
