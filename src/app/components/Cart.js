'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart } from '../redux/features/cartSlice'
import { toast } from 'react-toastify'
import { FaCartPlus } from "react-icons/fa";

export default function Cart({ _id, image, name, price }) {
    const router = useRouter()
    const cart = useSelector(state => state.carts.items)
    const disPatch = useDispatch()
    const handleClick = () => {
        const makeCart = { _id, image, name, price, qt: 1 }
        disPatch(addToCart(makeCart))
        toast("Added to cart")
    }
    return (
        <div className='w-[260px] border p-3 rounded-xl cursor-pointer'>
            <div onClick={() => router.push(`/product/${_id}`)} className='flex flex-col gap-2 hover:scale-95 transition-all'>
                <img
                    
                    src={image} alt={name} className='w-full h-[200px] rounded-xl' />
                <h1 className='text-xl'>{name}</h1>
                <p>${price}</p>
                <button
                    onClick={handleClick}
                    className='bg-yellow-300 rounded-xl p-2 cursor-pointer flex gap-2 items-center justify-center'><FaCartPlus />Add to cart</button>
            </div>
        </div>
    )
}
