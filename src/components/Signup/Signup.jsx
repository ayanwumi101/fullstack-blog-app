import React, { useState, useEffect } from 'react'
// import {Box, Heading, Text, FormControl, FormLabel, Input, Button, Stack, useToast, Flex, Container, Avatar, Spinner} from '@chakra-ui/react'
import {BsCameraFill} from 'react-icons/bs'
import {app} from '../../../firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {useNavigate, Link} from 'react-router-dom'
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage'
import { getFirestore, collection, addDoc,  } from 'firebase/firestore'
import {v4} from 'uuid'

const Signup = () => {
    
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);


    const auth = getAuth();
    const db = getFirestore();
    const userRef = collection(db, 'userData');
    const storage = getStorage();  

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
        })
    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName && email && password){
            createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                addDoc(userRef, {
                    user_name: userName,
                    user_id: cred.user.uid,
                });
                console.log('user created', cred.user.uid);
            })
            .then(() => {
                navigate('/login');
                setEmail('');
                setPassword('');
                setUserName('');
                setBio('');
                signOut(auth);
                console.log('user signed out');
            })
            .catch((err) => {
                console.log(err.message);
            });

        }else{
           console.log('something is wrong');
        }
    }

  return (
    <>
          <div>
              <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="w-full max-w-md space-y-8">
                      <div>
                          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Signup to Blogify</h2>
                      </div>
                      <form className="mt-8 space-y-8" action="#" method="POST">
                    
                          <div className="-space-y-px rounded-md shadow-sm">
                              <div className='mb-5'>
                                  <label for="username" className="sr-only">Username</label>
                                  <input id="username" name="name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} autocomplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" />
                              </div>
                              <div className='mb-5'>
                                  <label for="email-address" className="sr-only">Email address</label>
                                  <input id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autocomplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                              </div>
                              <div>
                                  <label for="password" className="sr-only">Password</label>
                                  <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                              </div>
                          </div>

                          <div>
                              <button onClick={handleSubmit} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                  Signup
                              </button>
                          </div>
                      </form>

                      <p className='text-center'>Already have an account? <Link to='/login' className='text-[#4ae] underline'>Login</Link></p>
                  </div>
              </div>
          </div>
    </>
    
  )
}

export default Signup


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        if(email && password){
            signInWithEmailAndPassword(auth, email, password).then((cred) => {
                console.log('user logged in', cred.user);
                setEmail('');
                setPassword('');
                navigate('/home');
                setLoading(true);
            }).catch((err) => {
               console.log(err.message);
            })

        }else{
           console.log(err.message);
        }
    }
    return(
        <div>
                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login to Blogify</h2>
                            </div>
                            <form className="mt-8 space-y-6" action="#" method="POST">
                                <input type="hidden" name="remember" value="true" />
                                    <div className="-space-y-px rounded-md shadow-sm">
                                        <div className='mb-5'>
                                            <label for="email-address" className="sr-only">Email address</label>
                                            <input id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autocomplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                                        </div>
                                        <div>
                                            <label for="password" className="sr-only">Password</label>
                                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={handleLogin} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Login
                                        </button>
                                    </div>
                            </form>

                            <p className='text-center'>Don't have an account? <Link to='/signup' className='text-[#4ae] underline'>Signup</Link></p>
                        </div>
                    </div>
        </div>
    )
}