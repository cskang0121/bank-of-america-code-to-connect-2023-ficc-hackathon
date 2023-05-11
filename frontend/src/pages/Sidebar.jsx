import React from 'react'
import Modal from 'react-modal';
import { useRef, useEffect, useState } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Sidebar = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div
                style={{
                    height: '91vh',
                    borderRight: '2px solid #edeef1',
                    color: '#525b69'
                }}
            >
                <div className='p-5'>
                    <span class="text-indigo-400"><b>CONFIGURATION</b></span>
                    <hr class="mt-2" />
                </div>

                <div class="px-4">
                    {/* Metrics */}
                    <a href="/home">
                        <div className='flex p-1 items-center mb-2 cursor-pointer hover:bg-slate-100'>
                            <div className='ps-2 pe-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up text-indigo-400" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                </svg>
                            </div>
                            <div>Dashboard</div>
                        </div>
                    </a>

                    <a href="/report">
                        <div className='flex p-1 items-center w-100 mb-2 cursor-pointer hover:bg-slate-100'>
                            <div className='ps-2 pe-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard text-indigo-400" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1/ 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                            </div>
                            <div>Report</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar