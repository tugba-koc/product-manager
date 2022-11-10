import './style.scss';
import { IProductItem, IUpdateData } from '../../types/reducer';
import { useDispatch } from 'react-redux';

type Props = {
  updateData: IUpdateData;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveProductDetail: (id: string, updateData: IUpdateData) => void;
  id?: string;
};

const EditModal = ({ updateData, onChangeHandler, id, saveProductDetail }: Props) => {

  return (
    <div className='modal--Inner'>
      <div className='modal--content'>
        <input
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={updateData.title}
          name='title'
        />
        <input
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={updateData.description}
          name='description'
        />
        <input
          onChange={(e) => onChangeHandler(e)}
          type='text'
          value={updateData.brand}
          name='brand'
        />
        <button onClick={()=>saveProductDetail(id as string, updateData)}>
          save
        </button>
      </div>
    </div>
  );
};

export default EditModal;
