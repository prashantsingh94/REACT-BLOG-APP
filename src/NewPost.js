export const NewPost = ({postTitle, postBody, setPostTitle, setPostBody, submitHandle}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={submitHandle}>
        <label htmlFor="title">Post Title</label>
        <input
          type="text"
          placeholder="Post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)} required />
          <textarea
          placeholder="Post Body"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required ></textarea>
          <button
          type="submit"
          >Submit Post</button>
      </form>
    </main>
  )
}

export default NewPost;
