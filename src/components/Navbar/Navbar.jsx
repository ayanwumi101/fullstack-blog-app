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
    AvatarBadge,Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {HamburgerIcon, CloseIcon, AddIcon, CheckCircleIcon, ExternalLinkIcon, DragHandleIcon} from '@chakra-ui/icons'
import {useLocation, useNavigate} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {signOut, getAuth} from 'firebase/auth'
import {getStorage, getDownloadURL, ref} from 'firebase/storage'
import {getFirestore, query, where, getDocs, collection, } from 'firebase/firestore'



const Navbar = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentUser, setCurrentUser] = useState([]);
  const [userName, setUserName] = useState();
  const [photoUrl, setPhotoUrl] = useState('')
  const toast = useToast();
  const location = useLocation();
  const storage = getStorage();
  const auth = getAuth();
  const navigate = useNavigate();


  const Links = ['Sports', 'Tech', 'Education', 'Politics', 'About', 'Team', 'Contact'];
  const NavLink = ({children}, {children: ReactNode}) => (
      <Link px={2} py={1} rounded={'md'} _hover={{textDecoration: 'none', border: 'none', outline: 'none', bg: useColorModeValue('grey.200', 'grey.700')}} to={'/'+ children} onClick={onClose}>
          {children}
      </Link>
  )

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        const db = getFirestore();
        const userRef = collection(db, 'userData');
        const q = query(userRef, where('user_id', '==', user.uid));

        const getUsername = async () => {
            await getDocs(q).then(async (snapshot) => {
                let user_data = [];
                snapshot.docs.map((item) => {
                    console.log(item);
                    user_data.push({...item.data(), id: item.id});
                    return setUserName(user_data);
                })
            })
            console.log(userName);
        };

        if(user){
            const imageRef = ref(storage, user.uid);
                getDownloadURL(imageRef).then((url) => {
                    setPhotoUrl(url);
                });
            getUsername();
        }
        
    })
  }, [])
  console.log(userName);


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
                       <Text mr='2' fontWeight={'bold'} textTransform='capitalize' display={{base: 'none', md: 'block', lg: 'block'}}>{userName ? userName[0].user_name : ''}</Text>
                            <MenuButton as={'button'} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} border='none' outline='none'>
                                <Avatar src={photoUrl} size={'sm'} >
                                    <AvatarBadge bg='green.500' boxSize='1.25em' />
                                </Avatar>
                            </MenuButton>

                            <MenuList zIndex={'overlay'}>
                                    { currentUser.email === "admin@gmail.com" && 
                                    <>
                                      <Link to='/create_post'>
                                        <MenuItem variant={'solid'} >
                                        <AddIcon mr='2' color={'whatsapp.700'} /> Create Post
                                        </MenuItem>
                                      </Link>
                                      <MenuDivider />
                                    <Link to='/posts'>
                                        <MenuItem>
                                        <DragHandleIcon mr='2' color={'whatsapp.700'} />Posts
                                        </MenuItem>
                                    </Link>
                                    </>}
                                  <MenuDivider />
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