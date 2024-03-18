import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = ({basketCount , isLogin , setIsLogin}) => {
    const navigate = useNavigate();
    const [isHome, setIsHome] = useState(true);

    const moveHome = () => {
        navigate('/');
        if(!isHome) setIsHome(true);
    }

    const handleLogout = () => {
        window.alert("로그아웃 하시겠습니까?");
        localStorage.removeItem('isLogin');
        setIsLogin(false);
    }

    return (
        <div>
            <nav className='flex justify-between bg-white border-gray-300 border-b-2 shadow-md z-10 fixed w-screen px-10 py-4'>
                <h1 className='font-serif italic text-xl cursor-pointer' onClick={() => moveHome()}>clothIm</h1>
                <div className='flex justify-around w-1/12 text-center'>
                    <button 
                    className='relative mx-5'
                    onClick={() => navigate('/basket')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <p className='absolute right-0 top-0 text-[8px] bg-black text-white rounded-lg px-[0.125rem]'>{isLogin ? basketCount : "0"}</p>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </button>
                    <form className='flex px-5 w-5 justify-around mx-5'>
                        {isLogin ?
                            <button id="login" onClick={() => handleLogout()} className='flex'>
                                <p className='text-[12px]'>Logout</p>
                            </button> :
                            <button id="logout" onClick={() => navigate('/login')} className='flex'>
                                <p className='text-[12px]'>Login</p>
                            </button>
                        }
                    </form>
                </div>
            </nav >
        </div>
    )
}

export default Nav