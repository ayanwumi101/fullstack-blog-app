import React, {useState} from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Select, SelectField, Textarea} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'

const Posts = () => {
  const cards = [1,2,3,4, 5,6, 7,8]
  const [posts, setPosts] = useState([])
  const [editPostData, setEditPostData] = useState([])
  const [showModal, setShowModal] = useState(false);
  
  //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');
  //get collection data
  // getDocs(colref).then((snapshot) => {
  //     let item = [];
  //     snapshot.docs.map((doc) => {
  //       item.push({...doc.data(), id: doc.id})
  //       return setPosts(item)
  //     })
  //     console.log(posts);
  // }).catch((err) => {
  //   console.log(err.message);
  // });


  onSnapshot(colref, (snapshot) => {
      let item = [];
      snapshot.docs.map((doc) => {
        item.push({...doc.data(), id: doc.id})
        return setPosts(item)
      })
      console.log(posts);
  })

  const deletePost = (e) => {
    const itemId = posts.filter((item) => item.id === e.target.id);
    const docRef = doc(db, 'posts', itemId);
    deleteDoc(docRef).then(() => {
      console.log('post deleted');
    }).catch((err) => {
      console.log(err.message);
    })
  }


  // const editPost = (e) => {
  //   console.log(e.target);
  //   return <EditForm />
  // }

  const handleModal = () => {
    setShowModal(!showModal);
  }


  return (
    <>
    <Heading textAlign={'center'} as='h3' size='md' mt={'4'}>All Posts</Heading>
    <Flex flexDirection={'column'} justifyContent='space-around' alignItems={'center'} mt='3' mb='3' p='3'>
      {posts.map((post) => {
        return(
            <Flex 
              flexDirection={'row'} 
              dropShadow={'md'} 
              w='100%' 
              h='auto' 
              flexWrap={'wrap'} 
              alignItems={'center'} 
              justifyContent='space-between' 
              boxShadow='md' 
              bg={'gray.100'} 
              borderRadius={'md'} 
              mb='5' 
              p='3'
              key={post.id}
            >
              <Image src={bimbs} h='80px' w='80px' borderRadius={'md'} />
                <Heading as='h3' size={'sm'}>{post.post_title}</Heading>
                <Text>Author: {post.author_name}</Text>
                <Text>Category: {post.post_category}</Text>
                <Text>Date: {post.date}</Text>
                <Text>Id: {post.id}</Text>
                <Button size={'sm'} colorScheme='linkedin' onClick={editPost}><EditIcon/></Button>
                <Button size={'sm'} colorScheme='red' onClick={deletePost}><DeleteIcon/></Button>
            </Flex>
          )
      })}
    </Flex>
    <Button onClick={handleModal}>Open edit modal</Button>
    {showModal && <EditForm />}
  </>
  )
}

export default Posts

export const EditForm = () => {
  return (
    <Box maxW='400px' margin='auto' p='4'>
      <Heading size='md' textAlign={'center'} mb='3'>Edit Post</Heading>
      <FormControl>
        <FormLabel>Post title</FormLabel>
        <Input type='text' mb='2' />

        <FormLabel>Date</FormLabel>
        <Input type='date' mb='2' />

        <FormLabel>Author Name</FormLabel>
        <Input type='text' mb='2' />

        <FormLabel>Post Category</FormLabel>
        <Select mb='2'>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
          <option value="tech">Tech</option>
          <option value="politics">Politics</option>
        </Select>

        <FormLabel>Post Content</FormLabel>
        <Textarea mb='2'></Textarea>

        <Button size='sm' colorScheme={'teal'} textAlign={'right'}>Update Post</Button>
      </FormControl>
        {/* <Modal>
          <ModalOverlay />
          <ModalHeader>
            <Heading size='md'>Edit Post</Heading>
          </ModalHeader>
        </Modal> */}
    </Box>
  )
}

export const DeletePost = () => {
  return (
    <>

    </>
  )
}