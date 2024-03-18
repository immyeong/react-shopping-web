import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OpenAlert from '../components/OpenAlert';
import fetchPutData from '../actions/fetchPutData';
import fetchPostData from '../actions/fetchPostData';
import checkProductExistence from '../actions/checkProductExistence';

const ItemDetail = ({ productData, isLogin ,setIsLogin ,getBasketCount, basketCount}) => {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [product, setProduct] = useState({});

    const handleToBasket = async (productData) => {
        if (isLogin) {
            const checked = await checkProductExistence(productData.id);
            //데이터에 없을 때
            if (checked === false) {
                const res = await fetchPostData(productData, 1);
                setProduct(res);
                setOpenAlert(true);
                getBasketCount(basketCount + 1);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 2500);
            }
            //데이터에 있을 때
            else { 
                const res = await fetchPutData(checked, checked.count+1);
                setProduct(res);
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 2500);
            }
        }
    }

    console.log(product);
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLogin') === 'true';
        setIsLogin(loggedInStatus);
        console.log(productData);
    }, [])
    

    return (
        <div className='m-20 h-[400px]'>
            <div className='relative grid grid-cols-2 h-[42vh] mt-10'>
                <div className='h-[42vh]'>
                    <img
                        className='h-full mx-auto'
                        src={productData.image}
                        alt="product-img"
                    />
                </div>
                <div className='h-[42vh]'>
                    <div className='w-3/4 text-left h-[30vh]'>
                        <p className='h-[5vh] text-gray-300'>{productData.category}</p>
                        <p className='h-[10vh] text-[22px]'>{productData.title}</p>
                        <p className='h-[5vh] text-2xl font-bold '>$ {productData.price}</p>
                        <p className='h-[10vh] text-[10px] text-stone-400 overflow-hidden'>{productData.description}</p>
                    </div>
                    <div className='h-[12vh] grid grid-cols-2 w-3/4'>
                        <button
                            onClick={() => handleToBasket(productData)}
                        >
                            <p className='border-2 border-solid border-gray-300 mx-[15%] hover:text-white hover:bg-gray-300'>
                                장바구니에 담기
                            </p>
                        </button>
                        <button
                            onClick={() => navigate('/basket')}
                        >
                            <p className='border-2 border-solid border-gray-300 mx-[15%] hover:text-white hover:bg-gray-300'>장바구니로 이동</p>
                        </button>
                    </div>
                </div>
            </div>
            {
                openAlert && (
                    <OpenAlert {...product} />
                )
            }
        </div>
    )
}

export default ItemDetail