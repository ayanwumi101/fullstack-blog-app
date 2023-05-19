import React from 'react'
import {Box, Text, Heading, Flex, Image, Tooltip} from '@chakra-ui/react'
import {FaGithub, FaTwitter, FaLinkedin, FaLinkedinIn, FaWhatsapp, FaLink, FaFacebook, FaEnvelope} from 'react-icons/fa'
import '../Posts/modal.css'

const Contact = () => {
  return (
    <Box maxW='600px' margin='auto' p='5'>
      <Heading textAlign={'center'} mt='5' mb='5'>Contact Us</Heading>
      <Text mb='3' textAlign={'justify'} lineHeight={'tall'}>You can reach out to me through any of my social media handles if you need any of my services or for enquiries. My DM is always open for business.</Text>
      <Text mb='8' lineHeight={'tall'}>I am also currently seeking a junior frontend developer role or an intership position, please kindly refer me if there's any opening.</Text>
      <Flex maxW='500px' margin='auto' justifyContent={'space-between'} flexDirection={{base: 'column', md: 'row', lg: 'row'}} alignItems='center' flexWrap={'wrap'} textAlign='center'>

       <Box textAlign='center' mb='9'>
          <Tooltip label='Github' fontSize={'sm'} color='white'>
            <a href='https://github.com/ayanwumi101' target='_blank'>
              <FaGithub className='social-icons' />
            </a>
          </Tooltip>
       </Box>

       <Box textAlign='center' mb='9'>
          <Tooltip label='Twitter' fontSize={'sm'} color='white'>
            <a href='https://twitter.com/abdulroheem_' target='_blank'>
              <FaTwitter className='social-icons' />
            </a>
          </Tooltip>
       </Box>

       <Box textAlign='center' mb='9'>
          <Tooltip label='LinkedIn' fontSize={'sm'} color='white'>
            <a href='https://www.linkedin.com/in/ayanwumi-abdulroheem-8b37691bb/' target='_blank'>
              <FaLinkedin className='social-icons' />
            </a>
          </Tooltip>
       </Box>

       <Box textAlign='center' mb='9'>
          <Tooltip label='WhatsApp' fontSize={'sm'} color='white'>
            <a href='https://wa.me/+2348127671686' target='_blank'>
              <FaWhatsapp className='social-icons' />
            </a>
          </Tooltip>
       </Box>

        <Box textAlign='center' mb='9'>
          <Tooltip label='Portfolio Website' fontSize={'sm'} color='white'>
            <a href='https://codytech.netlify.app' target='_blank'>
              <FaLink className='social-icons' />
            </a>
          </Tooltip>
        </Box>

       <Box textAlign='center' mb='9'>
          <Tooltip label='facebook' fontSize={'sm'} color='white'>
            <a href='https://web.facebook.com/tunde.ayanwumi.7' target='_blank'>
              <FaFacebook className='social-icons' />
            </a>
          </Tooltip>
       </Box>

        <Box textAlign='center' mb='9'>
          <Tooltip label='Send me Email' color='white'>
            <a href="mailto:ayanwunmiabdulroheem@gmail.com" target='_blank'>
              <FaEnvelope className='social-icons' />
            </a>
          </Tooltip>
        </Box>


      </Flex>
    </Box>
  )
}

export default Contact