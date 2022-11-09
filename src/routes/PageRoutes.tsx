import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from '../App';
import Greeting from '../components/Greeting';
import Landing from '../components/Landing';
import NoMatch from '../components/NoMatch';

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Greeting />} />
          <Route path='/products' element={<Landing />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
