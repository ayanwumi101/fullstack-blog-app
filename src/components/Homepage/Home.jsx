import React, {useState, useEffect, useRef} from 'react'
import {Box, Text, Flex, Heading, } from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import bimb from '../../assets/bimbs.jpg'
import first from '../../assets/CODE.png'
import second from '../../assets/CODES.png'
import third from '../../assets/test.png'
import fourth from '../../assets/blog1.png'
import fifth from '../../assets/blog3.png'


const Home = () => {

  const [posts, setPosts] = useState([]);

   //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setPosts(items)});
      })
  }, [])


  return (
    <>
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
        {/* <SwiperSlide><img src={bimb} alt="post image" /></SwiperSlide> */}
        <SwiperSlide><img src={first} alt="" /></SwiperSlide>
        <SwiperSlide><img src={second} alt="" /></SwiperSlide>
        <SwiperSlide><img src={third} alt="" /></SwiperSlide>
        <SwiperSlide><img src={fourth} alt="" /></SwiperSlide>
        <SwiperSlide><img src={fifth} alt="" /></SwiperSlide>
      </Swiper>
    <Box>
       {/* <Heading as='h2' size='lg' textAlign={'center'} mt='6'>Welcome to EcoScribes</Heading> */}
       {<Flex flexWrap={'wrap'} justifyContent='space-between'>{posts.map((post) => <Card post={post} key={post.id} />)}</Flex>}
    </Box>
    </>
  )
}

export default Home