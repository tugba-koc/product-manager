import { Outlet } from 'react-router-dom';
import './App.css';
import GlobalNav from './components/GlobalNav';

function App() {
  return (
    <div className='App'>
      <GlobalNav />
      <Outlet />
    </div>
  );
}

export default App;
