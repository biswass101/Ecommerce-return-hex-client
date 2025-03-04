'use client'
import Navigaion from "@/app/components/Navigaion"
import { addToCart } from "@/app/redux/features/cartSlice"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RiStockLine } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import ErrorPage from "@/app/components/ErrorPage"
import Loading from "@/app/components/Loading"

export default function page() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const disPatch = useDispatch()
  const handleClick = () => {
    const { _id, image, name, price } = product
    const makeCart = { _id, image, name, price, qt: 1 }
    disPatch(addToCart(makeCart))
    toast('Added to Cart')
  }

  const fetchData = async () => {
    const response = await fetch(`https://e-commrh.onrender.com/api/products/${id}`)
    const data = await response.json()
    if(!response.ok) {
      setIsLoading(false)
      setError(true)
      toast("Error finding Product")
      return;
    }
    setIsLoading(false)
    setProduct(data.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return <>
    <Navigaion />
    {error && <ErrorPage error = "Error Finding Product"/>}
    {isLoading && <Loading/>}
    {product && <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-evenly items-center w-full h-[80vh]">
        <div className="flex flex-col gap-4 md:flex-row md:gap-0"><img src={product.image} alt={product.name} className="h-72 w-72 md:h-96 md:w-96 rounded-xl" /></div>
        <div className="flex flex-col gap-2 md:gap-8 px-3">
          <h1 className="text-xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-lg md:text-xl font-semibold">$ {product.price}</p>
          <p className="text-lg md:text-xl font-semibold">{product.description}</p>
          <div className="flex gap-2 items-center">
            <p className="text-lg md:text-xl font-semibold">{product.stock}</p>
            <RiStockLine size={25} />

          </div>
          <p className="text-lg md:text-xl font-semibold">{product.category}</p>
          <button
            onClick={handleClick}
            className='bg-yellow-300 hover:bg-yellow-500 rounded-xl text-xl flex items-center justify-center gap-2 p-2 font-semibold cursor-pointer'>Add to cart
            <FaCartPlus size={20} />
          </button>
        </div>
      </div>
    </div>}
  </>
}
