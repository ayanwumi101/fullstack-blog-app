import React, {useEffect, useState} from 'react'
import {Box, Avatar, AvatarBadge, Heading, Text, HStack, Container, Button } from '@chakra-ui/react'
import {app} from '../../../firebaseConfig'
import {getAuth} from 'firebase/auth'
import {getDoc, doc, getFirestore} from 'firebase/firestore'
import {getStorage, ref, getDownloadURL} from 'firebase/storage'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [bio, setBio] = useState([])
  const [avatar, setAvatar] = useState('');
  const auth = getAuth();

  //init firebase storage
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setUserProfile(user)   
        if(user){
            const db = getFirestore();
            const storage = getStorage();
            const avatarRef = ref(storage,user.uid);
            const docRef = doc(db, "user_info", user.uid);

            getDownloadURL(avatarRef).then((url) => {
              setAvatar(url);
            });

            getDoc(docRef).then((doc) => {
              console.log(doc.data());
            });
        }
    });
  }, [])

  return (
    <>
        {userProfile ? <Box maxW={'400px'} p='3' margin={'auto'} mt='4'>
            <Box textAlign={'center'} mb='9'>
              <Avatar size='xl' src={avatar}>
                <AvatarBadge bg='green.500' boxSize='7' />
              </Avatar>
            </Box>

            <Box maxW={'400px'}>
              <HStack mb='4' spacing={'3'}>
              <Text>Username:</Text>
              <Heading size='sm'>Ayanwumi Abdulroheem Tunde</Heading>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text>Email:</Text>
              <Heading size='sm'>{userProfile.email}</Heading>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text>Membership Status:</Text>
              <Heading size='sm'>User</Heading>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text>Status: </Text>
              <Heading size='sm'>Online</Heading>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text>Verification Status:</Text>
              <Heading size='sm'>Unverified</Heading>
            </HStack>
            {/* <HStack mb='4' spacing={'3'}>
              <Text>Signup Date:</Text>
              <Heading size='sm'>{userProfile.metadata.creationTime}</Heading>
            </HStack> */}
            </Box>
          
        </Box> : <Box textAlign='center' mt='100px'>
          <Text size={'xl'} mb='5'>Please Login or Create an account to view your profile.</Text>
          <Link to='/login'><Button colorScheme='teal' size='sm'>Login <ExternalLinkIcon ml='1' /></Button></Link>
        </Box>}
    </>
  )
}

export default Profile
