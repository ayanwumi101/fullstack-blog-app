import React, {useState, useEffect} from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image, Container, SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {Link} from 'react-router-dom'
import { ref, getStorage, getDownloadURL, listAll } from 'firebase/storage'
import {query, collection, where, getFirestore, onSnapshot} from 'firebase/firestore'


const Card = ({post}) => {
  const { author_name, post_title, date, post_content, post_category, id, post_id } = post;
  const [mainImage, setMainImage] = useState([]);
  const [newImage, setNewImage] = useState('')

  //init firebase storage
  const storage = getStorage();
  const imageRef = ref(storage, 'post_images');

  //init firestore database
  const db = getFirestore();
  const colRef = collection(db, 'posts');


  useEffect(() => {
    //fetching the images
    listAll(imageRef).then((response) => {
      const items = response.items.find((item) => item.name === post_id);
      getDownloadURL(items).then((url) => {
        console.log(url);
        setNewImage(url)
      });
    })
  }, []);


  return (
    <>
        <Flex flexWrap={'wrap'} justifyContent='space-around' alignItems='flex-start' margin='auto' mt='6' mb='2'>
            <Box dropShadow={'md'} w='300px' h='auto' boxShadow='md' bg={'gray.100'} borderRadius={'md'} mb='10'>
                <Image src={newImage} h='250px' w='100%' height={'200px'} borderTopLeftRadius={'md'} borderTopRightRadius={'md'} />
                <Box p='3'>
                    <Heading as='h3' size={'md'} textAlign='center'>{post_title}</Heading>
                    <Text mt='3' mb='3' textAlign={'justify'}>
                        {post_content.substring(0,120) + ' ......'}
                    </Text>
                    <Flex justifyContent={'space-between'} alignItems='center' mb='4'>
                        <Text fontWeight={'semibold'}>By: {author_name}</Text>
                        <Text fontWeight={'semibold'}>{post_category} <ExternalLinkIcon /> </Text>
                    </Flex>
                    <Link to={`/posts/${id}`}><Button size={'sm'} w='100%' textAlign={'center'} colorScheme='teal'>Read more</Button></Link>
                </Box>
            </Box>
        </Flex>
    </>
  )
}

export default Card


export const Skeleton = () => {
  return (
      <Flex direction='row' maxW='1000px' margin='auto' justifyContent='space-between' flexWrap='wrap' mt='50px'>
        <Box padding='6' boxShadow='lg' bg='white' w='300px' height='auto' mb='4'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' spacing='4' noOfLines={4} />
        </Box>
         <Box padding='6' boxShadow='lg' bg='white' w='300px' height='auto' mb='4'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' spacing='4' noOfLines={4} />
        </Box>
         <Box padding='6' boxShadow='lg' bg='white' w='300px' height='auto' mb='4'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' spacing='4' noOfLines={4} />
        </Box>
      </Flex>
  )
}