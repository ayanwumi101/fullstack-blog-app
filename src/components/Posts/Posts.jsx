import React, {useState, useEffect} from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image, Modal, ModalCloseButton, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Select, useDisclosure, Textarea, useToast, Center} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'
import './modal.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [newData, setNewData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  
  //initialize firestore
  const db = getFirestore();
  const toast = useToast()

  //collection reference 
  const colref = collection(db, 'posts');

  useEffect(() => {
    onSnapshot(colref, (snapshot) => {
      let item = [];
      snapshot.docs.map((doc) => {
        item.push({ ...doc.data(), id: doc.id })
        return setPosts(item)
      })
      console.log(posts);
    })
  }, [])
  
  const deletePost = (e) => {
    const itemId = e.currentTarget.id;
    const docRef = doc(db, 'posts', itemId);
    deleteDoc(docRef).then(() => {
      toast({
        title: 'Post Deleted',
        description: 'post has been deleted successfully',
        status: 'success', duration: '3000',
        isClosable: 'true',
        position: 'top-right'
      });
      console.log('post deleted');
    }).catch((err) => {
      console.log(err.message);
    })
  }


  const openModal = (e) => {
    setShowModal(true);
    const itemId = e.target.id;
    const newItem = posts.find((item) => item.id === itemId);
    setNewData(newItem);
    console.log(newData);
    
  }

  const updatePost = (e) => {
    const itemId = e.currentTarget.id;
    const docRef = doc(db, 'posts', itemId);
    updateDoc(docRef, {
      post_title: title,
      date: date,
      post_category: category,
      author_name: authorName,
      post_content: content,
    }).then(() => {
      toast({
        title: 'Post Updated',
        description: 'post has been updated successfully',
        status: 'success', duration: '3000',
        isClosable: 'true',
        position: 'top-right'
      });
    })
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
              <Image src={bimbs} h='70px' w='70px' borderRadius={'md'} />
                <Heading as='h3' size={'sm'}>{post.post_title}</Heading>
                <Text>Author: {post.author_name}</Text>
                <Text>Category: {post.post_category}</Text>
                <Text>Date: {post.date}</Text>
                <Text>Id: {post.id}</Text>
                <Button size={'sm'} colorScheme='linkedin' w='40px' onClick={openModal}  id={post.id}><EditIcon/></Button>
            <Button size={'sm'} colorScheme='red' w='40px' onClick={deletePost} id={post.id}><DeleteIcon/></Button>
            </Flex>
          )
      })}
    </Flex>

    <>
        {showModal && <Box className="modal" margin='auto'>
            <Box class="container" maxW='430px' margin='auto' p='3'>
                    <FormControl className='modal-content' p='3' borderRadius={'3'}>
                      <Heading textAlign={'center'} size='md' m='3'>Edit Post</Heading>

                      <FormLabel>Post title</FormLabel>
                      <Input type='text' mb='2' value={newData ? newData.post_title : ''} onChange={(e) => setTitle(e.target.value)} />

                      <FormLabel>Date</FormLabel>
                      <Input type='date' mb='2' value={newData ? newData.date : ''} onChange={(e) => setDate(e.target.value)} />

                      <FormLabel>Author Name</FormLabel>
                      <Input type='text' mb='2' value={newData ? newData.author_name : ''} onChange={(e) => setAuthorName(e.target.value)} />

                      <FormLabel>Post Category</FormLabel>
                      <Select mb='2' value={newData ? newData.post_category : ''} onChange={(e) => setCategory(e.target.value)}>
                        <option value="sports">Sports</option>
                        <option value="education">Education</option>
                        <option value="tech">Tech</option>
                        <option value="politics">Politics</option>
                      </Select>

                      <FormLabel>Post Content</FormLabel>
                      <Textarea value={newData ? newData.post_content : ''} onChange={(e) => setContent(e.target.value)}></Textarea>

                      <Button mr='9' size='sm' w='100px' mt='3' onClick={() => setShowModal(false)}>Cancel</Button>
                      <Button size='sm' colorScheme={'teal'} w='100px' mt='3' float='right' textAlign={'right'} onClick={updatePost} id={ newData? newData.id : ''}>Update Post</Button>
                    </FormControl>
            </Box>
        </Box>}
    </>

  </>
  )
}

export default Posts
