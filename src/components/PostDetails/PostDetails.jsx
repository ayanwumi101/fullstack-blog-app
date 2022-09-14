import React, {useState, useEffect} from 'react'
import {Box, VStack, Text, Button, Image, Heading, Container} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {useParams} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, query, onSnapshot, getDocs,} from 'firebase/firestore'
import test from '../../assets/CODE.png'

const PostDetails = () => {
  const [posts, setPosts] = useState([]);

   //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref);
  const {id} = useParams();
  console.log(id);

  // 

  useEffect(() => {
    getDocs(colref).then((snapshot) => {
      let items = [];
      snapshot.docs.map((doc) => {
        items.push({...doc.data(), id: doc.id})
        const newPost = items.find((post) => post.id === id);
        return setPosts(newPost);
      })
    })
    //  onSnapshot(q, (snapshot) => {
    //     let items = [];
    //     snapshot.docs.map((doc) => {
    //       items.push({...doc.data(), id: doc.id});
    //       return setPosts(items)});
    // });
  }, []); 
  console.log(posts);

    // const [newPost, setNewPost] = useState();
  return (
    <VStack>
      <Image src={test} />
      <Heading size={'md'} textAlign='center' mt='5'>{posts.post_title}</Heading>
      <Text>{posts.author_name && posts.author_name}</Text>
      <Text>Category: <ExternalLinkIcon /> {posts.post_category}</Text>
      <Text p='5' textAlign={'justify'}>{posts.post_content}</Text>
    </VStack>
  )
}

export default PostDetails