import React, {useState} from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs} from 'firebase/firestore'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'

const Posts = () => {
  const cards = [1,2,3,4, 5,6, 7,8]
  const [posts, setPosts] = useState([])
  //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');

  //get collection data
  getDocs(colref).then((snapshot) => {
      let item = [];
      snapshot.docs.map((doc) => {
        item.push({...doc.data(), id: doc.id})
        return setPosts(item)
      })
      console.log(posts);
  }).catch((err) => {
    console.log(err.message);
  });


  return (
    <>
    <Heading textAlign={'center'} as='h3' size='md' mt={'4'}>All Posts</Heading>
    <Flex flexDirection={'column'} justifyContent='space-around' alignItems={'center'} mt='3' mb='3' p='3'>
      {posts.map((post) => {
        return(
            <Flex flexDirection={'row'} dropShadow={'md'} w='100%' h='auto' flexWrap={'wrap'} alignItems={'center'} justifyContent='space-between' boxShadow='md' bg={'gray.100'} borderRadius={'md'} mb='5' p='3'>
              <Image src={bimbs} h='80px' w='80px' borderRadius={'md'} />
                <Heading as='h3' size={'sm'}>{post.post_title}</Heading>
                <Text>Author: {post.author_name}</Text>
                <Text>Category: {post.post_category}</Text>
                <Text>Date: {post.date}</Text>
                <Text>Id: {post.id}</Text>
                <Button size={'sm'} colorScheme='linkedin'><EditIcon/></Button>
                <Button size={'sm'} colorScheme='red'><DeleteIcon/></Button>
            </Flex>
          )
      })}
    </Flex>
  </>
  )
}

export default Posts