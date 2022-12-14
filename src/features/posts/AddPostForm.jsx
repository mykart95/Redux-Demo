import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/userSlice'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addReqStatus, setAddReqStatus]=useState('idle')
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const navigate=useNavigate()

    const canSave=[title, content, userId].every(Boolean) && addReqStatus ==='idle'

    
    const handlePost = () => {
        if(canSave){
            try {
                setAddReqStatus('pending')
                dispatch(addNewPost({title, body:content, userId})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')

            } catch (error) {
                console.log('failed to save the post', error);
            }finally{
                setAddReqStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <>
        <Layout />
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text"
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={(e)=>setUserId(e.target.value)}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content: </label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button 
                type='button' 
                onClick={handlePost}
                disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
        </>
    )
}
export default AddPostForm
