import { Dispatch } from 'react';
import { ActionType, IProductItem, SetFilterProductAction, SetProductAction, SetProductDetailAction } from '../types/reducer';

const renderProduct = (value: IProductItem[], dispatch: Dispatch<SetProductAction>) => {
  dispatch({
    type: ActionType.SET_PRODUCT,
    payload: value,
  });
};

const renderProductDetail = (value: IProductItem, dispatch: Dispatch<SetProductDetailAction>) => {
  dispatch({
    type: ActionType.SET_PRODUCT_DETAIL,
    payload: value,
  });
};

const renderFilteredProduct = (
  value: IProductItem[],
  dispatch: Dispatch<SetFilterProductAction>
) => {
  dispatch({
    type: ActionType.FILTER_PRODUCT,
    payload: value,
  });
};

export { renderProduct, renderProductDetail, renderFilteredProduct };
