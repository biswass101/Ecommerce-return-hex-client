'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase } from '../redux/features/counterSlice'
import QuantityCounter from './QuantityCounter'
import CartItems from '../components/CartItems'
import { getTotalPrice } from '../redux/features/cartSlice'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function CartDetails() {
    const router = useRouter()
    const cart = useSelector(state => state.carts.items)
    const total = useSelector(getTotalPrice)
    // console.log(cart)

    const handleCheckout =() => {
        axios.post('http://localhost:8000/api/cart', {items: cart, totalAmount: total})
            .then(data => console.log(data.data))
            .catch(err => console.log(err.message))
        router.push('/checkout')
    }

    return (
        <div className='max-w-[1400px] mx-auto'>
            <div className="cart-items">
                <div className="cart-items-title grid grid-cols-6">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div><br /><hr />
                <div>
                    {cart && cart.map((item, idx) => <CartItems key={idx} {...item} />)}

                </div>
            </div>

                {/* overview */}
            <div className="cart-total flex flex-col  gap-[20px] mt-5">
                <h2>Cart Info</h2>
                <div>
                    <div className="cart-total-details flex justify-between text-[#333]">
                        <p>Total</p>
                        <p>$ {total}</p>
                    </div>
                </div>
                <button onClick={handleCheckout} className="bg-amber-200">PROCCED TO CHECKOUT</button>
            </div>
            {/* <Checkout/> */}
        </div>
    )
}
