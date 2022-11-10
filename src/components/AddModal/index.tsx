import React from 'react';
import { INewProductItem, IProductItem } from '../../types/reducer';

type Props = {
  saveProduct: (newProductData: INewProductItem) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProductData: INewProductItem;
};

const AddModal = ({ saveProduct, newProductData, onChangeHandler }: Props) => {
  return (
    <div className='modal--Inner'>
      <div className='modal--content'>
        <input
            onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.title}
          name='title'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.description}
          name='description'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.brand}
          name='brand'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.category}
          name='category'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.discountPercentage}
          name='discountPercentage'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.price}
          name='price'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.rating}
          name='rating'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.stock}
          name='stock'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='file'
          value={newProductData.images}
          name='images'
        />
        <input
            onChange={(e) => onChangeHandler(e)}
          type='file'
          value={newProductData.thumbnail}
          name='thumbnail'
        />
        <button onClick={() => saveProduct(newProductData)}>save</button>
      </div>
    </div>
  );
};

export default AddModal;
