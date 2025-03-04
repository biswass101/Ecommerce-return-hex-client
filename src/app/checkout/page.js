'use client'

import React from 'react'
import Form from '../components/Form'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../redux/features/cartSlice'
import CartItems from '../components/CartItems'
import { useSearchParams } from 'next/navigation'
import Navigaion from '../components/Navigaion'

export default function Checkout() {
    const cart = useSelector(state => state.carts.items)
    const total = useSelector(getTotalPrice)
    const searchParams = useSearchParams()
    const cartId = searchParams.get('id')
    console.log(cartId)
    // console.log(cart)
    // console.log(total)
    return (
        <>
            <Navigaion />
            <div className='max-w-[1400px] mx-auto'>
                <div className="flex flex-col">
                    <div className="cart-items">
                        <div className="cart-items-title grid grid-cols-5 justify-center items-center text-sm px-2 font-bold">
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                        </div><br /><hr />
                        <div>
                            {cart && cart.map((item, idx) => (
                                <div key={idx} className="cart-items-title cart-items-item grid grid-cols-5 text-sm items-center px-2 py-2">
                                    <img src={item.image} alt={item.name} className="h-10 w-10 md:h-15 md:w-15 rounded-full" />
                                    <p>{item.name}</p>
                                    <p>$ {Number(item.price).toFixed(2)}</p>

                                    <p>{item.qt}</p>

                                    <p>$ {Number(item.qt * item.price).toFixed(2)}</p>
                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end px-2'>
                            <h1 className='mt-4 text-lg md:text-xl font-semibold'>Cart Total: ${Number(total).toFixed(2)}</h1>
                        </div>
                    </div>
                    <Form />
                </div>
            </div>
        </>
    )
}
