import { useState, useEffect } from 'react'

import './App.css'
import Header from './components/Header'
import About from './components/About'
import ProductPage from './components/ProductPage'
import Missing from './components/Missing'
import SignIn from './components/Auth/SignIn'
import Register from './components/Auth/Register'
import Sell from './components/Sell/Sell'

import { Home } from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// const url = 'http://localhost:3000'

const API_URL = 'http://localhost:8000'; 

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])
  const [data, setData] = useState(null);
  console.log(data)


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // useEffect(()=>{
  //   async function fetchProducts(){
  //     try{
  //       const response= await fetch(`${url}/products`);
  //       const data = await response.json()
  //       setProducts(data)
  //     }catch(e){
  //       console.error(e)
  //     }
  //   }
  //   fetchProducts();
  // }, [])


  // useEffect(() => {
  //   const filteredProducts = products.filter((p) => {
  //     if (
  //       p.title.toUpperCase().includes(search.toUpperCase())
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });

  //   setSearchResults(filteredProducts);
  // }, [products, search]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_URL}/search?query=${search}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setSearchResults(products);
    }
  }, [search, products]);



  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch}/>
        <Routes>
          <Route path='/' element={<Home products={searchResults} />}/>

          <Route path='/product/:id' element={<ProductPage products={products}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='*' element={<Missing />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/sell' element={<Sell />}/>

        </Routes>
      </Router>
      

    </>
  )
}

export default App
