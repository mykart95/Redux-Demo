import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { selectAllPosts } from '../posts/postsSlice'
import { seletUserById } from './userSlice'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => seletUserById(state, Number(userId)))
    const postsForUser = useSelector(state => {
        const allPost = selectAllPosts(state)
        return allPost.filter(post => post.userId === Number(userId))
    })
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
    return (
        <>
        <Layout />
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {postTitles}
            </ol>
        </section>
        </>
    )
}

export default UserPage