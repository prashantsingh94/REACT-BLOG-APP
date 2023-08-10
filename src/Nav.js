import { Link } from "react-router-dom";
export const Nav = ({search, setSearch}) => {
  return (
      <nav className="Nav">
      <form className="searchForm">
        <input
          type="text"
          placeholder="Search post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="post">Post</Link></li>
      </ul>
      </nav>
  )
}

export default Nav;
