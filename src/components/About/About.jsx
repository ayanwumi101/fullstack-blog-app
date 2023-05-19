import React from 'react'
import {Box, Text, Heading, Stack , } from '@chakra-ui/react'

const About = () => {
  return (
    <Box>
      <Heading textAlign={'center'} size='lg' mt='5'>About EcoScribes</Heading>

      <Box p='7' textAlign={'justify'}>
        <Text>EcoScribes is a platform created for people who love creating and consuming contents, e.g News, tutorials, articles, blog posts and so on.
          You can always come to EcoScribes to read latest news, gists or learn about different things. The Website was developed by a Frontend Developer named <strong>Ayanwumi Abdulroheem Tunde</strong> popularly known as <strong>Cody</strong>. He is a frontend web developer with two years experience in web development. The main reason he built this blog was because he has always wanted to build a fullstack application, and immediately he started learning firebase, he thought building a fullstack blog website would be a perfect test and project for him.
        </Text>

        <Text mt='9' textAlign={'center'}>
          This website is built with <span style={{ color: 'red', fontSize: '25px' }}>&hearts;</span> . The stacks used are React <span style={{ color: 'red', fontSize: '15px' }}>&#128525;</span>, Chakra Ui <span style={{ fontSize: '15px' }}>&#9889;</span>, Firebase<span style={{ color: 'red', fontSize: '18px' }}>&#128293;</span> and some other packages.
        </Text>
      </Box>
    </Box>
  )
}

export default About