'use client'

import React from 'react'
import Form from '../components/Form'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../redux/features/cartSlice'
import CartItems from '../components/CartItems'

export default function Checkout() {
    const cart = useSelector(state => state.carts.items)
    const total = useSelector(getTotalPrice)
    console.log(cart)
    console.log(total)
    return (
        <div className="flex flex-col">
            <div className="cart-items">
                <div className="cart-items-title grid grid-cols-5">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div><br /><hr />
                <div>
                    {cart && cart.map((item, idx) => (
                        <div key={idx} className="cart-items-title cart-items-item grid grid-cols-5 items-center">
                            <img src={item.image} alt={item.name} className="h-15 w-15" />
                            <p>{item.name}</p>
                            <p>$ {item.price}</p>

                            <p>{item.qt}</p>

                            <p>$ {item.qt * item.price}</p>
                        </div>
                    ))}

                </div>
                <h1 className='mt-4'>Cart Total: ${total}</h1>
            </div>
            <Form />
        </div>
    )
}
