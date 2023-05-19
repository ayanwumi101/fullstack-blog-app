import React, {useState, useEffect} from 'react'
import {Box, VStack, Text, Button, Image, Heading, Container, Spinner} from '@chakra-ui/react'
import {ExternalLinkIcon, ArrowBackIcon} from '@chakra-ui/icons'
import {useParams, Link} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs,} from 'firebase/firestore'
import test from '../../assets/CODE.png'
import {getStorage, ref, getDownloadURL, listAll} from 'firebase/storage'
import '../Posts/modal.css'


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

  return (
    <VStack>
      {post ? 
      <>
          <Box>
            {loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' mt='50px' /> : <Image src={newImage} className='post_images' mb='5' />}
          </Box>
          <Heading size={'lg'} textAlign='center' mt='5' textDecoration={'underline'}>{post.post_title}</Heading>
          <Text>Author: <strong>{post.author_name && post.author_name}</strong></Text>
          <Text>Category: <ExternalLinkIcon /> <strong>{post.post_category}</strong></Text>
          <Text> Date Posted: <strong>{post.date}</strong></Text>
          <Box p='5' textAlign={'justify'} lineHeight='tall' dangerouslySetInnerHTML={{ __html: post.post_content}}></Box>
          <Link to='/home'><Button colorScheme={'teal'} size='sm' mb='5'> <ArrowBackIcon mr='1' />Go back</Button></Link>
      </> : 
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' mt='70px' />}
    </VStack>
  )
}

export default PostDetails