'use client'
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../redux/features/cartSlice";

export default function Form() {
    // const router = useRouter()
    const cart = useSelector(state => state.carts.items)
    const total = useSelector(getTotalPrice)
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      address: "",
    },
    // validate,
    onSubmit: (values) => {
      axios.post('http://localhost:8000//api/checkout', {
        userInfo: {
            name: values.fname + " " + values.lname,
            email: values.email,
            address: values.address
        },
        items: cart,
        totalAmount: total
      }).then(data => console.log(data.data))
        .catch(err => console.log(err.message))
    },
  });
  return (
    <div className="place-order-left mt-2">
      <p className="title text-xl font-bold">User Info to submit order</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="multi-fields flex gap-2">
            <input
                id="fn"
              className="border outline-0"
              type="text"
              value={formik.values.fname}
              onChange={formik.handleChange}
              placeholder="First Name"
            />
            <input
            id="ln"
              className="border outline-0"
              type="text"
              value={formik.values.lname}
              onChange={formik.handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="flex gap-2">
            <input
            id="email"
              className="border outline-0"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email Addrress"
            />
            <input
            id="address"
              className="border outline-0"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Address"
            />
          </div>
          <button className="bg-yellow-300 p-2 rounded-xl mt-2" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
