'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider} from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>E-commerce app</title>
        <link rel="icon" type="image/png" href="/ex.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {children}
        </Provider>
        <ToastContainer position="top-left" theme="dark" autoClose ={2000}/>
      </body>
    </html>
  );
}
