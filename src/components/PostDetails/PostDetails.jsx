import React, {useState, useEffect} from 'react'
import {Box, VStack, Text, Button, Image, Heading, Container} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {useParams} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs,} from 'firebase/firestore'
import test from '../../assets/CODE.png'
import {getStorage, ref, getDownloadURL, listAll} from 'firebase/storage'


const PostDetails = () => {
  const [posts, setPosts] = useState([]);
  const [newImage, setNewImage] = useState('')

   //initialize firestore
  const db = getFirestore();
  const storage = getStorage();
  const imageRef = ref(storage, 'post_images');

  //collection reference 
  const colref = collection(db, 'posts');
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    getDocs(colref).then((snapshot) => {
      let items = [];
      snapshot.docs.map((doc) => {
        items.push({...doc.data(), id: doc.id})
        const newPost = items.find((post) => post.id === id);
        return setPosts(newPost);
      })
    });
  }, []); 

  useEffect(() => {
    if(posts){
      listAll(imageRef).then((response) => {
        console.log(response.items);
        const photo = response.items.find((item) => item.name === posts.post_id);
        getDownloadURL(photo).then((url) => {
          console.log(url);
          setNewImage(url)
        });
      })
    }
  },[])
  console.log(posts);

  return (
    <VStack>
      <Image src={posts ? newImage : ''} />
      <Heading size={'md'} textAlign='center' mt='5'>{posts.post_title}</Heading>
      <Text>{posts.author_name && posts.author_name}</Text>
      <Text>Category: <ExternalLinkIcon /> {posts.post_category}</Text>
      <Text p='5' textAlign={'justify'}>{posts.post_content}</Text>
    </VStack>
  )
}

export default PostDetails