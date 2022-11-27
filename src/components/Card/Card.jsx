import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { ref, getStorage, getDownloadURL, listAll } from 'firebase/storage'
import {query, collection, where, getFirestore, onSnapshot} from 'firebase/firestore'


const Card = ({post}) => {
  const { author_name, post_title, date, post_content, post_category, id, post_id } = post;
  const [mainImage, setMainImage] = useState([]);
  const [newImage, setNewImage] = useState('')

  //init firebase storage
  const storage = getStorage();
  const imageRef = ref(storage, 'post_images');

  //init firestore database
  const db = getFirestore();
  const colRef = collection(db, 'posts');


  useEffect(() => {
    //fetching the images
    listAll(imageRef).then((response) => {
      const items = response.items.find((item) => item.name === post_id);
      getDownloadURL(items).then((url) => {
        console.log(url);
        setNewImage(url)
      });
    })
  }, []);


  return (
      <div className='mt-5 w-64'>
        <div className='bg-gray-300 rounded-lg shadow-lg h-fit pb-3'>
          <div className='w-64'>
            <img src={newImage} alt="" className='w-full h-52 rounded' />
          </div>
          <div className="content p-2">
            <h3 className='text-xl font-bold text-center'>{post_title}</h3>
            <div className='text-justify text-sm mb-2' dangerouslySetInnerHTML={{ __html: post_content.substring(0, 80) + ' ......' }}></div>
            <p className='text-sm font-medium'>By: {author_name}</p> 
          </div>
          <Link to={`/posts/${id}`} className='bg-indigo-500 ml-2 text-sm px-3 py-1 rounded text-white'><button>Read more..</button></Link>
        </div>
    </div>
  )
}

export default Card
