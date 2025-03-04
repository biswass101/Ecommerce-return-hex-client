import React from 'react'

export default function ErrorPage({error}) {
  return (
    <div className='w-full h-screen font-bold text-sm md:text-3xl flex flex-col justify-center items-center'>
        <h1>{error}</h1><br/>
        <h1>Error to loading Products</h1>
    </div>
  )
}
