import React, {useState, useEffect, useRef} from 'react'
import {Box, Text, Flex, Heading, Button, Spinner, Image} from '@chakra-ui/react'
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
import { ExternalLinkIcon } from '@chakra-ui/icons'
import '../Posts/modal.css'


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([])
  const [postImages, setPostImages] = useState([])

  //initialize firebase auth service
  const auth = getAuth();

   //initialize firestore
  const db = getFirestore();

  //get firestore storage
  const storage = getStorage();
  const imagesRef = ref(storage, 'post_images');

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
            setLoading(false);
            return setPosts(items);
          });
        });
      }
    });

    listAll(imagesRef).then((response) => {
      console.log(response);
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setLoading(false);
          setPostImages((prev) => [...prev, url]);
        })
      })
    });
    
  }, [])

  return (
    <>
       {user ? 
       <Box>
          {loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' ml='50%' mt='7%' color='blue.500' size='lg' /> :
            <Swiper spaceBetween={30} centeredSlides={true}
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
              {postImages.map((slide, index) => <SwiperSlide key={index}><Image src={slide} alt="" className='post_images' /></SwiperSlide>)}
            </Swiper>}
       <Box>
          {loading ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' ml='50%' mt='17%' color='blue.500' size='lg' /> :
          <>
            <Heading textAlign={'center'} mt='5' mb='3'>EcoScribes' News</Heading>
            <Text textAlign={'center'} mb='5' fontSize={'lg'}>Find the latest News and gist for different categories and from different parts of the world.</Text>
            <Flex flexWrap={'wrap'} justifyContent='space-between'>
                {posts.map((post) => <Card post={post} key={post.id} /> )}
            </Flex>
          </>
        }  
      </Box>
      </Box> : <Box textAlign='center' mt='100px'>
            <Text size={'xl'} mb='5'>Please Login or Create an account to view posts.</Text>
            <Link to='/login'><Button colorScheme='teal' size='sm'>Login <ExternalLinkIcon ml='1' /></Button></Link>
      </Box>}
    </>
  )
}

export default Home