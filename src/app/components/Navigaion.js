'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsCartPlusFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export default function Navigaion() {
    const cart = useSelector(state => state.carts.items)
    const router = useRouter()
  return (
    <nav className="max-w-[1400px] mx-auto sticky top-0 bg-white">
            <div className="flex justify-between items-center p-4">
                <Link href={'/'}><h1 className="text-xl md:text-3xl font-bold cursor-pointer">Return Hex</h1></Link>
                <ul className="flex gap-1 text-sm md:text-xl font-bold">
                    <Link href={'/'}><li className="cursor-pointer p-2 hover:bg-slate-200 rounded-xl">Home</li></Link>
                    <Link href={'/'}><li className="cursor-pointer p-2 hover:bg-slate-200 rounded-xl">Products</li></Link>
                </ul>
                <button onClick={() => router.push('/cart')}
                    className='p-2 hover:bg-slate-200 hover:rounded-xl cursor-pointer relative'>
                    <div className={`${cart.length && 'bg-red-500'} h-3 w-3 rounded-xl absolute right-1 top-1`} />
                    <BsCartPlusFill size={30} />
                </button>
            </div>
        </nav>
  )
}
