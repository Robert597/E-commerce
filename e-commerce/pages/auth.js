import React, {useState, useEffect} from 'react';
import {MdVisibility, MdVisibilityOff, MdLockOutline} from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import {RiLoader3Fill, RiGoogleFill} from 'react-icons/ri'; 
import { useStateContext } from '../Context/datacontext';
import { createPosts } from '../API';
import { useRouter } from 'next/router';
import {FaPlus} from "react-icons/fa";
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage';
import {storage} from "../firebase";
import gsap from 'gsap';
import {gapi} from 'gapi-script';
import {toast} from 'react-hot-toast';

const auth = () => {
    const router = useRouter();
    const [isSignup, setIsSignup] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [filename, setFileName] = useState('add profile picture');
    const [imageFile, setImageFile] = useState({});
   const {setError, setErrorMessage,Error, errorMessage, validateEmail, validatePassword, user} = useStateContext();
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
useEffect(() => {
    const start = () => {
        gapi.client.init({
            clientId: clientId,
            scope: ""
        })
    }
    gapi.load('client:auth2', start);
}, [])


   useEffect(() => {
    let tl = gsap.timeline({paused: true});
    tl.to(".loader3fill", {
        rotate: 360,
        scale: 1.2,
        duration: 2,
        ease: "Power2.inOut",
        repeat: -1
    });
if(authLoader){
    gsap.to(".loader3fill", {
        autoAlpha: 1,
        ease: "power2.inOut",
        duration: .5
    });
    tl.play();
}else{
    gsap.to(".loader3fill", {
        autoAlpha: 0,
        ease: "power2.inOut",
        duration: .5
    });
    tl.pause();
}
   }, [authLoader])
   
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            setAuthLoader(true);
            if(isSignup){
                if(imageFile.name){
                    
                    const storageRef = ref(storage, `/files/${imageFile.name}`);
                    const uploadTask = await uploadBytesResumable(storageRef, imageFile);
                    const url = await getDownloadURL(storageRef);
                    console.log(url);
                    const data = await createPosts('/auth/signup', {
                        ...userData, image: url
                    });
                    localStorage.setItem('profile', JSON.stringify(data?.data));
                    
                }else{
                    const data = await createPosts('/auth/signup', userData);
                    localStorage.setItem('profile', JSON.stringify(data?.data));
                }
               
            }
            if(!isSignup){
                const data = await createPosts('/auth/signin', userData);
                localStorage.setItem('profile', JSON.stringify(data?.data));
            }
            router.push('/');
            toast.success("successfully logged in");
        }catch(err){
            setError(true);
            setAuthLoader(false);
            setErrorMessage(err.response.data.message)
            toast.error(`${err.response.data.message}`);
        }finally{
            setAuthLoader(false);
        }

    }
    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }
    
    const googleSuccess = async (res) => {
        const result = await res?.profileObj;
        const token = await res?.tokenId
        console.log("yes");
 try{
    console.log("yess");
     localStorage.setItem('profile', JSON.stringify({result, token})); 
    router.push("/");
    toast.success("successfully logged in");
}catch(err){
console.log(err);
console.log("yes no");
    }
    }
    const googleFailure = (error) => {
        console.log(error.details);
    }


  return (
    <div className='mainAuthContainer'>
        
         <div className='authFlexContainer'>
        <div className='authContainer'>
            <div className='authIcon'>
                <MdLockOutline/>
            </div>
            <h6>{isSignup ? "Sign Up" : "Login" } </h6>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    {
                        isSignup && (
                            <>
                            <div className='inputContainer'>
                            <input name="firstName" placeholder=' '
                             required
                             type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="firstName" className='authLabel'>FirstName</label>
                            </div>

                            <div className='inputContainer'>
                            <input name="lastName" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="lastName" className='authLabel'>LastName</label>
                            </div>

             <div className='filePlaceholder'>
              <p>{filename}</p>
            <input type="file"placeholder='image' name='upload' required id='upload' onChange={(e) => {
            setImageFile(e.target.files[0]);
            setFileName(e.target.files[0].name)}} style={{display: "none"}}/>
            <div className='uploadIconCont'><FaPlus className='uploadIcon' onClick={() => document.getElementById('upload').click()}/></div>
            </div>
                            </>
                        )
                    }
                     <div className='inputContainer'>
                            <input name="email" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => 
                            { handleChange(e)
                            validateEmail(e.target.value)
                            }}/>
                             <label htmlFor="email" className='authLabel'>email</label>
                            </div>

                            <div className='inputPasswordContainer'>
                            <input name="password" placeholder=' '
                            required
                            type={showPassword ? "text" : "password"}
                            onChange={(e) =>{ handleChange(e)
                            validatePassword(e.target.value);
                            }}
                        />
                         <label htmlFor="password" className='authLabel'>Password</label>
                        <div className='revealPassword' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility/> : <MdVisibilityOff/>}
                        </div>
                    {Error && (<p className='errorM'>{errorMessage}</p>)}
                    <div className='loaderContainer'><RiLoader3Fill className='loader3fill'/></div>
                            </div>
                </div>
                <button className='authBtn' type='submit'>{isSignup ? "Sign Up" : "Login"}</button>
                
               <div type='button' className='googleContainer' id="googleContainer">
                <GoogleLogin 
                clientId= {clientId}
               
                render={(renderProps) => (
<button className='googleAuthBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}
><RiGoogleFill className='googleIcon'/> Google Login</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                />
                </div>
                
                
              
                <div className='authAsk'>
                    <button className="authAskBtn" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login': "Don't have an account? Sign Up"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default auth