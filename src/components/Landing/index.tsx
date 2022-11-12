import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProduct, searchProduct } from '../../api/fetch';
import { renderFilteredProduct, renderProduct } from '../../helpers';
import {
  selectFilteredProductState,
  selectProductState,
} from '../../redux/product/productReducer';
import { INewProductItem, IProductItem } from '../../types/reducer';
import AddModal from '../AddModal';
import Pagination from '../Pagination';
import ProductList from '../ProductList';
import Spinner from '../Spinner';
import './style.scss';

type Props = {};

const Landing = (props: Props) => {
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

  const getProductData = useCallback(async () => {
    await fetchProduct()
      .then((data) => {
        renderProduct(data, dispatch);
        // setisLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Load all product data initially
  useEffect(() => {
    getProductData();
  }, []);

  // save new product data
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductData({ ...newProductData, [e.target.name]: e.target.value });
  };

  // send new product data to backend
  const saveProduct = async (newProductData: INewProductItem) => {
    let val = await addProduct(newProductData);
    console.log(val);
    renderProduct([...product, val], dispatch);
    setIsShown(false);
  };

  // save search text and send it to backend
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    let val = e.target.value;
    if (val.trim().length >= 2) {
      let res = await searchProduct(e.target.value); // i didnt select input state because setInput runs async
      renderFilteredProduct(res, dispatch);
    }
    setCurrentPage(1);
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
      {currentList.length ? (
        <>
          <ProductList input={input} currentList={currentList} />
          <Pagination
            pages={pages}
            currentPage={currentPage}
            rowCount={rowCount}
            setCurrentPage={setCurrentPage}
            rowCountHandler={rowCountHandler}
          />
        </>
      ) : currentList.length != 0 ? (
        <Spinner />
      ) : (<div>NO ELEMENT</div>)}

      {isShown ? (
        <AddModal
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
