import React from 'react';

const ProductsBanner = ({ setStep, setIsHome, isHome }) => {


    return (
        <div className='mx-10'>
            <button
                onClick={() => setStep(0)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
            </button>
            <div className='flex justify-center my-5 text-[10px] sm:text-sm lg:text-xs'>
                <button
                    className='text-black border-2 border-gray-400 border-solid py-1 hover:bg-gray-500 hover:text-white hover:border-gray-500 mx-2 w-20 h-10 justify-center rounded-md'
                    onClick={() => setStep(1)}
                >
                    모두
                </button>
                <button
                    className='text-black border-2 border-gray-400 border-solid py-1 hover:bg-gray-500 hover:text-white hover:border-gray-500 mx-2 w-20 h-10 justify-center rounded-md'
                    onClick={() => setStep(2)}
                >
                    전자기기
                </button>
                <button
                    className='text-black border-2 border-gray-400 border-solid py-1 hover:bg-gray-500 hover:text-white hover:border-gray-500 mx-2 w-20 h-10 justify-center rounded-md'
                    onClick={() => setStep(3)}
                >
                    쥬얼리
                </button>
                <button
                    className='text-black border-2 border-gray-400 border-solid py-1 hover:bg-gray-500 hover:text-white hover:border-gray-500 mx-2 w-20 h-10 justify-center rounded-md'
                    onClick={() => setStep(4)}
                >
                    남성의류
                </button>
                <button
                    className='text-black border-2 border-gray-400 border-solid py-1 hover:bg-gray-500 hover:text-white hover:border-gray-500 mx-2 w-20 h-10 justify-center rounded-md'
                    onClick={() => setStep(5)}
                >
                    여성의류
                </button>
            </div>
        </div>
    );
};

export default ProductsBanner;