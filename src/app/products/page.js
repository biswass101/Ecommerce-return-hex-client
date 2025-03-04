import React from 'react'
import Cart from '../components/Cart'
import { useRouter } from 'next/navigation'
import Nav from '../components/Navigaion'

export default function Products({ data }) {
  const router = useRouter()
  return (
    <div>
      <Nav />
      <div className='max-w-[1400px] mx-auto'>
        <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
          {data && data.map((product, idx) => {
            return <Cart key={idx} {...product} />
          })}
        </div>
      </div>
    </div>
  )
}
