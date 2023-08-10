import { Link } from "react-router-dom";
const Feed = ({posts}) => {
  return (
    <>
     {posts.map((post) => (
         <article key={post.id} className="post">
          <Link to={`post/${post.id}`}>
           <h2>{post.title}</h2>
             <p className="postDate">
              {post.datetime}
            </p>
          <p className="postBody">{
           (post.body).length <= 100
            ? post.body
            :`${(post.body).slice(0 , 100)}...`
          }
            </p>
          </Link>
         </article>
    ))}
    </>
  )
}

export default Feed;