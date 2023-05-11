import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Main from './Main'

const Home = () => {

  // const [count, setCount] = useState(0)

  useEffect(() => {
    let interval = setInterval( async () => {
      // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      // setCount((count) => count + 1)
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    
    <div class="font-sans">
      <Navbar />

      <div className="flex">

        <Sidebar />
      {/* <div>{count}</div> */}
        <Main />
      </div>

      <Footer />
    </div>
  )
}

export default Home