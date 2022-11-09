import { Link } from 'react-router-dom';
import './style.scss'

type Props = {}

const GlobalNav = (props: Props) => {
  return (
    <div className='nav__main'>
      <Link className='nav__link' to='/'> Home </Link>
      <Link className='nav__link' to='/products'> Products </Link>
    </div>
  )
}

export default GlobalNav;