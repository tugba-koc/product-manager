import { IAction, ActionType, IState } from '../../types/reducer';
import { RootState } from '../store';

export const productInitialState: IState = {
  product: [],
  // productDetail: {},
  error: false,
};

const productReducer = (
  state = productInitialState,
  action: IAction
): IState => {
  switch (action.type) {
    case ActionType.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case ActionType.SET_PRODUCT_DETAIL:
      return {
        ...state,
        // productDetail: {},
      };
    case ActionType.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const selectProductState = (state: RootState) =>
  state.productReducer?.product;
export const selectErrorState = (state: RootState) => state.productReducer?.error;
export default productReducer;
