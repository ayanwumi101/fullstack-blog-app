import React from 'react'
import {Box, Flex, Heading} from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {query, onSnapshot, collection, getFirestore, where, orderBy} from 'firebase/firestore'

const Education = () => {

  const [education, setEducation] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('post_category', '==', 'Education' ), orderBy('createdAt'));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setEducation(items);
        })
    })
  }, [])

  return (
     <Box>
      <Heading as='h2' size='md' textAlign={'center'} mt='3'>Education</Heading>
      {<Flex flexWrap={'wrap'} justifyContent='space-between'>{education.map((post) => <Card post={post} key={post.id} />)}</Flex>}
    </Box>
  )
}

export default Education