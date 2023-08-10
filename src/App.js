import Layout from './Layout';
import Home from './Home';
import About from './About';
import Missing from './MissingPage';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {format} from 'date-fns';
import api from './api/posts';
function App() {
  const [search, setSearch] = useState('');

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostBody, setEditPostBody] = useState('')
  let navigate = useNavigate();

  const handleDelete = async (id) => {
   await api.delete(`/posts/${id}`);
   setPosts(posts.filter((post) => post.id !== id));
   navigate("/");
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    let id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    let datetime = format(new Date(), "MMMM dd, yyyy pp")
    let newPostItem = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }
    try{
     const response = await api.post('/posts', newPostItem);
    let postsListItems = [...posts, response.data];
    setPosts(postsListItems);
    console.log(postsListItems);
    console.log(newPostItem);
    setPostTitle("");
    setPostBody("");
    navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`)
    }
  }

  const editHandle = async (id) => {
   const datetime = format(new Date(), "MMMM dd, yyyy pp");
   const updatedPostItem = {id, datetime, title: editPostTitle, body: editPostBody}
   try {
    const response = await api.put(`posts/${id}`, updatedPostItem);
    console.log(response.data);
    setPosts(posts.map(post => post.id === id ? response.data  : post));
    setEditPostTitle('');
    setEditPostBody('');
    navigate("/");
   } catch (err) {
    console.log(`Error : ${err.message}`)
   }
  }

  useEffect(() => {
    const fetchPosts = async () => {
          try{
            const response = await api.get('/posts');
            if(response && response.data) setPosts(response.data)
            console.log(response)
          } catch(err) {
            if (err.response) {
              // Not in the 200 response range
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            } else {
              console.log(`Error: ${err.message}`);
            }
          }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    let filteredPosts = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(filteredPosts.reverse());
  }, [posts, search])

  return (
 <Routes>
      <Route path="/" element={<Layout
         search={search}
         setSearch={setSearch} />}>
       <Route index element={<Home posts={searchResults} />} />
       <Route path="post" >
       <Route index element={<NewPost
               postTitle={postTitle}
               setPostTitle={setPostTitle}
               postBody={postBody}
               setPostBody={setPostBody}
               submitHandle={submitHandle}
               />} />
      <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
      </Route>
      <Route path="/edit/:id" element={<EditPost
      posts={posts}
      editPostTitle={editPostTitle}
      setEditPostTitle={setEditPostTitle}
      editPostBody={editPostBody}
      setEditPostBody={setEditPostBody}
      editHandle={editHandle}
      />} />
       <Route path="about" element={<About />} />
       <Route path='*' element={<Missing />} />
       </Route>
     </Routes>

  );
}

export default App;
