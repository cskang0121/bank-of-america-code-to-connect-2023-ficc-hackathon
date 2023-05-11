import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Report = () => {
  return (
      <div class="font-sans">
          <Navbar />

          <div style={{
              display: 'flex'
          }}>

              <Sidebar />
              {/* <Main /> */}
          </div>

          <Footer />
      </div>
  )
}

export default Report