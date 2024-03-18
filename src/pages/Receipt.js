import React, { useEffect, useState } from 'react'
import fetchData from '../actions/fetchData'
import { useNavigate } from 'react-router-dom';
import fetchRemoveData from '../actions/fetchRemoveData';

const Receipt = ({setBasketCount}) => {
    const [products, setProducts] = useState([]);
    const [Total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const TotalReceipt = async () => {
            try {
                const res = await fetchData();
                setProducts(res);
                getTotal(res);
            } catch (error) {
                console.log(error);
            }
        }
        TotalReceipt();
    }, [])

    const successBuy = async () => {
        navigate('/');
        try {
            products.map(async (product) => await fetchRemoveData(product.id)); // Assuming your API returns some data upon successful deletion;
            setBasketCount(0);
            window.alert("계산 완료되었습니다.");
            return products;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error; // Handle error as needed
        }
    }

    const getTotal = (products) => {
        setTotal(0);
        products.map(product => {
            setTotal(prev => prev + (product.price * product.count));
        })
    }

    return (
        <div className='pt-20 w-full h-[71vh] mt-20 mx-20'>
            {products.map(product => (
                <div key={product.id} className='text-left'>
                        <p className='font-bold my-[0.3rem]'>{product.title}</p>
                    <ul className='flex'>
                        <li>$ {product.price}</li>
                        <li>&nbsp;&nbsp;x&nbsp;&nbsp;{product.count}</li>
                        <li>&nbsp;= {product.price * product.count}</li>
                    </ul>
                </div>
            ))}
            <p className='text-left mt-10 text-[60px]'>Total : $ {Total}</p>
            <button className=' w-full text-left'>
                <p className='border-[2px] border-solid border-gray-400 hover:text-white hover:bg-gray-400 w-[10%] text-center'
                onClick={()=> successBuy()}
                >완료</p>
                </button>
        </div>
    )
}

export default Receipt