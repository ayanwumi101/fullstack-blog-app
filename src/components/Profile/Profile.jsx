import React, {useEffect, useState} from 'react'
import {Box, Avatar, AvatarBadge, Heading, Text, HStack, Container, Button } from '@chakra-ui/react'
import {app} from '../../../firebaseConfig'
import {getAuth} from 'firebase/auth'
import {getFirestore, query, where, getDocs, collection} from 'firebase/firestore'
import {getStorage, ref, getDownloadURL} from 'firebase/storage'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [userBio, setUserBio] = useState()
  const [avatar, setAvatar] = useState('');
  const auth = getAuth();


  //init firebase storage
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setUserProfile(user);
        const db = getFirestore();
        const storage = getStorage();
        const avatarRef = ref(storage, user.uid);
        const userRef = collection(db, 'userData');
        const q = query(userRef, where('user_id', '==', user.uid));  
        
      const getBio = async () => {
        await getDocs(q).then(async (snapshot) => {
          let user_data = [];
          snapshot.docs.map((item) => {
            user_data.push({ ...item.data(), id: item.id });
            return setUserBio(user_data);
          })
        });
      }

        if(user){
            getDownloadURL(avatarRef).then((url) => {
              setAvatar(url);
            });
          getBio();
        }
    });
  }, []);


  return (
    <>
        {userProfile ? <Box maxW={'350px'} p='3' margin={'auto'} mt='4'>
            <Box textAlign={'center'} mb='9'>
              <Avatar size='xl' src={avatar}>
                <AvatarBadge bg='green.500' boxSize='7' />
              </Avatar>
            </Box>

          <Box maxW={'350px'}>
            <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Username:</Text>
            <Text>{userBio ? userBio[0].user_name : ''}</Text>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Bio:</Text>
              <Text size='sm'>{userBio ? userBio[0].user_bio : ''}</Text>
            </HStack>
             <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Status: </Text>
              <Text size='sm'>Online</Text>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Email:</Text>
              <Text size='sm'>{userProfile.email}</Text>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Membership Status:</Text>
              <Text size='sm'>User</Text>
            </HStack>
            <HStack mb='4' spacing={'3'}>
              <Text fontWeight={'medium'}>Verification Status:</Text>
              <Text size='sm'>Unverified</Text>
            </HStack>
          </Box>
          
        </Box> : <Box textAlign='center' mt='100px'>
          <Text size={'xl'} mb='5'>Please Login or Create an account to view your profile.</Text>
          <Link to='/login'><Button colorScheme='teal' size='sm'>Login <ExternalLinkIcon ml='1' /></Button></Link>
        </Box>}
    </>
  )
}

export default Profile
