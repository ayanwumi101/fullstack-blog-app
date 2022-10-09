import React, {useState, useEffect} from 'react'
import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react'
import Card from '../Card/Card'
import { app } from '../../../firebaseConfig'
import { query, getDocs, onSnapshot, collection, getFirestore, where, orderBy } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import first from '../../assets/CODE.png'
import second from '../../assets/CODES.png'
import third from '../../assets/test.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Tech = () => {
  const [tech, setTech] = useState([]);
  const [user, setUser] = useState([])
  const db = getFirestore();
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('post_category', '==', 'Tech'),)
  const auth = getAuth();

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let items = [];
      snapshot.docs.map((doc) => {
        items.push({ ...doc.data(), id: doc.id });
        return setTech(items);
      })
    });

    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  return (
      <>
        {user ? <>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src={first} alt="" /></SwiperSlide>
            <SwiperSlide><img src={second} alt="" /></SwiperSlide>
            <SwiperSlide><img src={third} alt="" /></SwiperSlide>
          </Swiper>
          <Heading as='h2' size='lg' position={'relative'} top='50%' textAlign={'center'} mt='3' textDecoration={'underline'}>Tech News</Heading>
          <Box>
            {<Flex flexWrap={'wrap'} justifyContent='space-between'>{tech.map((post) => <Card post={post} key={post.id} />)}</Flex>}
          </Box></> : <Box textAlign='center' mt='100px'>
          <Text size={'xl'} mb='5'>Please Login or Create an account to view posts.</Text>
          <Link to='/login'><Button colorScheme='teal' size='sm'>Login <ExternalLinkIcon ml='1' /></Button></Link>
        </Box>}
      </>
  )
}

export default Tech