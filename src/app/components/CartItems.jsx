'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delteItem, getTotalPrice, showCarts, updateCart } from "../redux/features/cartSlice";
import { accumulate } from "../utils/acummulator";

export default function CartItems({total, setTotal, _id, image, name, price, qt }) {
    const [quantity, setQuantity] = useState(qt)
    // const cart = useSelector(state => state.carts.items)
    // console.log(cart)
    const dispatch = useDispatch()
    // useEffect(() => {

    // }, [quantity])
    const handleRemove = (id) => {
        dispatch(delteItem(id))
    }

    const handleIncrement = () => {

        setQuantity(quantity + 1)
        dispatch(updateCart({_id, qt: quantity+1}))
        // setTotal(quantity * price)
    }
    const handleDecremnt = () => {
        if (quantity > 0) {
            // setTotal(accumulate(cart))
            setQuantity(quantity - 1);
            dispatch(updateCart({_id, qt: quantity-1}))
            // setTotal(quantity * price)
          }
    }
  return (
    <>
      <div className="cart-items-title cart-items-item grid grid-cols-6 items-center">
        <img src={image} alt={name} className="h-15 w-15" />
        <p>{name}</p>
        <p>$ {price}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecremnt}
            className="bg-slate-300 p-1 rounded-full"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={handleIncrement}
            className="bg-slate-300 p-1 rounded-full"
          >
            +
          </button>
        </div>
        <p>$ {quantity * price}</p>
        <p onClick={() => handleRemove(_id)} className="cross">X</p>
      </div>
      <hr />
    </>
  );
}
