import React from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs} from 'firebase/firestore'

const Posts = () => {
  const cards = [1,2,3,4, 5,6, 7,8]

  //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');

  //get collection data
  getDocs(colref).then((snapshot) => {
      let posts = [];
      snapshot.docs.map((doc) => {
        return posts.push({...doc.data(), id: doc.id})
      })
      console.log(posts);
  }).catch((err) => {
    console.log(err.message);
  });


  return (
    <>
    <Heading textAlign={'center'} as='h3' size='lg' mt={'4'}>All Posts</Heading>
    <Flex flexWrap={'wrap'} justifyContent='space-around' alignItems={'center'} mt='6' mb='5'>
      {cards.map((card) => {
        return(
            <Box dropShadow={'md'} w='300px' h='auto' boxShadow='md' bg={'gray.100'} borderRadius={'md'} mb='10'>
              <Image src={bimbs} h='250px' w='100%' borderTopLeftRadius={'md'} borderTopRightRadius={'md'} />
              <Box p='3'>
                <Heading as='h3' size={'md'}>Post Title</Heading>
                <Text mt='3' mb='3' textAlign={'justify'}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum voluptas, saepe cupiditate, ipsa quaerat non laboriosam.
                </Text>
                <Button size={'sm'} colorScheme='teal'>Read more</Button>
              </Box>
            </Box>
          )
      })}
    </Flex>
  </>
  )
}

export default Posts