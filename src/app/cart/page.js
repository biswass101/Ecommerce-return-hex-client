'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from '../components/CartItems'
import { getTotalPrice } from '../redux/features/cartSlice'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navigaion from '../components/Navigaion'
import EmpyCartPage from '../components/EmpyCartPage'

export default function CartDetails() {
    const router = useRouter()
    const cart = useSelector(state => state.carts.items)
    const total = useSelector(getTotalPrice)

    const handleCheckout = () => {
        axios.post('https://e-commrh.onrender.com/api/cart', { items: cart, totalAmount: total })
            .then(data => {
                const cartId = data.data.data._id
                router.push(`/checkout/?id=${cartId}`)
                toast('Cart procceded')
            })
            .catch(err => console.log(err.message))
    }

    return (
        <>
            <Navigaion />
            <div className='max-w-[1400px] mx-auto'>
                {cart.length ? <div>
                    <div className="cart-items">
                        <div className="cart-items-title grid grid-cols-6 px-1 text-sm md:text-lg font-bold">
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
                    <div className="cart-total flex flex-col  gap-[20px] mt-5 px-1 md:p-2">
                        <h2 className='font-bold text-xl'>Cart Info</h2>
                        <div>
                            <div className="cart-total-details flex justify-between text-[#333] font-bold text-lg">
                                <p>Total</p>
                                <p>$ {Number(total).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={handleCheckout}
                                className="bg-amber-200 hover:bg-amber-400 py-3 md:py-4 px-6 md:px-10 rounded-xl text-sm md:text-lg cursor-pointer">PROCCED TO CHECKOUT</button>
                        </div>
                    </div>
                </div> : <EmpyCartPage />
                }
            </div>
        </>
    )
}
