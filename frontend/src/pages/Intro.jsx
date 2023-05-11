import React from 'react'
import logo from '../assets/bofa.png';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";
import "../App.css"

const Intro = () => {
    const navigate = useNavigate();
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className='w-72 mb-10'>
                <img className='fade-in' src={logo} style={{}} />
            </div>
            <h1 id="text" className='flex justify-center items-center text-8xl font-bold'>
                <TypeAnimation
                    sequence={[
                        1000,
                        'Welcome to FICC.', // T ypes 'One'
                        // 1000, // Waits 1s
                        // 'Two', // Deletes 'One' and types 'Two'
                        // 2000, // Waits 2s
                        // 'Two Three', // Types 'Three' without deleting 'Two'
                        () => {
                            console.log('Sequence completed'); // Place optional callbacks anywhere in the array
                        }
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={0}
                />
            </h1>

            <div className="mt-5 ">
                <a href="/home">
                    <button className="delay flex items-center btn btn-ghost text-indigo-400 text-lg p-3">Next &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg></button>
                </a>
            </div>
        </div>
    )
}

export default Intro