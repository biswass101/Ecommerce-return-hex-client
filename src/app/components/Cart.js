'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart } from '../redux/features/cartSlice'

export default function Cart({ _id, image, name, price }) {
    const router = useRouter()
    const cart = useSelector(state => state.carts.items)
    const disPatch = useDispatch()
    const handleClick = () => {
        const makeCart = {_id, image, name, price, qt: 1}
        disPatch(addToCart(makeCart))
        // disPatch(updateCart({_id, }))
        console.log("Added to cart")
    }
    return (
        <div className='w-[260px] border p-3 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <img
                    onClick={() => router.push(`/product/${_id}`)}
                    src={image} alt={name} className='w-full h-[200px] rounded-xl' />
                <h1>{name}</h1>
                <p>${price}</p>
                <button
                 onClick={handleClick}
                 className='bg-yellow-300 rounded-xl p-2'>Add to cart</button>
            </div>
        </div>
    )
}
