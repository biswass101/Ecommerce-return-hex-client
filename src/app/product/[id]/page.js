// 'use client'
// import React, { useState } from 'react'
'use client'
import { addToCart } from "@/app/redux/features/cartSlice"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function page() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const router = useRouter()

  const showCart = useSelector(state => state.carts.items)
  console.log(showCart)
  const disPatch = useDispatch()
  const handleClick = () => {
    const {_id, image, name, price} = product
    const makeCart = { _id, image, name, price, qt: 1 }
    disPatch(addToCart(makeCart))
  }

  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/api/products/${id}`)
    const data = await response.json()
    setProduct(data.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return <>

    {product && <div>
      <div>
          <button onClick={() => router.push('/cart')} className='p-2 bg-red-500'>Cart</button>
      </div>
      <img src={product.image} alt={product.name} className="h-96 w-96" />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.stock}</p>
      <p>{product.category}</p>
      <button
        onClick={handleClick}
        className='bg-yellow-300 rounded-xl p-2'>Add to cart</button>
    </div>}
  </>
}
