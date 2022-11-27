import React, {ReactNode, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useLocation, useNavigate} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {signOut, getAuth} from 'firebase/auth'
import {getStorage, getDownloadURL, ref} from 'firebase/storage'
import {getFirestore, query, where, getDocs, collection, } from 'firebase/firestore'
import { Transition } from "@headlessui/react";



const Navbar = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userName, setUserName] = useState();
  const [photoUrl, setPhotoUrl] = useState('')
  const location = useLocation();
  const storage = getStorage();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        const db = getFirestore();
        const userRef = collection(db, 'userData');
        const q = query(userRef, where('user_id', '==', user.uid));

        const getUsername = async () => {
            await getDocs(q).then(async (snapshot) => {
                let user_data = [];
                snapshot.docs.map((item) => {
                    console.log(item);
                    user_data.push({...item.data(), id: item.id});
                    return setUserName(user_data);
                })
            })
            console.log(userName);
        };

        if(user){
            getUsername();
        }
        
    })
  }, [])
  console.log(userName);


  const handleLogout = () => {
      signOut(auth).then(() => {
        console.log('user logged out');
        navigate('/login');
      }).catch((err) => {
        console.log(err.message);
      });
  }


  return (
    <>
          {location.pathname !== '/signup' && location.pathname !== '/login' && (
              <div>
                  <nav className="bg-indigo-600">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="flex items-center justify-between h-16">
                              <div>
                                  <Link to='/home'><h3 className='text-xl font-bold text-white'>Blogify</h3></Link>
                              </div>

                              <div className='text-white lg:block sm:hidden'>
                                  <p>Logged in as: <strong>{userName ? userName[0].user_name : ''}</strong></p>
                              </div>

                              <div className='text-white border-white rounded-sm'>
                                  <Link to='create_post'><button className='bg-indigo-300 px-3 py-1 rounded mr-5'>+ New post</button></Link>
                                  <button onClick={handleLogout} className='bg-indigo-300 px-3 py-1 rounded'>Logout</button>
                              </div>
                          </div>
                      </div>
                  </nav>
              </div>
          )}
    </>
  )
}

export default Navbar