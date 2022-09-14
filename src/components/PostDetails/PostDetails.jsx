import React, {useState, useEffect} from 'react'
import {Box} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, query, onSnapshot} from 'firebase/firestore'

const PostDetails = () => {
  const [posts, setPosts] = useState([]);
  // const [singlePost, setSinglePost] = useState([])
   //initialize firestore
  const db = getFirestore();

  //collection reference 
  const colref = collection(db, 'posts');
  const q = query(colref);
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.docs.map((doc) => {
          items.push({...doc.data(), id: doc.id});
          return setPosts(items)});
      });

      const newPost = posts.filter((item) => item.id === id);
      console.log(newPost);
      setPosts(newPost);

  }, []); 

  console.log(posts);

    // const [newPost, setNewPost] = useState();
  return (
    <div>
      {/* {posts.find((post) => post.id === parseInt(id))} */}
    </div>
  )
}

export default PostDetails