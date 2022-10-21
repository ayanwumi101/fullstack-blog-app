import React, { useState, useEffect } from 'react'
import { Box, Heading, FormControl, Input, FormLabel, Button, Select, useToast, Container } from '@chakra-ui/react'
import { FaImage } from 'react-icons/fa'
import { app } from '../../../firebaseConfig'
import { getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../Posts/modal.css'


const CreatePost = () => {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const db = getFirestore();
  const colref = collection(db, 'posts');

  const storage = getStorage();
  const doc_id = v4();
  


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



  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && authorName && date && category && content && image) {
      setLoading(true);
      addDoc(colref, {
        author_name: authorName,
        post_title: title,
        post_category: category,
        date: date,
        post_content: content,
        post_id: doc_id,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          toast({
            title: 'Post Published',
            description: 'Your post has been published successfully',
            status: 'success', duration: '5000',
            isClosable: 'true',
            position: 'top-right'
          });
          setAuthorName('')
          setCategory('')
          setContent('')
          setDate('')
          setTitle('')
          navigate('/home')
        });

      const imageRef = ref(storage, `post_images/${doc_id}`);
      uploadBytes(imageRef, image).then(() => {
        console.log('image uploaded');
      });

    } else {
      toast({
        title: 'Error: Empty fields',
        description: 'please fill the fields correctly',
        status: 'error', duration: '2000',
        variant: 'left-accent',
        position: 'top'
      });
    }

  }

  return (
    <Container>
      <Box maxW={'500px'} margin='auto' mt='50px' mb='50px'>
        <Heading as='h3' size={'lg'} textAlign='center' mb='5'>Create New Post</Heading>

        <FormControl isRequired>

          <FormLabel>Post Title</FormLabel>
          <Input type='text' placeholder='Title of the post' mb='5' value={title} onChange={(e) => setTitle(e.target.value)} />

          <FormLabel>Upload Post Image</FormLabel>
          <FormLabel htmlFor='upload' className='uploads'>
            <Box className='span'>
              <FaImage className='icon' />
              <span>Upload Image</span>
            </Box>
            <Input type='file' onChange={(e) => setImage(e.target.files[0])} display='none' id='upload' />
          </FormLabel>
          <Box mb='5' textAlign={'center'}>{image ? image.name : ''}</Box>

          <FormLabel>Author Name</FormLabel>
          <Input type='text' mb='5' value={authorName} onChange={(e) => setAuthorName(e.target.value)} />

          <FormLabel>Date</FormLabel>
          <Input type='date' mb='5' value={date} onChange={(e) => setDate(e.target.value)} />

          <FormLabel>Post Category</FormLabel>
          <Select type='date' mb='5' placeholder='Select post category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value='Sports'>Sports</option>
            <option value='Tech'>Tech</option>
            <option value='Education'>Education</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Politics'>Politics</option>
          </Select>

          <FormLabel>Post Content</FormLabel>
          <ReactQuill theme='snow' modules={modules} dangerouslySetInnerHTML={{__html: content}} onChange={setContent} />
        </FormControl>

        <Button type='submit' colorScheme={'linkedin'} size='sm' onClick={handleSubmit} mt='2'>{loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='sm' /> : 'Publish'}</Button>
      </Box>
    </Container>
  )
}

export default CreatePost