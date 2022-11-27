import React, { useState, useEffect, useRef } from 'react'
// import { Box, Text, Flex, Heading, Button, Spinner, Image } from '@chakra-ui/react'
import Card from '../Card/Card'
import { app } from '../../../firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import { Link } from 'react-router-dom'


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([])
  const [postImages, setPostImages] = useState([])

  //initialize firebase auth service
  const auth = getAuth();

  //initialize firestore
  const db = getFirestore();

  //get firestore storage
  const storage = getStorage();
  const imagesRef = ref(storage, 'post_images');

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      console.log(user);
      if (user) {
        onSnapshot(q, (snapshot) => {
          let items = [];
          snapshot.docs.map((doc) => {
            items.push({ ...doc.data(), id: doc.id });
            setLoading(false);
            return setPosts(items);
          });
        });
      }
    });

    listAll(imagesRef).then((response) => {
      console.log(response);
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setLoading(false);
          setPostImages((prev) => [...prev, url]);
        })
      })
    });

  }, [])

  return (
    <div>
      <h2 className='text-center font-bold text-2xl mt-3'>Welcome to Blogify</h2>
      <div className='p-5' style={{width: '95%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: 'auto'}}>
        {posts.map((post) => <Card post={post} key={post.id} />)}
      </div>
    </div>
  )
}

export default Home