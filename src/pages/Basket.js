import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import fetchData from '../actions/fetchData';
import fetchRemoveData from '../actions/fetchRemoveData';
import fetchPutData from '../actions/fetchPutData';

const Basket = ({ getBasketCount, basketCount, isLogin, setIsLogin }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLogin') === 'true';
        setIsLogin(loggedInStatus);

        const fetchProductData = async () => {
            try {
                const res = await fetchData();
                getTotalPrice(res);
                setProducts(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductData();
    }, []);

    const getTotalPrice = (products) => {
        setTotalPrice(0);
        products.map((product) => {
            let price = product.price * product.count;
            setTotalPrice(prev => prev + price);
        })
    }

    const handleRemoveProduct = async (e, productId) => {

        try {
            const res = await fetchRemoveData(productId);
            setProducts(products.filter(product => product.id !== productId));
            getBasketCount(basketCount - 1);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    const handleMinus = async (e, product) => {

        try {
            const res = await fetchPutData(product, product.count - 1);
            if (product.count - 1 === 0) {
                await fetchRemoveData(product.id);
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlus = async (product) => {
        try {
            const res = await fetchPutData(product, product.count + 1);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    if (basketCount === 0) {
        return (
            <div className='mt-20 w-full h-[62vh]'>
                <p className='font-bold text-2xl border-solid border-b-[1px] border-gray-400 mx-[8.4rem] pb-5'>장바구니</p>
                <div className='flex mt-[1rem] w-3/4 h-2/4 mx-auto justify-center text-center' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </div>
                <p className='text-3xl'>장바구니가 비어있습니다.</p>
            </div>
        )

    } else if (!isLogin) {
        return (
            <div className='mt-20 w-screen h-[61vh]'>
                <p className='font-bold text-2xl border-solid border-b-[1px] border-gray-400 mx-[8.4rem] pb-5'>장바구니</p>
                <p className='text-[20px]'>로그인 후 사용해주세요.</p>
            </div>
        )
    } else {
        return (
            <div className='mt-20 w-screen min-h-[48vh]'>
                <p className='font-bold text-2xl border-solid border-b-[1px] border-gray-400 mx-[8.4rem] pb-5'>장바구니</p>
                <div className='basket'>
                    {products.map((product) => (
                        <div key={product.id} className='border-b-2 border-gray-300 mx-10 h-auto flex justify-between my-10'>
                            <div className='flex ml-0 h-full w-[200px]'>
                                <img
                                    className='w-[50px] h-full mr-5'
                                    src={product.image}
                                    alt="product-img"
                                />
                                <div>
                                    <p>{product.category}</p>
                                    <p>{truncate(product.title, 10)}</p>
                                    <p className='text-ms text-gray-300'>${product.price}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <form onSubmit={(e) => handleMinus(e, product)}>
                                    <button
                                        className='flex border-2 w-7 h-7 my-auto justify-center py-auto mx-1'
                                        type='submit'
                                    >-</button>
                                </form>
                                <form><p className='flex border-2 w-7 h-7 my-auto justify-center py-auto mx-1'>{product.count}</p></form>
                                <form onSubmit={() => handlePlus(product)}>
                                    <button
                                        className='flex border-2 w-7 h-7 my-auto justify-center py-auto mx-1'
                                        type='submit'
                                    >+</button>
                                </form>
                            </div>
                            <div className='relative top-0 right-14'>
                                <form onSubmit={(e) => handleRemoveProduct(e, product.id)}>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-end mx-10'>
                    <div className=' bg-orange-100 px-5 py-2 mx-5'>
                        <p>합계 : $ {totalPrice}</p>
                    </div>
                    <div className=' bg-transparent border-solid border-gray-400 border-[1px] text-xs py-3 px-5 text-gray-400'>
                        <button onClick={() => navigate('/receipt')}>계산하기</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Basket;