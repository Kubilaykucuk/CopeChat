import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Chatbot from '../pages/chatbot'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClick = (event) => 
  {
    setShow(!show);
  }
  
  return (
    <div className="fixed bottom-0 right-0 flex h-screen items-end justify-end p-5">
      <div className={`transition-transform duration-500 transform ${show ? 'translate-y-0' : 'translate-y-full'} flex`}>
        {show && <div className="bg-white rounded-lg shadow-lg">
          <Chatbot />
        </div>}
      </div>
      <button className={`flex items-center m-5 bg-transparent rounded ${show ? 'animate-swing' : ''}`} onClick={handleClick}>
        <Image src="/copetract_logo1.png" alt="Logo" width={60} height={60} />
      </button>
    </div>
  );
}
