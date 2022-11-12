import { IAction, ActionType, IState } from '../../types/reducer';
import { RootState } from '../store';

export const productInitialState: IState = {
  product: [],
  productDetail: {
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    id: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
  },
  filteredProduct: [],
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
    case ActionType.FILTER_PRODUCT:
      return {
        ...state,
        filteredProduct: action.payload,
      };
    case ActionType.SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
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
export const selectFilteredProductState = (state: RootState) =>
  state.productReducer?.filteredProduct;
export const selectProductDetailState = (state: RootState) =>
  state.productReducer?.productDetail;
export const selectErrorState = (state: RootState) =>
  state.productReducer?.error;
export default productReducer;
