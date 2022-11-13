import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { addProduct, searchProduct } from '../../api/fetch';
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

const Landing = () => {
  const { isLoaded, error, setisLoaded, setError } = useOutletContext<{
    isLoaded: boolean;
    error: string;
    setisLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }>();
  const [input, setInput] = useState<string>('');
  const [isShown, setIsShown] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        setIsShown(false);
      } else {
        alert('Please type something, not leave blank.');
      }
    } catch {
      setError('Please try again later.');
    }
  };

  // Debouncing and send it to backend
  useEffect(() => {
    const getData = setTimeout(() => {
      searchProduct(input)
        .then((res) => renderFilteredProduct(res, dispatch))
        .catch((err) => setError('Please try again later.'))
        .finally(() => setisLoaded(true));
    }, 1200);
    return () => clearTimeout(getData);
  }, [input, dispatch, setError, setisLoaded]);

  // save search text
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== ' ') {
      setisLoaded(false);
      setInput(e.target.value);
      setCurrentPage(1);
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
