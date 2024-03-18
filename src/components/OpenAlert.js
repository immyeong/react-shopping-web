import React from 'react'
import { useNavigate } from 'react-router-dom'

const OpenAlert = ({ image, category, title, price}) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col top-10 right-24 absolute w-[350px] h-[200px] bg-white border-gray-400 z-20 shadow-lg'>
            <div className='flex w-full h-[100px] p-3 border-b-[1px] border-gray-200 border-solid'>
                <img
                    className='h-full'
                    src={image}
                    alt="product-img"
                />
                <div>
                    <div className='text-[12px] text-left mx-5'>
                        <p className=' text-gray-300'>{category}</p>
                        <p className='font-bold mb-2'>{title}</p>
                        <p>{price} * 1 = {price}</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-[50px] border-b-[1px] border-gray-200 border-solid p-3 text-right text-xl font-bold '>
                <p>합계 : $ {price}</p>
            </div>
            <div>
                <button className='font-bold text-[15px] py-3'
                onClick={() => navigate('/basket')}
                >장바구니로 이동</button>
            </div>
        </div>
    )
}

export default OpenAlert