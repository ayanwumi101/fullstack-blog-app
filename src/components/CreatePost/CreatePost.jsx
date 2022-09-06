import React from 'react'
import {Box, Heading, Text, FormControl, Input, FormLabel, Textarea, Button, Select} from '@chakra-ui/react'

const CreatePost = () => {
  return (
    <Box maxW={'500px'} margin='auto' mt='50px' mb='50px'>
        <Heading as='h3' size={'lg'} textAlign='center' mb='5'>Create New Post</Heading>
        <FormControl isRequired>

          <FormLabel>Post Title</FormLabel>
          <Input type='text' placeholder='Title of the post' mb='5' />

          <FormLabel>Upload Image</FormLabel>
          <Input type='file' mb='5' />

          <FormLabel>Author Name</FormLabel>
          <Input type='text' mb='5' />

          <FormLabel>Date</FormLabel>
          <Input type='date' mb='5' />

          <FormLabel>Post Category</FormLabel>
          <Select type='date' mb='5' placeholder='Select post category'>
            <option value='sports'>Sports</option>
            <option value='sports'>Tech</option>
            <option value='sports'>Education</option>
            <option value='sports'>Entertainment</option>
            <option value='sports'>Politics</option>
          </Select>

          <FormLabel>Post Content</FormLabel>
          <Textarea mb='5' h='15' />

          <Button type='submit' colorScheme={'linkedin'} size='sm'>Publish</Button>
        </FormControl>
       
    </Box>
  )
}

export default CreatePost