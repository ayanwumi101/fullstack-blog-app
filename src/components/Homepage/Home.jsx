import React, {useState, useEffect, useRef} from 'react'
import {Box, Text, Flex, Heading, Button} from '@chakra-ui/react'
import Card from '../Card/Card'
import {app} from '../../../firebaseConfig'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Link} from 'react-router-dom'
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
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([])
  const [postImages, setPostImages] = useState([])
  const [photoUrl, setPhotoUrl] = useState([]);
  const [postImage, setPostImage] = useState([]);

  //initialize firebase auth service
  const auth = getAuth();

   //initialize firestore
  const db = getFirestore();

  //get firestore storage
  const storage = getStorage();
  const imagesRef = ref(storage, 'images');
  const imageRef = ref(storage, 'post_images');

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      console.log(user);
      if(user){
        onSnapshot(q, (snapshot) => {
          let items = [];
          snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setPosts(items)});
        });
        console.log(posts);
      }
    });

    listAll(imagesRef).then((response) => {
      console.log(response);
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setPostImages((prev) => [...prev, url]);
        })
      })
    });

    listAll(imageRef).then((response) => {
      console.log(response);
      response.items.map((single) => {
        getDownloadURL(single).then((url) => {
          setPhotoUrl((prev) => [...prev, url]);
        })
      })
    });

    photoUrl.map((photo) => setPostImage(photo));
    console.log(postImage);
  }, [])

  return (
    <>
       {user ? <Box><Swiper
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
        
        {/* {postImages.map((slide, index) => <SwiperSlide key={index}><img src={slide} alt="" /></SwiperSlide> )} */}
        
      </Swiper>
    <Box>
       {<Flex flexWrap={'wrap'} justifyContent='space-between'>
            {posts.map((post) => <Card post={post} postImage={postImage} key={post.id} /> )}
            <img src={postImage} alt="" />
      </Flex>}
          <img src={postImage} />
    </Box></Box> : <Box textAlign='center' mt='100px'>
          <Text size={'xl'} mb='5'>Please Login or Create an account to view posts.</Text>
          <Link to='/login'><Button colorScheme='teal' size='sm'>Login <ExternalLinkIcon ml='1' /></Button></Link>
        </Box>}
    </>
  )
}

export default Home