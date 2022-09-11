import React, {useState} from 'react'
import {Box, Heading, Text, FormControl, Input, FormLabel, Textarea, Button, Select, useToast,} from '@chakra-ui/react'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'


const CreatePost = () => {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const db = getFirestore();
  const colref = collection(db, 'posts');
 
  const handleSubmit = (e) => {
      e.preventDefault();
      if(title && authorName && date && category && content){
         addDoc(colref, {
          author_name: authorName,
          post_title: title,
          post_category: category,
          date: date,
          post_content: content,
         }).then(() => {
           toast({
                title: 'Post Published', 
                description: 'Your post has been published successfully',
                status: 'success', duration: '5000',
                isClosable: 'true', 
                position: 'top-right'});
          setAuthorName('')
          setCategory('')
          setContent('')
          setDate('')
          setTitle('')
          navigate('/home')
         })
      }else{
           toast({
                title: 'Error: Empty fields', 
                description: 'please fill the fields correctly',
                status: 'error', duration: '2000',
                variant: 'left-accent', 
                position: 'top'});
      }
  }

  return (
        <Box maxW={'500px'} margin='auto' mt='50px' mb='50px'>
            <Heading as='h3' size={'lg'} textAlign='center' mb='5'>Create New Post</Heading>

              <FormControl isRequired>

                <FormLabel>Post Title</FormLabel>
                <Input type='text' placeholder='Title of the post' mb='5' value={title} onChange={(e) => setTitle(e.target.value)} />

                <FormLabel>Upload Image</FormLabel>
                <Input type='file' mb='5' />

                <FormLabel>Author Name</FormLabel>
                <Input type='text' mb='5' value={authorName} onChange={(e) => setAuthorName(e.target.value)} />

                <FormLabel>Date</FormLabel>
                <Input type='date' mb='5' value={date} onChange={(e) => setDate(e.target.value)} />

                <FormLabel>Post Category</FormLabel>
                <Select type='date' mb='5' placeholder='Select post category' value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value='sports'>Sports</option>
                  <option value='Tech'>Tech</option>
                  <option value='Education'>Education</option>
                  <option value='Entertainment'>Entertainment</option>
                  <option value='Politics'>Politics</option>
                </Select>

                <FormLabel>Post Content</FormLabel>
                <Textarea mb='5' h='15' value={content} onChange={(e) => setContent(e.target.value)} />
              </FormControl>
            
               <Button type='submit' colorScheme={'linkedin'} size='sm' onClick={handleSubmit}>Publish</Button>
        </Box>
  )
}

export default CreatePost