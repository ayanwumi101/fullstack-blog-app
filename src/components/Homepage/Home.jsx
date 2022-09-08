import React from 'react'
import {Box, Text, Flex, Heading} from '@chakra-ui/react'
import Posts from '../Posts/Posts'


const Home = () => {
  return (
    <Box>
       <Heading as='h2' size='md' textAlign={'center'} mt='3'>Welcome to Cody's Blog</Heading>
       <Posts />
    </Box>
  )
}

export default Home