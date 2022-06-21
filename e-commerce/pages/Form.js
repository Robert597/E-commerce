import React, {useState, useEffect} from 'react'
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import * as Api from "../API/index"
import { useStateContext } from '../Context/datacontext';
import { useRouter } from 'next/router';

const Form = () => {
   const router = useRouter();
    const [banner, setBanner] = useState(false);
    const [imageFile, setImageFile] = useState([]); 
    const [imageFiles, setImageFiles] = useState([]); 
    const {productDatas, setProductDatas, bannerDatas, setBannerDatas, loading} = useStateContext();
    const[imageUrl, setImageUrl] = useState(bannerDatas[0]?.image);
    const [productData, setProductData] = useState(
      {
        name: "",
        price: 0,
        details: "",
       }
    );
    const [bannerData, setBannerData] = useState(
      {
        Large: "",
        small: "",
        name: "",
        details: "",
        footerLarge: "",
        footerlarge: "",
        discount: "",
        saleTime: "",
        price: ""
      }
    );
   
    
    useEffect(() => {
      if(!loading){
        setBannerData(
          {
            Large: bannerDatas[0]?.Large,
            small: bannerDatas[0]?.small,
            name:bannerDatas[0]?.name,
            details: bannerDatas[0]?.details,
            price: bannerDatas[0]?.price,
            footerLarge: bannerDatas[0]?.footerLarge,
            footerlarge: bannerDatas[0]?.footerlarge,
            discount: bannerDatas[0]?.discount,
            saleTime: bannerDatas[0]?.saleTime
          }
        )
      }
    }, [loading])
    

const handleProductSubmit = async ( event) => {
  event.preventDefault();
  try{
    const image = [];
    for(let i = 0; i < imageFile.length; i++){
      const storageRef = ref(storage, `/files/${imageFile[i].name}`);
      const uploadTask = await uploadBytesResumable(storageRef, imageFile[i]);
      const url = await getDownloadURL(storageRef);
    image.push(url);
    }
    const { data } = await Api.createPosts("/products", {...productData, image});

    setProductDatas([ data.newProduct,...productDatas]);
    setProductData(
      {
        name: "",
        price: 0,
        details: ""
       }
    )
    router.push('/');
  }catch(err){
    console.log(err);
  }
}

const handleBannerSubmit = async (event) => {
  event.preventDefault();
  try{
    if(imageFiles){
      const image = [];
      for(let i = 0; i < imageFiles.length; i++){
        const storageRef = ref(storage, `/files/${imageFiles[i].name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imageFiles[i]);
        const url = await getDownloadURL(storageRef);
      image.push(url);
      }
      const { data } = await Api.updatePosts(`/products/banner/${bannerDatas[0]._id}`, {...bannerData, image});
      setBannerDatas([data]);

    }else{
     
      const { data } = await Api.updatePosts(`/products/banner/${bannerDatas[0]._id}`, {...bannerData, image: imageUrl});
      setBannerDatas([data]);
    }
     
      setBannerData( {
        Large: "",
        small: "",
        name: "",
        details: "",
        price: "",
        footerLarge: "",
        footerlarge: "",
        discount: 0,
        saleTime: ""
      });
    router.push('/');

}catch(err){
    console.log(err);
  }
}

  return (
    <div className="probanner">
     { !loading && (<>
        {
            !banner && (
              <>
                <form autoComplete='off' noValidate className='productFormContainer' onSubmit={(event) => handleProductSubmit( event)}>
                  <h1>Add a new product</h1>
                    <input type="text" required placeholder='Name'value={productData.name}
                    onChange={ (e) => setProductData({...productData, name : e.target.value})}/>
                    <input type="number" required placeholder='Price'
                    value={productData.price}
                     onChange={ (e) => setProductData({...productData,price : e.target.value})}/>
                    <input type="file"
                     onChange={(e) => {setImageFile(e.target.files)
                  }}
                    required multiple/>
                    <textarea placeholder='Description'
                    value={productData.details}
                     onChange={ (e) => setProductData({...productData,details : e.target.value})}
                     required></textarea>
                    <button type='submit'>Submit</button>
                    <p>Edit Banner<span onClick={() => {setBanner(true)}} style={{cursor: "pointer"}}>Click Here</span></p>
                </form>
                 </>
            )
        }
        {banner && (
          <>
          <form className='bannerFormContainer'
          autoComplete='off' noValidate 
          onSubmit={(event) => handleBannerSubmit(event)}>
             <h1>Editing Banner</h1>
             <input type="text" placeholder='Big Text' 
             value={bannerData.Large}
              onChange={(e) => {
                setBannerData({...bannerData, Large: e.target.value});
              }}/>
             <input type="text" placeholder='Small Text' 
              value={bannerData.small}
             onChange={(e) => {
               setBannerData({...bannerData, small: e.target.value});
             }}/>
             <input type="text" placeholder='name' 
              value={bannerData.name}
             onChange={(e) => {
               setBannerData({...bannerData, name: e.target.value});
             }}/>
              <input type="number" placeholder='price' 
              value={bannerData.price}
             onChange={(e) => {
               setBannerData({...bannerData, price: e.target.value});
             }}/>
             <input type="text" placeholder='footer Large' 
              value={bannerData.footerLarge}
             onChange={(e) => {
               setBannerData({...bannerData, footerLarge: e.target.value});
             }}/>
             <input type="text" placeholder='footer large' 
              value={bannerData.footerlarge}
             onChange={(e) => {
               setBannerData({...bannerData, footerlarge: e.target.value});
             }}/>
             <input type="text" placeholder='saleTime' 
              value={bannerData.saleTime}
             onChange={(e) => {
               setBannerData({...bannerData, saleTime: e.target.value});
             }}/>
             <input type="number" placeholder='discount' 
              value={bannerData.discount}
             onChange={(e) => {
               setBannerData({...bannerData, discount: e.target.value});
             }}/>
             <textarea placeholder="description" 
             value={bannerData.details}
             onChange={(e) => {
              setBannerData({...bannerData, details: e.target.value})}}
             />
             <input type="file"
                     onChange={(e) => setImageFiles(e.target.files)} multiple
                   />
                    <button type="submit">Submit</button>
                    <p>Add a new Product <span onClick={() => {setBanner(false)}} style={{cursor: "pointer"}}>Click Here</span></p>
          </form>
           </>
        )}
        </>
     )
       }
    </div>
  )
}

export default Form;