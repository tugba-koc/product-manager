// Fetch all product data
export const fetchProduct = async () => {
  try {
    let response = await fetch(process.env.REACT_APP_BASE_URL + '/products');
    let res = await response.json();
    return res?.products;
  } catch (err) {
    console.log(err);
  }
};

// Fetch product detail
export const fetchProductDetail = async (id: string) => {
  try {
    let response = await fetch(process.env.REACT_APP_BASE_URL + `/products/${id}`);
    let res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};
