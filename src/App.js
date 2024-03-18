import './App.css';
import Nav from './components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import CreateAccount from './pages/UserResource/CreateAccount';
import Login from './pages/UserResource/Login';
import Home from './pages/HomePage/Home';
import ItemDetail from './pages/ItemDetail';
import Basket from './pages/Basket';
import Receipt from './pages/Receipt';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import fetchData from './actions/fetchData';

const Layout = ({basketCount , isLogin , setIsLogin}) => {

  return (
    <div className='flex flex-col'>

      <Nav basketCount={basketCount} isLogin={isLogin} setIsLogin={setIsLogin}/>

      <Outlet />

      <Footer />
    </div>
  )
}

function App() {
  const [basketCount, setBasketCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData();
      setBasketCount(res.length);
    }
    getData();
  }, [])

  const getBasketCount = (value) => {
    setBasketCount(value);
  }

  return (
    <div className="App relative">
      <Routes>
        <Route path='/' element={<Layout basketCount={basketCount} isLogin={isLogin} setIsLogin={setIsLogin}/>}>
          <Route index element={<Home getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setIsLogin={setIsLogin} setProductData={setProductData}/>} />
          <Route path=":itemId" element={<ItemDetail productData={productData} isLogin={isLogin} setIsLogin={setIsLogin} getBasketCount={getBasketCount} basketCount={basketCount}/> } />
          <Route path="login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="Basket" element={<Basket getBasketCount={getBasketCount} basketCount={basketCount} isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="receipt" element={<Receipt setBasketCount={setBasketCount}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
