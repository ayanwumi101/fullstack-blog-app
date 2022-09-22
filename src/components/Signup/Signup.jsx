import React, { useState } from 'react'
import {Box, Heading, Text, FormControl, FormLabel, Input, Button, Stack, useToast, Flex, Container, Avatar} from '@chakra-ui/react'
import {BsCameraFill} from 'react-icons/bs'
import {app} from '../../../firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {useNavigate, Link} from 'react-router-dom'
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage'
import { getFirestore, collection, addDoc,  } from 'firebase/firestore'
import {v4} from 'uuid'

const Signup = () => {
    
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [url, setUrl] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userRef = collection(db, 'user_info');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName && email && password && avatar && bio){

            // const avatarRef = ref(storage, 'image');
            // uploadBytes(avatarRef, avatar).then(() => {
            //     console.log('avatar uploaded');
            //     getDownloadURL(avatarRef)
            //         .then((url) => setUrl(url));
            // });

            createUserWithEmailAndPassword(auth, email, password, url).then((cred) => {
                console.log('user created', cred.user);
                // cred.user.photoURL = url;

                //   addDoc(userRef, {
                //     user_id: cred.user.uid,
                //     bio: bio,
                //     username: userName,
                //   }).then(() => {
                //     console.log('user details added to the database');
                //   });

                return db.collection('user_info').doc(cred.user.uid).set({
                    bio: bio,
                    username: userName,
                    user_id: cred.user.id
                })
            })
            .then(() => {
                toast({
                    title: 'Account Created', 
                    description: 'Your account has been created successfully',
                    status: 'success', duration: '5000',
                    isClosable: 'true', 
                    position: 'top-right'
                });

                setEmail('');
                setPassword('');
                setUserName('');
                setBio('');
                navigate('/login');
                signOut(auth);
                console.log('user signed out');
            })
            .catch((err) => {
                console.log(err.message);
            });

        }else{
             toast({
                    title: 'Invalid Credentials', 
                    description: 'Please fill the fields correctly',
                    status: 'error', duration: '2000',
                    variant: 'left-accent',
                    position: 'top'});
        }
    }

  return (
    <Container mt='5'>
          <Flex textAlign='center' justifyContent={'center'} spacing='-0.95' mb='3' borderRadius={'xl'}>
                <Heading size={'xl'} >Eco</Heading><Heading color='whatsapp.600'size={'xl'}>Scribes</Heading>
          </Flex>
    <Stack spacing='4' maxW={'450px'} margin='auto' bg='gray.50' boxShadow='lg' p='5' pt='2' mb='5'>
        <Heading textAlign='center' mb='4' size={'lg'} mt='6'>Signup</Heading>
        <FormControl maxWidth='450px' textAlign={'left'} isRequired>

            <Flex justifyContent={'center'} alignItems='center' margin={'auto'} mb='5' position={'relative'} maxW='150px'>
                <Avatar src='' name={userName} size='xl' />
                <FormLabel htmlFor='avatar' position={'absolute'} bottom='-38px' right='15px'>
                  <BsCameraFill style={{width: '30px', height: '30px'}} />
                  <Input type='file' onChange={(e) => setAvatar(e.target.files[0])} mb='5' id='avatar' display={'none'} />
                </FormLabel>
            </Flex>

            <FormLabel>Username</FormLabel>
            <Input type='text' placeholder='input your username' mb='5'  maxWidth='450px' value={userName} onChange={(e) => setUserName(e.target.value)} />

            <FormLabel>Bio</FormLabel>
            <Input type='text' placeholder='let us know a little about you' mb='5'  maxWidth='450px' value={bio} onChange={(e) => setBio(e.target.value)} />

            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='input your email' mb='5'  maxWidth='450px' value={email} onChange={(e) => setEmail(e.target.value)} />

            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='input your password'  maxWidth='450px' mb='5' value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button colorScheme='twitter' size='sm' type='submit' onClick={handleSubmit}>Signup</Button>

        </FormControl>
        <Text textAlign={'left'} >Already have an account? <Link to='/login'>Sign in</Link> </Text>
    </Stack>
    </Container>
  )
}

export default Signup


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        if(email && password){
            signInWithEmailAndPassword(auth, email, password).then((cred) => {
                console.log('user logged in', cred.user);
                  toast({
                    title: 'Login Successful', 
                    description: 'Your have successfully logged in',
                    status: 'success', duration: '3000',
                    isClosable: 'true', 
                    position: 'top-right'});
                setEmail('');
                setPassword('');
                navigate('/home');
            }).catch((err) => {
                toast({
                    title: "User doesn't exist", 
                    description: err.message,
                    status: 'error', duration: '2000',
                    variant: 'left-accent',
                    position: 'top'});
                console.log(err.message);
            })

        }else{
            toast({
                    title: 'Invalid Credentials', 
                    description: 'Please fill the fields correctly',
                    status: 'error', duration: '2000',
                    variant: 'left-accent',
                    position: 'top'});
        }
    }
    return(
        <>
        <Container mt='4'>
            <Flex textAlign='center'  mb='2' justifyContent={'center'} spacing='-0.95'>
                <Heading size={'xl'} >Eco</Heading><Heading color='whatsapp.600'size={'xl'}>Scribes</Heading>
            </Flex>
            <Box maxWidth='450px' margin={'auto'} mt='6' bg='gray.50' boxShadow='lg' p='5'>
                <Heading mb='5' textAlign={'center'} size='lg'>Login</Heading>
                <FormControl textAlign={'left'} mb='4' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Please input your email' maxWidth='400px' mb='5' value={email} onChange={(e) => setEmail(e.target.value)} />
                     <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='Please input your password' mb='5' maxWidth='400px' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button colorScheme='twitter' size='sm' onClick={handleLogin}>Login</Button>
                </FormControl>

                <Text textAlign={'left'} >Don't have an account? <Link to='/signup'>Create account</Link> </Text>
            </Box>
            </Container>
        </>
    )
}