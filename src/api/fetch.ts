const BASE_URL = 'https://dummyjson.com'

// Fetch the all product data
export const fetchProduct = async () => {
  try {
    let response = await fetch(BASE_URL + '/products');
    let res = await response.json();
    return res?.products;
  } catch (err) {
    console.log(err);
  }
};
