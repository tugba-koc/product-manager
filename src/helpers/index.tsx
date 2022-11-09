import { Dispatch } from 'react';
import { ActionType, IProductItem } from '../types/reducer';

const renderProduct = (value: IProductItem[], dispatch: Dispatch<any>) => {
  dispatch({
    type: ActionType.SET_PRODUCT,
    payload: value,
  });
  dispatch({
    type: ActionType.ERROR,
    payload: false,
  });
};

export { renderProduct };
