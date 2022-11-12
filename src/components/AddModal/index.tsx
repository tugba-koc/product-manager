import React from 'react';
import { INewProductItem, IProductItem } from '../../types/reducer';
import './style.scss';

type Props = {
  saveProduct: (newProductData: INewProductItem) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProductData: INewProductItem;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddModal = ({
  saveProduct,
  newProductData,
  onChangeHandler,
  setIsShown,
}: Props) => {
  return (
    <div className='add-modal--Inner'>
      <form className='add-modal--content'>
        <label htmlFor='title'>Title</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.title}
          name='title'
        />
        <label htmlFor='description'>Description</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.description}
          name='description'
        />
        <label htmlFor='brand'>Brand</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.brand}
          name='brand'
        />
        <label htmlFor='category'>Category</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={newProductData.category}
          name='category'
        />
        <label htmlFor='discountPercentage'>Discount Percentage</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.discountPercentage}
          name='discountPercentage'
        />
        <label htmlFor='price'>Price</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.price}
          name='price'
        />
        <label htmlFor='rating'>Rating</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.rating}
          name='rating'
        />
        <label htmlFor='stock'>Stock</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='number'
          value={newProductData.stock}
          name='stock'
        />
        <label htmlFor='images'>Images</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='file'
          value={newProductData.images}
          name='images'
        />
        <label htmlFor='thumbnail'>Thumbnail</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='file'
          value={newProductData.thumbnail}
          name='thumbnail'
        />
        <div className='button-group'>
          <button onClick={() => setIsShown(false)}>cancel</button>
          <button onSubmit={() => saveProduct(newProductData)}>save</button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
