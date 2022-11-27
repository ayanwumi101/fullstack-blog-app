import React, { useState, useEffect } from 'react'
import { FaImage } from 'react-icons/fa'
import { app } from '../../../firebaseConfig'
import { getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import '../Posts/modal.css'


const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const db = getFirestore();
  const colref = collection(db, 'posts');

  const storage = getStorage();
  const doc_id = v4();
  


  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && authorName && date && content && image) {
      setLoading(true);
      addDoc(colref, {
        author_name: authorName,
        post_title: title,
        post_category: category,
        date: date,
        post_content: content,
        post_id: doc_id,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          setAuthorName('')
          setCategory('')
          setContent('')
          setDate('')
          setTitle('')
          navigate('/home')
        });

      const imageRef = ref(storage, `post_images/${doc_id}`);
      uploadBytes(imageRef, image).then(() => {
        console.log('image uploaded');
      });

    } else {
      console.log('error');
    }

  }

  return (
    <div className='max-w-[400px] mx-auto mt-5 mb-5'>
        <h3 className='text-center text-xl font-bold'>Create New Post</h3>
        <div>
          <form action="">
            <div className='w-full mb-5 mt-5'>
              <label htmlFor="">Post Title</label>
            <input type="text" className='px-3 py-1 text-sm w-full border-2 rounded border-black' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Post Title' />
            </div>

            <div className='w-full mb-5 mt-5'>
              <label htmlFor="upload">Upload Image</label>
              <input type="file" id='upload' className=' w-full' onChange={(e) => setImage(e.target.files[0])} />
              <p>{image && image.name}</p>
            </div>

            <div className='w-full mb-5 mt-5'>
              <label htmlFor="">Author's Name</label>
              <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className='px-3 py-1 text-sm w-full border-2 rounded border-black' placeholder='Authors name' />
            </div>

            <div className='w-full mb-5 mt-5'>
              <label htmlFor="">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='px-3 py-1 text-sm w-full border-2 rounded border-black' />
            </div>
           

            <div className='w-full mb-4'>
              <label htmlFor="">Post Content</label>
              <ReactQuill theme='snow' modules={modules} dangerouslySetInnerHTML={{ __html: content }} onChange={setContent} />
            </div>

          <button className='bg-indigo-500 rounded w-full py-1 px-2 text-white' type='submit' onClick={handleSubmit}>Publish Post</button>

          </form>
        </div>
    </div>
  )
}

export default CreatePost