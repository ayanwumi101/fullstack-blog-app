import React, {useState, useEffect} from 'react'
import {Box, Flex, Heading} from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {query, getDocs, onSnapshot, collection, getFirestore, where, orderBy} from 'firebase/firestore'
import first from '../../assets/CODE.png'
import second from '../../assets/CODES.png'
import third from '../../assets/test.png'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";


const Sports = () => {
  const [sports, setSports] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, 'posts');
  const q = query(colRef, where('post_category', '==', 'sports' ), )

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
        <SwiperSlide><img src={first} alt="" /></SwiperSlide>
        <SwiperSlide><img src={second} alt="" /></SwiperSlide>
        <SwiperSlide><img src={third} alt="" /></SwiperSlide>
        {/* <SwiperSlide><img src={fourth} alt="" /></SwiperSlide>
        <SwiperSlide><img src={fifth} alt="" /></SwiperSlide> */}
      </Swiper>
      <Heading as='h2' size='md' position={'relative'} top='50%' textAlign={'center'} mt='3'>Sports</Heading>
    <Box>
      {<Flex flexWrap={'wrap'} justifyContent='space-between'>{sports.map((post) => <Card post={post} key={post.id} />)}</Flex>}
    </Box>
    </>
  )
}

export default Sports