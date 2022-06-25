import React, {useEffect} from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../Context/datacontext';
import calcScrollValue from '../config/scroll';

const Layout = ({children}) => {
  const {loading, theme} = useStateContext();
  useEffect(() => {
      window.onscroll = calcScrollValue;
      window.onload = calcScrollValue;
  }, [])
  
  return (
    <div className={theme ? "layoutdark" : "layout"}>
      <Head>
        <title>E-Commerce Store</title>
    </Head>
    
    
    <div id='progress'>
      <span id="progress-value">&#x1F815;</span>
    </div>
  
      {loading && (
          <div>Loading...</div>
        )}
        {!loading && (
          <>
      <header 
      className={theme ? "layoutHeaderdark" : "layoutHeaderlight"}>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children }
      </main>
      <footer>
        <Footer/>
      </footer>
      </>
        )}
    </div>
  )
}

export default Layout