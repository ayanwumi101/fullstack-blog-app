import React from 'react'
import {Box, Text, Heading, Button, HStack, Flex, Image, Container, SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import bimbs from '../../assets/bimbs.jpg';
import {LinkIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

const Card = ({post}) => {
  const {author_name, post_title, date, post_content, post_category, id} = post;
  return (
    <>
        <Flex flexWrap={'wrap'} justifyContent='space-around' alignItems='flex-start' margin='auto' mt='6' mb='2'>
            <Box dropShadow={'md'} w='300px' h='auto' boxShadow='md' bg={'gray.100'} borderRadius={'md'} mb='10'>
                <Image src={bimbs} h='250px' w='100%' borderTopLeftRadius={'md'} borderTopRightRadius={'md'} />
                <Box p='3'>
                    <Heading as='h3' size={'md'}>{post_title}</Heading>
                    <Text mt='3' mb='3' textAlign={'justify'}>
                        {post_content.substring(0,130) + ' ......'}
                    </Text>
                    <Flex justifyContent={'space-between'} alignItems='center'>
                        <Link to={`/posts/${id}`}><Button size={'sm'} colorScheme='teal'>Read more</Button></Link>
                        <Text><ExternalLinkIcon /> {post_category}</Text>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    </>
  )
}

export default Card


export const Skeleton = () => {
  return(
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