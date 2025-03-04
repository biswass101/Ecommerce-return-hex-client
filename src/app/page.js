'use client'
import { useEffect, useState } from "react";
import Products from "./products/page";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import Head from "next/head";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch('https://e-commrh.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        setData(data.data)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])
  return (
    <>
      <Head>
        <title>E-Commerce App</title>
      </Head>
      {isLoading && <Loading/>}
      {error && <ErrorPage error = {error}/>}
      <Products data={data} />
    </>
  );
}
