'use client'
import { useEffect, useState } from "react";
import Products from "./products/page";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import Head from "next/head";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
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
