import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProduct, searchProduct } from '../../api/fetch';
import { renderFilteredProduct, renderProduct } from '../../helpers';
import {
  selectFilteredProductState,
  selectProductState,
} from '../../redux/product/productReducer';
import { INewProductItem } from '../../types/reducer';
import AddModal from '../AddModal';
import NoContent from '../NoContent';
import Pagination from '../Pagination';
import ProductList from '../ProductList';
import Spinner from '../Spinner';
import './style.scss';

type Props = {};

const Landing = (props: Props) => {
  const [input, setInput] = useState<string>('');
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [newProductData, setNewProductData] = useState<INewProductItem>({
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
  });
  const dispatch = useDispatch();
  const filteredProduct = useSelector(selectFilteredProductState);
  const product = useSelector(selectProductState);

  const getProductData = useCallback(async () => {
    setisLoaded(false);
    try {
      let data = await fetchProduct();
      if (data.message) {
        throw new Error(data.message);
      }
      renderProduct(data, dispatch);
    } catch {
      setError('Please try again later.');
    } finally {
      setisLoaded(true);
    }
  }, [dispatch]);

  // Load all product data initially
  useEffect(() => {
    getProductData();
  }, [getProductData]);

  // save new product data
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val;
    if (e.target.files && e.target.files[0]) {
      val = URL.createObjectURL(e.target.files[0]);
    }
    setNewProductData({
      ...newProductData,
      [e.target.name]: val ? val : e.target.value,
    });
  };

  // send new product data to backend
  const saveProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    newProductData: INewProductItem
  ) => {
    e.preventDefault();
    // check if the input is empty or not
    let isEmptyValue = Object.values(newProductData).some(
      (el) => el.toString().trim().length === 0
    );
    try {
      if (!isEmptyValue) {
        let val = await addProduct(newProductData);
        if (val.message) {
          throw new Error(val.message);
        }
        renderProduct([val, ...product], dispatch);
        setIsShown(false);
        setNewProductData({
          brand: '',
          category: '',
          description: '',
          discountPercentage: 0,
          images: [],
          price: 0,
          rating: 0,
          stock: 0,
          thumbnail: '',
          title: '',
        });
      } else {
        alert('Please type something, not leave blank.');
      }
    } catch {
      setError('Please try again later.');
    }
  };

  // save search text and send it to backend
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setisLoaded(false);
      setInput(e.target.value);
      let val = e.target.value;
      if (val.trim().length) {
        let res = await searchProduct(e.target.value); // i didnt select input state because setInput runs async
        if (res.message) {
          throw new Error(res.message);
        }
        renderFilteredProduct(res, dispatch);
      }
      setCurrentPage(1);
    } catch {
      setError('Please try again later.');
    } finally {
      setisLoaded(true);
    }
  };

  const rowCountHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowCount(Number(e.target.value));
  };

  // paginate filtered data
  let numPages = 0;
  if (!input) {
    numPages = Math.ceil(product.length / rowCount);
  } else {
    numPages = Math.ceil(filteredProduct.length / rowCount);
  }
  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    pages.push(i);
  }
  let start = (currentPage - 1) * rowCount;
  let end = currentPage * rowCount;
  let currentList = [];
  if (!input) {
    currentList = product.slice(start, end);
  } else {
    currentList = filteredProduct.slice(start, end);
  }

  return (
    <div className='main__Outer'>
      <div className='main__header'>
        <h2>Products</h2>
        <div className='main__header-right'>
          <input
            onChange={(e) => searchHandler(e)}
            className='main__header--search-bar'
            type='text'
            name='text'
            value={input}
          />
          <button
            onClick={() => setIsShown(true)}
            className='main__header--add-btn'
          >
            + New
          </button>
        </div>
      </div>
      {!isLoaded ? (
        <Spinner />
      ) : error.length ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '60px' }}>
          {error}
        </div>
      ) : currentList.length ? (
        <>
          <ProductList currentList={currentList} />
          <Pagination
            pages={pages}
            currentPage={currentPage}
            rowCount={rowCount}
            setCurrentPage={setCurrentPage}
            rowCountHandler={rowCountHandler}
          />
        </>
      ) : (
        <NoContent />
      )}

      {isShown ? (
        <AddModal
          setNewProductData={setNewProductData}
          setIsShown={setIsShown}
          saveProduct={saveProduct}
          newProductData={newProductData}
          onChangeHandler={onChangeHandler}
        />
      ) : null}
    </div>
  );
};

export default Landing;
