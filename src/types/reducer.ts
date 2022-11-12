export enum ActionType {
  SET_PRODUCT = 'SET_PRODUCT',
  FILTER_PRODUCT = 'FILTER_PRODUCT',
  SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL',
  ERROR = 'SET_ERROR',
}

export interface SetProductAction {
  type: ActionType.SET_PRODUCT;
  payload: Array<IProductItem>;
}

export interface SetFilterProductAction {
  type: ActionType.FILTER_PRODUCT;
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

export type IAction =
  | SetProductAction
  | SetFilterProductAction
  | ErrorAction
  | SetProductDetailAction;

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
}

export interface INewProductItem {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface IState {
  product: Array<IProductItem>;
  filteredProduct: Array<IProductItem>;
  productDetail: IProductItem;
  error: null | boolean;
  isLoadedProduct: boolean;
}

export interface IUpdateData {
  title: string;
  brand: string;
  price: number;
}
