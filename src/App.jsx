import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/Auth/AuthContext'

import './App.css'
import Header from './components/Header'
import About from './components/About'
import ProductPage from './components/ProductPage'
import Missing from './components/Missing'
import SignIn from './components/Auth/SignIn'
import Register from './components/Auth/Register'
import Sell from './components/Sell/Sell'
import LoadingSpinner from './components/LoadingSpinner'

import { Home } from './components/Home'
import ProductsPage from './components/ProductsPage'
import MessagesPage from './components/Messages/MessagesPage'
import Account from './components/Account/Account'
import CampusMeetup from './components/CampusMeetup'

// Import feature components
import {
  TextbookExchange,
  StudyBuddyFinder,
  SemesterAlerts,
  CourseNotifications,
  StudentVerification,
  SellerRatings
} from './components/Features'

// const url = 'http://localhost:3000'

const API_URL = 'http://localhost:8000'; 

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setSearchResults(data); // Initialize search results with all products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/search?query=${search}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (search.trim()) {
      handleSearch();
    } else {
      setSearchResults(products);
      setLoading(false);
    }
  }, [search, products]);



  return (
    <AuthProvider>
      <Router>
        <Header search={search} setSearch={setSearch}/>
        <Routes>
          <Route path='/' element={
            loading ? (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <LoadingSpinner size="large" message="Loading amazing deals..." />
              </div>
            ) : (
              <Home products={searchResults} />
            )
          }/>

          <Route path='/product/:id' element={<ProductPage products={products}/>} />
          <Route path='/products' element={
            loading ? (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <LoadingSpinner size="large" message="Loading products..." />
              </div>
            ) : (
              <ProductsPage products={searchResults} />
            )
          }/>
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='*' element={<Missing />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/sell' element={<Sell />}/>
          <Route path='/messages' element={<MessagesPage />} />
          <Route path='/account' element={<Account />} />
          <Route path='/meetup' element={<CampusMeetup />} />
          
          {/* Feature Routes */}
          <Route path='/features/textbook-exchange' element={<TextbookExchange />} />
          <Route path='/features/study-buddy' element={<StudyBuddyFinder />} />
          <Route path='/features/semester-alerts' element={<SemesterAlerts />} />
          <Route path='/features/course-notifications' element={<CourseNotifications />} />
          <Route path='/features/student-verification' element={<StudentVerification />} />
          <Route path='/features/seller-ratings' element={<SellerRatings />} />

        </Routes>
      </Router>
      

    </AuthProvider>
  )
}

export default App
