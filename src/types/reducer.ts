export enum ActionType {
  SET_PRODUCT = 'SET_PRODUCT',
  SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL',
  ERROR = 'SET_ERROR',
}

export interface SetProductAction {
  type: ActionType.SET_PRODUCT;
  payload: Array<IProductItem>;
}

export interface SetProductDetailAction {
  type: ActionType.SET_PRODUCT_DETAIL;
  payload: IProductItem;
}

export interface ErrorAction {
  type: ActionType.ERROR;
  payload: null | boolean;
}

export type IAction = SetProductAction | ErrorAction | SetProductDetailAction;

export interface IProductItem {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export interface IState {
  product: Array<IProductItem>;
  productDetail: IProductItem;
  error: null | boolean;
}
