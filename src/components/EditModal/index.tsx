import './style.scss';
import { IProductItem, IUpdateData } from '../../types/reducer';
import { useDispatch } from 'react-redux';

type Props = {
  updateData: IUpdateData;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveProductDetail: (id: string, updateData: IUpdateData) => void;
  id?: string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModal = ({
  updateData,
  onChangeHandler,
  id,
  saveProductDetail,
  setIsShown,
}: Props) => {
  return (
    <div className='modal--Inner'>
      <div className='modal--content'>
        <label htmlFor='title'>Title</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={updateData.title}
          name='title'
        />
        <label htmlFor='price'>Price</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='number'
          value={updateData.price}
          name='price'
        />
        <label htmlFor='brand'>Brand</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={updateData.brand}
          name='brand'
        />
        <div className='button-group'>
        <button onClick={() => setIsShown(false)}>cancel</button>
        <button onClick={() => saveProductDetail(id as string, updateData)}>
          save
        </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
