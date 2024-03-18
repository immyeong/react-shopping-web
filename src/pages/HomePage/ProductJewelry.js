import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchPostData from '../../actions/fetchPostData';
import axios from 'axios';
import OpenAlert from '../../components/OpenAlert';
import fetchPutData from '../../actions/fetchPutData';
import checkProductExistence from '../../actions/checkProductExistence';

const ProductJewelry = ({ products, getBasketCount, basketCount, isLogin , setProductData}) => {
    const navigate = useNavigate();
    const [productTypeLength, setProductTypeLength] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [selectProduct, setSelectProduct] = useState({})

    useEffect(() => {
        let cnt = 0;
        const getProductTypeLength = () => {
            products.map((product) => {
                if (product.category === "jewelery") {
                    cnt++;
                }
            })
            setProductTypeLength(cnt);
        }
        getProductTypeLength();
    }, [])

    const handlePostData = async (product) => {
        if (isLogin) {
            const checked = await checkProductExistence(product.id);
            //데이터에 없을 때
            if (checked === false) {
                const res = await fetchPostData(product, 1);
                const productData = await fetchSelectProduct(res.id);
                setSelectProduct(productData);
                setOpenAlert(true);
                getBasketCount(basketCount + 1);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 2500);
            }
            //데이터에 있을 때
            else { 
                const res = await fetchPutData(checked, checked.count+1);
                const productData = await fetchSelectProduct(res.id);
                setSelectProduct(productData);
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 2500);
            }
        }
    }

    const fetchSelectProduct = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3001/products/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleDetails = (product) => {
        navigate(`/${product.id}`);
        setProductData(product);
    }

    return (
        <div>
            <div>
                <p className='font-bold text-2xl'>Jewelry</p>
            </div>
            <div className='flex text-left mx-12 text-gray-500'>
                <p>shwoing : {productTypeLength} items</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-10 gap-x-2 gap-y-2'>
                {products.map((product) => product.category === "jewelery" && (
                    <div key={product.id} className="border-[1px] border-gray-400 border-solid p-5 h-full">
                        <div className='flex flex-col h-4/5'>
                            <img
                                className=' w-3/5 h-3/5 mx-auto cursor-pointer'
                                src={product.image}
                                alt="product-img"
                                onClick={() => handleDetails(product)}
                            />
                            <p
                                className=' w-3/5 h-8 font-bold overflow-hidden text-xs mx-auto'
                            >{product.title}</p>
                        </div>
                        <div className='flex flex-row justify-between text-center'>
                            <button
                                className='bg-transparent border-2 border-gray-400 border-solid px-2 py-1 text-[10px] sm:text-sm lg:text-xs mx-3 text-gray-400 rounded-sm hover:bg-gray-400 hover:text-white'
                                onClick={() => handlePostData(product)}
                            >장바구니에 담기</button>
                            <p className='my-auto text-xs'>${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {
                isLogin && openAlert && (
                    <OpenAlert {...selectProduct} />
                )
            }
        </div>
    )
}

export default ProductJewelry