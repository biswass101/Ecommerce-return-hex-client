'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { BsCartXFill } from "react-icons/bs";


export default function EmpyCartPage() {
  const router = useRouter();
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
        <BsCartXFill size={30} className="text-red-600"/>
        <h1 className="text-xl font-semibold">No Cart</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-green-300 hover:bg-green-400 p-3 rounded-xl font-semibold cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}
