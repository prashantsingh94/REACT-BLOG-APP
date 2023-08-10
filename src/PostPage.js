import { useParams, Link } from "react-router-dom";

const PostPage = ({posts, handleDelete}) => {
  let { id } = useParams();
  let postData = posts.find((post) => (post.id).toString() === id );
  return (
    <main className="PostPage">
      <h1>{postData.title}</h1>
      <p className="postDate">{postData.datetime}</p>
      <p className="postBody">{postData.body}</p>
      <Link to={`/edit/${postData.id}`}>
      <button
       type="button"
       className="editButton"
       >Edit Post</button>
      </Link>
      <button

       className="deleteButton"
       onClick={() => handleDelete(postData.id)}
       >Delete Post</button>
    </main>

  )
}

export default PostPage;
