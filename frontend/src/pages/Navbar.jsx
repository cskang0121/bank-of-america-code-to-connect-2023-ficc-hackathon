import React from 'react'
import logo from '../assets/bofa.png';

const Navbar = () => {
    const d = new Date();
    return (
        <div style={{
            height: '5vh',
            font: 'Roboto',
            backgroundColor: '#f3f4f6',
        }}
            className="flex justify-between">
            <div className="flex items-center ps-5">
                <div className='w-10'>
                    <img src={logo} className='' />
                </div>
                <div className='ps-3'>Good Morning, <b>KANG</b> Chin Shen</div>
            </div>

            <div className='flex items-center pe-5'>
                <div className='w-3 h-3 bg-green-500 rounded-full inline-block'></div>
                <div className='p-3'>Active</div>
            </div>
        </div>
    )
}

export default Navbar;