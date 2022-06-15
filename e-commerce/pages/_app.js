import React from 'react'
import { DataProvider } from '../Context/datacontext';
import '../styles/globals.css'
import { Layout } from '../Components';
import { Toaster } from "react-hot-toast";
import { useStateContext } from '../Context/datacontext';


function MyApp ({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Toaster/>
  <Component {...pageProps}/>
  </Layout>
  </DataProvider>
  )
   }

export default MyApp;
