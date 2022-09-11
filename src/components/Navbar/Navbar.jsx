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



const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [scrollBehavior, setScrollBehavior] = useState('outside');
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();


  const Links = ['Sports', 'Tech', 'Education', 'Politics', 'About', 'Teams', 'Contact'];
  const NavLink = ({children}, {children: ReactNode}) => (
      <Link px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none', border: 'none', outline: 'none', bg: useColorModeValue('grey.200', 'grey.700')}} to={'/'+ children} onClick={onClose}>
          {children}
      </Link>
  )


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
                <IconButton size={'md'} icon={isOpen ? <CloseIcon /> : <HamburgerIcon size='lg' />} aria-label={'open-menu'} display={{md: 'none'}} onClick={isOpen ? onClose : onOpen} />

                <HStack spacing={10}>
                    <Link to='/home' colorScheme={'teal'} _hover={{color: 'teal'}}>
                        <Flex alignItems={'center'}>
                            <Heading as='h4' size={'lg'}>Eco</Heading>
                            <Heading as='h4' size='lg' color={'whatsapp.700'}>Scribes</Heading>
                        </Flex>
                    </Link>
                    <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
                        {Links.map((link) => (<Link to={'/'+link}><NavLink key={link} onClick={onClose}>{link}</NavLink></Link>))}
                    </HStack>
                </HStack>

                <Flex alignItems={'center'}>
                    {/* <Link to='/create_post'><Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<AddIcon />} >Create</Button></Link> */}

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
    </>
  )
}

export default Navbar