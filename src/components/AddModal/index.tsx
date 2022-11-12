import React from 'react';
import { INewProductItem, IProductItem } from '../../types/reducer';
import './style.scss';

type Props = {
  saveProduct: (
    e: React.FormEvent<HTMLFormElement>,
    newProductData: INewProductItem
  ) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProductData: INewProductItem;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProductData: React.Dispatch<React.SetStateAction<INewProductItem>>;
};

const AddModal = ({
  saveProduct,
  newProductData,
  onChangeHandler,
  setIsShown,
  setNewProductData,
}: Props) => {
  return (
    <div className='add-modal--Inner'>
      <form
        onSubmit={(e) => saveProduct(e, newProductData)}
        className='add-modal--content'
      >
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
          required
          onChange={(e) => onChangeHandler(e)}
          type='file'
          name='images'
        />
        <label htmlFor='thumbnail'>Thumbnail</label>
        <input
          required
          onChange={(e) => onChangeHandler(e)}
          type='file'
          name='thumbnail'
        />
        <div className='button-group'>
          <button
            onClick={() => {
              setIsShown(false);
              setNewProductData({
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
            }}
          >
            cancel
          </button>
          <button>save</button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
