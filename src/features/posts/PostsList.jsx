import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'
import Layout from '../../components/Layout'

export const PostsList = () => {
  const dispatch=useDispatch();
    const posts =useSelector(selectAllPosts)
    const postsStatus =useSelector(getPostsStatus)
    const error =useSelector(getPostsError)

    let content;
    if(postsStatus==='loading'){
      content=<p>loading...</p>
    }else if (postsStatus==='succeeded') {
      const orderedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
      content=orderedPosts.map(post=> <PostsExcerpt key={post.id} post={post}/>)
    }else if(postsStatus==='failed'){
      content= <p>{error}</p>
    }

  return (
    <>
    <Layout />
    <section>
        {content}
    </section>
    </>
  )
}

export default PostsList
