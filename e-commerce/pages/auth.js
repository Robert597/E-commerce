import React, {useState, useEffect} from 'react'
import {MdVisibility, MdVisibilityOff, MdLockOutline} from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import {RiLoader3Fill, RiGoogleFill} from 'react-icons/ri'; 
import { useStateContext } from '../Context/datacontext';
import { createPosts } from '../API';
import { useRouter } from 'next/router';


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
   const {setError, setErrorMessage,Error, errorMessage, validateEmail, validatePassword} = useStateContext();
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            if(isSignup){
                const data = await createPosts('/auth/signup', userData);
            localStorage.setItem('profile', JSON.stringify(data?.data));
            }
            if(!isSignup){
                const data = await createPosts('/auth/signin', userData);
                localStorage.setItem('profile', JSON.stringify(data?.data));
            }
            router.push('/');
        }catch(err){
            setError(true);
            setErrorMessage(err.response.data.message)
        }

    }
    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
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
                <div className='googleContainer'>
               { /*<GoogleLogin 
                clientId='391637257638-4egfum1b8ra3vc2ad1gmbd4j3b5boi8h.apps.googleusercontent.com' 
                render={(renderProps) => (
<button className='googleAuthBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}
><RiGoogleFill className='googleIcon'/> Google Login</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                />*/}
</div>
              
                <div className='authAsk'>
                    <button className="authAskBtn" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login': "Don't have an account?, Sign Up"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default auth