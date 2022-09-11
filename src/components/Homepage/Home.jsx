import React, {useState, useEffect} from 'react'
import {Box, Text, Flex, Heading, } from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, onSnapshot, orderBy, query} from 'firebase/firestore'


const Home = () => {

  const [posts, setPosts] = useState([]);

   //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref, orderBy('createdAt'));

  //get collection data

  // useEffect(() => {
  //     let items = []
  //     getDocs(colref).then((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         items.push({...doc.data(), id: doc.id});
  //         return setPosts(items)
  //       });
  //     }).catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [])

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setPosts(items)});
      })
  }, [])

  return (
    <>
    <Box>
       <Heading as='h2' size='lg' textAlign={'center'} mt='6'>Welcome to EcoScribes</Heading>
       {<Flex flexWrap={'wrap'} justifyContent='space-between'>{posts.map((post) => <Card post={post} key={post.id} />)}</Flex>}
    </Box>
    </>
  )
}

export default Home