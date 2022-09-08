import React, { useState } from 'react'
import {Box, Heading, Text, FormControl, FormLabel, Input, Button, Stack, useToast, Alert} from '@chakra-ui/react'
import {app} from '../../../firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, Link} from 'react-router-dom'

const Signup = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName && email && password){
            createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                console.log('user created', cred.user);
                toast({
                    title: 'Account Created', 
                    description: 'Your account has been created successfully',
                    status: 'success', duration: '5000',
                    isClosable: 'true', 
                    position: 'top-right'});
                setEmail('');
                setPassword('');
                setUserName('');
                navigate('/login');
                signOut(auth);
                console.log('user signed out');
            }).catch((err) => {
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

  return (
    <Stack spacing='4' maxW={'450px'} margin='auto' mt='9'>
        <Heading textAlign='center' mb='5'>Signup</Heading>
        <FormControl maxWidth='450px' textAlign={'left'} isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' placeholder='input your username' mb='5' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='input your email' mb='5' value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='input your password' mb='5' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button colorScheme='twitter' size='sm' type='submit' onClick={handleSubmit}>Signup</Button>
        </FormControl>
        <Text textAlign={'left'} >Already have an account? <Link to='/login'>Sign in</Link> </Text>
    </Stack>
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
                navigate('/');
            }).catch((err) => {
                console.log(err.message);
            })
        }else{
            toast({
                    title: 'Invalid Credentials', 
                    description: 'Please fill the fields correctly',
                    status: 'error', duration: '3000',
                    variant: 'left-accent',
                    position: 'top'});
        }
    }
    return(
        <>
            <Box maxWidth='400px' margin={'auto'} mt='9'>
                <Heading mb='5' textAlign={'center'}>Login</Heading>
                <FormControl textAlign={'left'} mb='4' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Please input your email' width='400px' mb='5' value={email} onChange={(e) => setEmail(e.target.value)} />
                     <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='Please input your password' mb='5' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button colorScheme='twitter' size='sm' onClick={handleLogin}>Login</Button>
                </FormControl>

                <Text textAlign={'left'} >Don't have an account? <Link to='/signup'>Create account</Link> </Text>
            </Box>
        </>
    )
}