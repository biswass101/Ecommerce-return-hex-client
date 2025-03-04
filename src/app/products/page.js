import React from 'react'
import Cart from '../components/Cart'
import { useRouter } from 'next/navigation'

export default function Products({data}) {
  const router = useRouter()
  return (
    <div className='max-w-[1400px] mx-auto bg-slate-500'>
        <div>
          <button onClick={() => router.push('/cart')} className='p-2 bg-red-500'>Cart</button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
            {data && data.map((product, idx) => {
          return <Cart key={idx} {...product}/>
        })}
        </div>
    </div>
  )
}
