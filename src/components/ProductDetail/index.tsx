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
    description: '',
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
      description: data.description,
    });
  };

  const saveProductDetail = async (id: string, data: IUpdateData) => {
    let val = await updateProductDetail(id, data);
    renderProductDetail(val, dispatch);
    setIsShown(false);
  };

  return (
    <div>
      <button onClick={() => editHandler(productDetail)}>Edit</button>
      <div>
        <img src={productDetail.thumbnail} alt='' />
        <p>
          {' '}
          <span>{productDetail.category}</span>{' '}
          <span>{productDetail.title}</span>
        </p>
        <p>{productDetail.description}</p>
        <div>
          {productDetail.images.map((img, index) => (
            <img key={index} src={img} alt='' />
          ))}
        </div>
      </div>
      {isShown ? (
        <EditModal
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
