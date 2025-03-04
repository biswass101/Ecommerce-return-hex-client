"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, resetCart } from "../redux/features/cartSlice";
import { toast } from "react-toastify";

export default function Form() {
  const cart = useSelector((state) => state.carts.items);
  const total = useSelector(getTotalPrice);
  const dispatch = useDispatch()

  const router = useRouter();
  const searchParams = useSearchParams();
  const cartId = searchParams.get("id");

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      address: "",
    },
    // validate,
    onSubmit: (values) => {
      axios
        .post("https://e-commrh.onrender.com/api/checkout", {
          userInfo: {
            name: values.fname + " " + values.lname,
            email: values.email,
            address: values.address,
          },
          items: cart,
          totalAmount: total,
        })
        .then((data) => {
          axios
            .delete(`https://e-commrh.onrender.com/api/cart/${cartId}`)
            .then((res) => {
              toast("cart removed");
            })
            .catch((err) => toast(err.message));

          console.log(data.data);
        })
        .catch((err) => console.log(err.message));
      toast("order placed successfully");
      dispatch(resetCart())
      router.push("/");
    },
  });

  const handleNewOrder = () => {
    axios
      .delete(`https://e-commrh.onrender.com/api/cart/${cartId}`)
      .then((res) => {
        dispatch(resetCart())
        router.push("/");
        toast("cart removed");
      })
      .catch((err) => toast(err.message));
  };
  return (
    <div className="place-order mt-2 flex flex-col items-center gap-3 ">
      <p className="title text-xl font-bold">User Information to submit order</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="multi-fields flex flex-col md:flex-row gap-2">
            <input
              id="fname"
              className="border outline-0 py-2 px-4 text-sm rounded-sm"
              type="text"
              value={formik.values.fname}
              onChange={formik.handleChange}
              placeholder="First Name"
              required
            />
            <input
              id="lname"
              className="border outline-0 py-2 px-4 text-sm rounded-sm"
              type="text"
              value={formik.values.lname}
              onChange={formik.handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              id="email"
              className="border outline-0 py-2 px-4 text-sm rounded-sm"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              required
            />
            <input
              id="address"
              className="border outline-0 py-2 px-4 text-sm rounded-sm"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Address"
              required
            />
          </div>
          <button className="bg-yellow-300 hover:bg-yellow-400 p-1 md:p-3 rounded-xl mt-2 cursor-pointer font-semibold" type="submit">
            Submit Order
          </button>
        </div>
      </form>
      <button
        onClick={handleNewOrder}
        className="bg-green-300 hover:bg-green-400 px-3 py-1 md:p-3 rounded-xl mt-2 cursor-pointer md:font-semibold"
      >
        Make New Order
      </button>
    </div>
  );
}
