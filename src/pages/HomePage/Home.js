import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductsBanner from './ProductsBanner'
import ProductAll from './ProductAll';
import ProductElectronic from './ProductElectronic';
import ProductJewelry from './ProductJewelry';
import ProductMen from './ProductMen';
import ProductWomen from './ProductWomen';

const Home = ({getBasketCount, basketCount , isLogin , setProductData, setIsLogin}) => {
    const [step, setStep] = useState(0);
    const [products, setProducts] = useState([]);
    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLogin') === 'true';
        setIsLogin(loggedInStatus);
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (step === 0) {
        return (
            <div className='pt-20'>
                <div>
                    <ProductsBanner setStep={setStep} setIsHome={setIsHome} isHome={isHome}/>
                </div>
                <div className='w-screen h-[500px] bg-[url(/Users/imc/Desktop/react/react-shopping-web/src/images/bg-image.jpg)]'>
                        <div className='py-[150px]'>
                            <p className=' text-white font-bold text-[100px]'>무/료/배/송</p>
                            <p className=' text-violet-600 text-[25px]'>3.1 ~ 3.31</p>
                            <p className=' text-white'>회원만 가능합니다.</p>
                            <p className='font-serif italic text-2xl mt-[100px]'>clothIm</p>
                        </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='pt-20'>
                <div>
                    <ProductsBanner setStep={setStep} />
                </div>
                <div>
                    {step === 1 && <ProductAll products={products} getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setProductData={setProductData}/>}
                    {step === 2 && <ProductElectronic products={products} getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setProductData={setProductData}/>}
                    {step === 3 && <ProductJewelry products={products} getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setProductData={setProductData}/>}
                    {step === 4 && <ProductMen products={products} getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setProductData={setProductData}/>}
                    {step === 5 && <ProductWomen products={products} getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setProductData={setProductData}/>}
                </div>
            </div>
        )
    }

}

export default Home