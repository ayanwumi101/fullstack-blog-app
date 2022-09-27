import React, {ReactNode, useState, useEffect} from 'react'
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
import {HamburgerIcon, CloseIcon, AddIcon, CheckCircleIcon, ExternalLinkIcon, DragHandleIcon} from '@chakra-ui/icons'
import {useLocation} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {signOut, getAuth, updateProfile} from 'firebase/auth'
import {getStorage, getDownloadURL, ref} from 'firebase/storage'



const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentUser, setCurrentUser] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(null)
  const toast = useToast();
  const location = useLocation();
  const storage = getStorage();
  const auth = getAuth();


  const Links = ['Sports', 'Tech', 'Education', 'Politics', 'About', 'Teams', 'Contact'];
  const NavLink = ({children}, {children: ReactNode}) => (
      <Link px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none', border: 'none', outline: 'none', bg: useColorModeValue('grey.200', 'grey.700')}} to={'/'+ children} onClick={onClose}>
          {children}
      </Link>
  )

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user){
            setCurrentUser(user)
            const imageRef = ref(storage, user.uid);
            getDownloadURL(imageRef);
            updateProfile(user, {photoUrl: photoUrl})
            setPhotoUrl(user.photoURL);
        }
        
    })
    //   const imageRef = ref(storage, currentUser.uid)
  }, [])


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

                    <Menu>
                       {currentUser && <>  
                            <MenuButton as={'button'} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                                <Avatar src={photoUrl} size={'sm'} >
                                    <AvatarBadge bg='green.500' boxSize='1.25em' />
                                </Avatar>
                            </MenuButton>

                            <MenuList zIndex={'overlay'}>
                                <Link to='/create_post'><MenuItem variant={'solid'} ><AddIcon mr='2' color={'whatsapp.700'} /> Create Post</MenuItem></Link>
                                <Link to='/posts'><MenuItem><DragHandleIcon mr='2' color={'whatsapp.700'} />Posts</MenuItem></Link>
                                <Link to='/profile'><MenuItem><CheckCircleIcon mr='2' color={'whatsapp.700'} /> Profile</MenuItem></Link>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}><ExternalLinkIcon mr='2' color={'whatsapp.700'} />Logout</MenuItem>
                            </MenuList>
                        </>}
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (<Box pb={4} display={{md: 'none'}}><Stack as={'nav'} spacing={4}>{Links.map((link) => (<NavLink key={link}>{link}</NavLink>))}</Stack></Box>) : null}
        </Box>)}
    </>
  )
}

export default Navbar