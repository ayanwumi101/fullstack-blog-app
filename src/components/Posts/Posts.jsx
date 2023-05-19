import React, {useState, useEffect} from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image, Modal, ModalCloseButton, Spinner, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Select, useDisclosure, Textarea, useToast, Center} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore'
import {ref, getDownloadURL, listAll, getStorage} from 'firebase/storage'
import {EditIcon, DeleteIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'
import './modal.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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
  const [loading, setLoading] = useState(true);
  const [postImage, setPostImage] = useState('');
  const navigate = useNavigate();
  
  //initialize firestore
  const db = getFirestore();
  const storage = getStorage();
  const imageRef = ref(storage, 'post_images');

  const toast = useToast();

  //Reactquill plugin modules start here
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };


  //collection reference 
  const colref = collection(db, 'posts');

  useEffect(() => {
    getDocs(colref).then((snapshot) => {
      console.log(snapshot.docs);
      let item = [];
      snapshot.docs.map((doc) => {
        item.push({...doc.data(), id: doc.id});
        setLoading(false);
        return setPosts(item);
      })
      console.log(posts);
    })
  }, [])


 
  useEffect(() => {
    // const fetchImage = async () => {
    //     await listAll(imageRef).then(async (response) => {
    //       console.log(response.items);
    //       const photo = response.items.filter((item) => item.name === posts.post_id);
    //       console.log(photo, posts.post_id);
    //       await getDownloadURL(photo).then((url) => {
    //         console.log(url);
    //       })
    //     })
    // }
  
    // if(posts){
    //   fetchImage();
    // }
    
  }, []);

  
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
    console.log(newItem);
    console.log(newData); 
  }

  const updatePost = (e) => {
    const itemId = e.target.id;
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
      setAuthorName('');
      setCategory('');
      setTitle('');
      setDate('');
      setContent('');
      setShowModal(false);
      navigate('/home');
    })
  }


  return (
    <>
    <Heading textAlign={'center'} as='h3' size='md' mt={'4'}>All Posts</Heading>
    <Flex flexDirection={'column'} justifyContent='space-around' alignItems={'center'} mt='3' mb='3' p='3'>
      {posts.map((post) => {
        return(
          <>
            {loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' mt='50px' /> : <Flex 
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
              <Image src={postImage} h='70px' w='70px' borderRadius={'md'} />
                <Heading as='h3' size={'sm'}>{post.post_title.substring(0,35)}...</Heading>
                <Text>Author: {post.author_name}</Text>
                <Text>Category: {post.post_category}</Text>
                <Text>Date: {post.date}</Text>
                <Text>Id: {post.id}</Text>
                <Button size={'sm'} colorScheme='linkedin' w='40px' onClick={openModal}  id={post.id}><EditIcon/></Button>
            <Button size={'sm'} colorScheme='red' w='40px' onClick={deletePost} id={post.id}><DeleteIcon/></Button>
            </Flex>}
            </>
          )
      })}
    </Flex>

    <>
        {showModal && <Box className="modal" margin='auto'>
            <Box class="container" maxW='430px' margin='auto' p='3'>
                    <FormControl className='modal-content' p='3' borderRadius={'3'}>
                      <Heading textAlign={'center'} size='md' m='3'>Edit Post</Heading>

                      <FormLabel>Post title</FormLabel>
                      <Input type='text' mb='2' value={title} placeholder={newData ? newData.post_title : ''} onChange={(e) => setTitle(e.target.value)} />

                      <FormLabel>Date</FormLabel>
                      <Input type='date' mb='2' value={date} placeholder={newData ? newData.date : ''} onChange={(e) => setDate(e.target.value)} />

                      <FormLabel>Author Name</FormLabel>
                      <Input type='text' mb='2' value={authorName} placeholder={newData ? newData.author_name : ''} onChange={(e) => setAuthorName(e.target.value)} />

                      <FormLabel>Post Category</FormLabel>
                      <Select mb='2' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="sports">Sports</option>
                        <option value="education">Education</option>
                        <option value="tech">Tech</option>
                        <option value="politics">Politics</option>
                      </Select>

                      <FormLabel>Post Content</FormLabel>
                      <Box overflow={'auto'}>
                        <ReactQuill modules={modules} placeholder={newData ? newData.post_content : ''} onChange={setContent} dangerouslySetInnerHTML={{__html: content}} />
                      </Box>

                      <Button mr='9' size='sm' w='100px' mt='3' onClick={() => setShowModal(false)}>Cancel</Button>
                      <Button size='sm' colorScheme={'teal'} w='100px' mt='3' float='right' textAlign={'right'} onClick={updatePost} id={ newData ? newData.id : ''}>Update Post</Button>
                    </FormControl>
            </Box>
        </Box>}
    </>

  </>
  )
}

export default Posts
