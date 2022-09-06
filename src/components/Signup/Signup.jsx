import React, { useState } from 'react'
import {Box, Heading, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Stack} from '@chakra-ui/react'

const Signup = () => {
  
  return (
    <Stack spacing='4' maxW={'450px'} margin='auto' mt='9'>
        <Heading textAlign='center' mb='5'>Signup</Heading>
        <FormControl maxWidth='450px' textAlign={'left'} isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' placeholder='input your username' mb='5' />
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='input your email' mb='5' />
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='input your password' mb='5' />
            <Button colorScheme='twitter' size='sm' type='submit'>Signup</Button>
        </FormControl>
    </Stack>
  )
}

export default Signup


export const Login = () => {
    return(
        <>
            <Box maxWidth='400px'>
                <Heading mb='5'>Login</Heading>
                <FormControl textAlign={'left'} mb='4' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' placeholder='Please input your email' width='400px' mb='5' />
                     <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='Please input your password' mb='5' />
                    <Button colorScheme='twitter' size='sm'>Login</Button>
                </FormControl>

                <Text textAlign={'left'} >Don't have an account? Create account </Text>
            </Box>
        </>
    )
}