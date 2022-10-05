import React, {useState, useEffect} from 'react'
import {Box, VStack, Text, Button, Image, Heading, Container, Spinner} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {useParams} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs,} from 'firebase/firestore'
import test from '../../assets/CODE.png'
import {getStorage, ref, getDownloadURL, listAll} from 'firebase/storage'


const PostDetails = () => {
  const [post, setPost] = useState();
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(true);

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
        return setPost(newPost);
      })
    });
  }, []); 

  useEffect(() => {
    const getImage = async () => {
      await listAll(imageRef).then( async (response) => {
        console.log(response.items);
        const photo = response.items.find((item) => item.name === post.post_id);
        console.log(photo.name, post.post_id);
        await getDownloadURL(photo).then((url) => {
            setLoading(false);
            setNewImage(url);
        });
      })
    };

   if(post){
    getImage();
   }

  }, [post]);

  console.log(post);

  return (
    <VStack>
      {post ? 
      <>
          <Box>
            {loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' mt='50px' /> : <Image src={newImage} />}
          </Box>
          <Heading size={'lg'} textAlign='center' mt='5'>{post.post_title}</Heading>
          <Text>Author: {post.author_name && post.author_name}</Text>
          <Text>Category: <ExternalLinkIcon /> {post.post_category}</Text>
          <Text p='5' textAlign={'justify'}>{post.post_content}</Text>
      </> : 
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' mt='70px' />}
    </VStack>
  )
}

export default PostDetails