'use client'
import { useEffect, useState } from "react";
import Products from "./products/page";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setData(data.data)
      })
  }, [])
  return (
    <>
      
        <Products data={data} />
      
    </>
  );
}
