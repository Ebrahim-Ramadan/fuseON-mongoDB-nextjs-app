'use client'
import React from 'react';
import firebase_app from '@/lib/firebaseConfig.js';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from "next/navigation";
const auth = getAuth(firebase_app);
const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const router = useRouter()

  const loginUser = async (email, password, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('userCredential', userCredential);
      if (userCredential) {
        localStorage.setItem("useremail", userCredential.user.email);
        Notify.success('logged in successfully', {
          position: 'center-top',
        });
        router.push('/')
        setTimeout(() => {
          window.location.reload()
        }, 200);  
      }
    } catch (error) {
      console.log('signupUsererr', error.code, error.message);
      Notify.failure(error.message, {
        position: 'center-top',
      });
    }
    setIsLoading(false);
  };

  // React.useEffect(() => {
  //   const IsloggedIn = secureLocalStorage.getItem("loggedIn");

  //   if (IsloggedIn) {
  //     router.push('/')
  //   }
  // }, []);
  return (
    <div className='w-full'>
     
      
      <div className="min-h-screen  flex justify-center flex-col items-center  gap-y-2">
      <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 512 512"><path fill="#ffffff" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/></svg>
        <h1 className='text-4xl font-bold text-white'>Login</h1>
        <div className="flex flex-col md:flex-row text-white text-base font-semibold justify-start items-center gap-x-2">
    <p>Don&#8217;t have an account yet?</p>
    <Link href="/signup" className="rounded-lg underline  duration-900">
      Sign up
    </Link>
      </div>
        <form onSubmit={(e) => loginUser(Username, Password, e)} className=" max-w-[500px] flex flex-col gap-y-4 w-full">
         
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="username" className="text-xl font-medium text-white">
            E-mail
          </label>
          <input
            id="username"
            name="username"
            type="email"
            required
            placeholder="Enter your E-mail"
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg h-10 font-medium bg-black p-2"
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="password" className="text-xl font-medium text-white">
            Password
          </label>
          <div className="flex flex-col gap-y-4">
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-lg h-10 font-medium bg-black p-2"
            />
            
          </div>
        </div>
        
<p className='text-gray-300 hover:text-gray-400 w-fit md:text-base text-xs'>By logging in, you agree to our <a href='/privacy-and-policy' className='underline'>privacy and policy</a></p>
          <button role='submit' className=' mt-[-8px] text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900'
            
            disabled={isLoading}>
            {isLoading ?
            'processing...':'Login'}
            </button>
      </form>
        
      </div>

    </div>

  );
};

export default Login;