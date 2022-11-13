import { IUpdateData, INewProductItem } from './../types/reducer';

// Get all product data
export const fetchProduct = async () => {
  try {
    let response = await fetch(process.env.REACT_APP_BASE_URL + '/products');
    let res = await response.json();
    return res?.products;
  } catch (err) {
    console.log(err);
  }
};

// Get product detail
export const fetchProductDetail = async (id: string) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/products/${id}`
    );
    let res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

// Patch product detail
export const updateProductDetail = async (id: string, data: IUpdateData) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/products/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    let res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

// Patch product detail
export const addProduct = async (data: INewProductItem) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/products/add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    let res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

// Search product
export const searchProduct = async (val: String) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/products/search?q=${val}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    let res = await response.json();
    console.log('test');

    return res.products;
  } catch (err) {
    console.log(err);
  }
};
