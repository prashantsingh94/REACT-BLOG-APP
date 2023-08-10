import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
const EditPost = ({posts, editPostTitle, editPostBody, setEditPostTitle, setEditPostBody, editHandle}) => {
 const { id } = useParams();
 const post = posts.find((post) => post.id == id)
 //console.log("Edit Post Fetched:", post);
 useEffect(() => {
   if(post){
    setEditPostTitle(post.title);
    setEditPostBody(post.body)
   }
 }, [])
  return (
  <main className="NewPost">
  { editPostTitle &&
   <>
    <h2>Edit Post</h2>
  <form className="newPostForm" onSubmit={(e) => e.preventDefault() }>
    <label htmlFor="postTitle">Post Title</label>
    <input
      type="text"
      id="postTitle"
      placeholder="Post Title"
      value={editPostTitle}
      onChange={(e) => setEditPostTitle(e.target.value)} required />
      <textarea
      id="postBody"
      placeholder="Post Body"
      value={editPostBody}
      onChange={(e) => setEditPostBody(e.target.value)}
      required ></textarea>
      <button
      type="button" onClick={() => editHandle(post.id)}
      >Submit Post</button>
  </form>
   </>
   }
   {!editPostTitle &&
    <> <p>Post Not Found</p>
    <p>Well, that's disapointing!</p>
    <p>
      <Link to="/">Visit Our Home Page.</Link>
    </p></>}
</main>
 )
}


export default EditPost