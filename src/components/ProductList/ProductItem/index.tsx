import React from 'react'
import { Link } from 'react-router-dom'
import { IProductItem } from '../../../types/reducer'

type Props = {
  item : IProductItem
}

const ProductItem = ({item}: Props) => {
  return (
    <div>
      <Link to={`/products/${item.id}`}>{item.title}</Link>
    </div>
  )
}

export default ProductItem