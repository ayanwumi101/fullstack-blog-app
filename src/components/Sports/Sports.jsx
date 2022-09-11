import React, {useState, useEffect} from 'react'
import {Box, Flex, Heading} from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {query, getDocs, onSnapshot, collection, getFirestore, where} from 'firebase/firestore'

const Sports = () => {
  const [sports, setSports] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('post_category', '==', 'sports' ))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setSports(items);
        })
    })
  }, [])

  return (
    <Box>
      <Heading as='h2' size='md' textAlign={'center'} mt='3'>Sports</Heading>
      {<Flex flexWrap={'wrap'} justifyContent='space-between'>{sports.map((post) => <Card post={post} key={post.id} />)}</Flex>}
    </Box>
  )
}

export default Sports