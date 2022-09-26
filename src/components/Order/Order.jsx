import React from 'react'

const Order = ({product}) => {
  return (
    <tr>
    <td>{product.nameProduct}</td>
    <td>{product.codeProduct}</td>
    <td>{product.price}</td>
    <td>{product.amount}</td>
    </tr>
  )
}

export default Order