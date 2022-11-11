import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllUsers } from '../users/userSlice'
import { deletePost, selectPostById, updatePost } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate=useNavigate()
  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');
  const dispatch = useDispatch()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

  const handelSavePost =()=>{
    if(canSave){
      try {
        setRequestStatus('pending')
        dispatch(updatePost({id:post.id, title, body: content, userId, reactions:post.reactions})).unwrap()
        
        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (error) {
        console.error('failed to save');
      }finally{
        setRequestStatus('idle')
      }
    }
  }
  const userOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >{user.name}</option>
  ))

  const handleDelete =()=>{
    try {
      setRequestStatus('pending')
      dispatch(deletePost({id:post.id})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
    } catch (error) {
      console.error('failed to delete:', error);
    }finally{
      setRequestStatus('idle')
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type='text'
          id="postTitle"
          name='postTitle'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select  id="postAuthor" defaultValue={userId} onChange={(e)=>setUserId(Number(e.target.value))}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
            id='postContent'
            name='postContent'
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            />
            <button type='button' onClick={handelSavePost} disabled={!canSave}>
              Save Post
            </button>
            <button className='deleteButton' type='button' onClick={handleDelete}>
              Delete Post
            </button>
      </form>
    </section>
  )
}

export default EditPostForm