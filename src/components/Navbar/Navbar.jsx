import React, {ReactNode, useState} from 'react'
import {
    Flex,
    Box, 
    Avatar, 
    HStack, 
    IconButton, 
    Button, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    MenuDivider, 
    useDisclosure, 
    useColorModeValue, 
    Stack, 
    Heading, 
    AvatarBadge,FormControl, Input, FormLabel, Textarea, Select, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {HamburgerIcon, CloseIcon, AddIcon} from '@chakra-ui/icons'
import {useLocation} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {signOut, getAuth} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'



const Links = ['Sports', 'Tech', 'Education', 'Politics', 'About', 'Teams', 'Contact'];
const NavLink = ({children}, {children: ReactNode}) => (
    <Link px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none', border: 'none', outline: 'none', bg: useColorModeValue('grey.200', 'grey.700')}} to={'/'+ children}>
        {children}
    </Link>
)

const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [scrollBehavior, setScrollBehavior] = useState('outside');
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
      signOut(auth).then(() => {
        console.log('user logged out');
          toast({
                  title: 'Logout Successful', 
                  description: 'You have successfully logged out',
                  status: 'success', duration: '5000',
                  isClosable: 'true', 
                  position: 'top-right'});
        navigate('/login');
      }).catch((err) => {
        console.log(err.message);
      });
  }


  return (
    <>
        {location.pathname !== '/login' && location.pathname !== '/signup' && (<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton size={'md'} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={'open-menu'} display={{md: 'none'}} onClick={isOpen ? onClose : onOpen} />

                <HStack spacing={10}>
                    <Link to='/' colorScheme={'teal'} _hover={{color: 'teal'}}><Box><Heading as='h4' size='md'>Cody's</Heading></Box></Link>
                    <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
                        {Links.map((link) => (<Link to={'/'+link}><NavLink key={link}>{link}</NavLink></Link>))}
                    </HStack>
                </HStack>

                <Flex alignItems={'center'}>
                    <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<AddIcon />} onClick={onOpen} >Create</Button>

                    <Menu>
                        <MenuButton as={'button'} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar src='' size={'sm'} >
                                <AvatarBadge bg='green.500' boxSize='1.25em' />
                            </Avatar>
                        </MenuButton>

                        <MenuList>
                            <MenuItem>Account</MenuItem>
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (<Box pb={4} display={{md: 'none'}}><Stack as={'nav'} spacing={4}>{Links.map((link) => (<NavLink key={link}>{link}</NavLink>))}</Stack></Box>) : null}
        </Box>)}

    <Modal onClose={onClose} isOpen={isOpen} isCentered mt='4' scrollBehavior={scrollBehavior}>
    <ModalOverlay />
      <ModalContent>
        <Box maxW={'500px'} margin='auto' >
            <ModalHeader><Heading as='h3' size={'lg'} textAlign='center'>Create New Post</Heading></ModalHeader>

            <ModalBody>
              <FormControl isRequired>

                <FormLabel>Post Title</FormLabel>
                <Input type='text' placeholder='Title of the post' mb='5' />

                <FormLabel>Upload Image</FormLabel>
                <Input type='file' mb='3' />

                <FormLabel>Author Name</FormLabel>
                <Input type='text' mb='3' />

                <FormLabel>Post Category</FormLabel>
                <Select type='date' mb='3' placeholder='Select post category'>
                  <option value='sports'>Sports</option>
                  <option value='sports'>Tech</option>
                  <option value='sports'>Education</option>
                  <option value='sports'>Entertainment</option>
                  <option value='sports'>Politics</option>
                </Select>

                <FormLabel>Post Content</FormLabel>
                <Textarea mb='5' h='15' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose} size='sm' bg='tomato' color='white' _hover={{bg: 'tomato'}} mr='200px'>Close</Button>
               <Button type='submit' colorScheme={'linkedin'} size='sm' onClick={() => toast({title: 'Post Published', description: 'Your post has been published successfully', status: 'success', duration: '3000', isClosable: 'true', position: 'top-right'})}>Publish</Button>
            </ModalFooter>

        </Box>
      </ModalContent>
    </Modal>
    </>
  )
}

export default Navbar