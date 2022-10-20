import React from 'react'
import {Avatar, Text, Heading, Box, Image, Flex} from '@chakra-ui/react'
import cody from '../../assets/cody.jpg'
import bimbs from '../../assets/bimbs.jpg'
import waleeyah from '../../assets/waleeyah.jpg'
import nimah from '../../assets/nimot.jpg'
import hannat from '../../assets/hannat.jpg'

const Teams = () => {
  return (
    <Box>
      <Heading size='lg' textAlign={'center'} mt='5' mb='9'>Our Team</Heading>

      <Flex justifyContent={'space-around'} flexWrap={'wrap'}>
        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
            <Avatar src={cody} mb='3' size='xl' />
            <Heading size='md' mb='2'>Ayanwumi Abdulroheem</Heading>
          <Text mb='2'>Lead Developer</Text>
            <Text>Skills: HTML, CSS, JavaScript, React.js, Next.js, Firebase, Redux-toolkit, Bootstrap, Chakra-Ui </Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src={bimbs} mb='3' size='xl' />
          <Heading size='md' mb='2'>Aishah Lamidi</Heading>
          <Text mb='2'>Lead Writer</Text>
          <Text>Content-creator, Baker, Nutritionist, content writer, Press.</Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src={waleeyah} mb='3' size='xl' />
          <Heading size='md' mb='2'>Waleeyah Olalekan</Heading>
          <Text mb='2'>Writer</Text>
          <Text>Content-creator, Law student, Poet, content writer, Press.</Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src={nimah} mb='3' size='xl' />
          <Heading size='md' mb='2'>Raji Ni'mah</Heading>
          <Text mb='2'>Lead Developer</Text>
          <Text>Content-creator, Food-technologist, Baker, content writer, Press, MUN Ambassador. </Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src='' mb='3' size='xl' />
          <Heading size='md' mb='2'>Salami Oladapo</Heading>
          <Text mb='2'>CEO.</Text>
          <Text>Civil Engineer, Brand designer, graphic designer, Researcher</Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src='' mb='3' size='xl' />
          <Heading size='md' mb='2'>Muhammad Tijani</Heading>
          <Text mb='2'>Software Developer</Text>
          <Text>Skills: HTML, Css, JavaScript, React.js, Next.js, Angularjs, Tailwid Css </Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src={hannat} mb='3' size='xl' />
          <Heading size='md' mb='2'>Hannat Salawu</Heading>
          <Text mb='2'>Copywriter</Text>
          <Text>Content creator, Email marketer, copywriter, Food technologist, content writer</Text>
        </Box>

        <Box maxW='300px' textAlign={'center'} bg='gray.200' p='4' borderRadius={'lg'} boxShadow='xl' mb='9'>
          <Avatar src='' mb='3' size='xl' />
          <Heading size='md' mb='2'>Ahmad Khidir</Heading>
          <Text mb='2'>Software Engineer</Text>
          <Text>Skills: JavaScript, React.js, React-Native, Angularjs, Firebase, Flutter, Python, Redux-toolkit</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Teams