'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delteItem, getTotalPrice, showCarts, updateCart } from "../redux/features/cartSlice";
import { CiCircleRemove } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";


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
      <div className="cart-items-title cart-items-item grid grid-cols-6 items-center gap-2 px-1 text-sm md:text-lg py-2">
        <img src={image} alt={name} className="h-10 w-10 md:h-15 md:w-15 rounded-full" />
        <p>{name}</p>
        <p>$ {price}</p>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={handleDecremnt}
            className="hover:bg-slate-100 p-1 border rounded-full"
          >
            <FaMinus size={10}/>
          </button>
          <p>{quantity}</p>
          <button
            onClick={handleIncrement}
            className="hover:bg-slate-100 p-1 border rounded-full"
          >
            <FaPlus size={10}/>
          </button>
        </div>
        <p>$ {Number(quantity * price).toFixed(2)}</p>
        <div onClick={() => handleRemove(_id)} >
            <CiCircleRemove className=" hover:bg-slate-300 rounded-full" size={30}/>
        </div>
      </div>
      <hr />
    </>
  );
}
