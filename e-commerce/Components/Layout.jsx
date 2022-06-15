import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../Context/datacontext';

const Layout = ({children}) => {
  const {loading} = useStateContext();
  return (
    <div className='layout'>
      <Head>
        <title>E-Commerce Store</title>
      </Head>
      {loading && (
          <div>Loading...</div>
        )}
        {!loading && (
          <>
      <header>
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