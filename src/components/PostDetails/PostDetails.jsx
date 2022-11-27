import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {app} from '../../../firebaseConfig'
import {getFirestore, collection, getDocs,} from 'firebase/firestore'
import {getStorage, ref, getDownloadURL, listAll} from 'firebase/storage'
// import '../Posts/modal.css'


const PostDetails = () => {
  const [post, setPost] = useState();
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(true);

   //initialize firestore
  const db = getFirestore();
  const storage = getStorage();
  const imageRef = ref(storage, 'post_images');

  //collection reference 
  const colref = collection(db, 'posts');
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    getDocs(colref).then((snapshot) => {
      let items = [];
      snapshot.docs.map((doc) => {
        items.push({...doc.data(), id: doc.id})
        const newPost = items.find((post) => post.id === id);
        return setPost(newPost);
      })
    });
  }, []); 

  useEffect(() => {
    const getImage = async () => {
      await listAll(imageRef).then( async (response) => {
        console.log(response.items);
        const photo = response.items.find((item) => item.name === post.post_id);
        console.log(photo.name, post.post_id);
        await getDownloadURL(photo).then((url) => {
            setLoading(false);
            setNewImage(url);
        });
      })
    };

   if(post){
    getImage();
   }

  }, [post]);

  return (
    <div className='mb-5'>
      <div><img src={newImage ? newImage : 'Loading'} alt="" className='w-full h-[500px]' /></div>
      <div className='mt-5'>
        <h2 className='text-center font-bold text-xl'>{post && post.post_title}</h2>
        <p className='text-center text-sm'>Author: <strong>{post && post.author_name}</strong></p>
        <p className='text-center text-sm'>Date Posted: <strong>{post && post.date}</strong></p>
        <div className='p-8' dangerouslySetInnerHTML={{ __html: post && post.post_content }}></div>
      </div>
      <Link to='/home' className='ml-8 bg-gray-600 py-1 px-2 rounded text-white'><button>Go back</button></Link>
    </div>
  )
}

export default PostDetails