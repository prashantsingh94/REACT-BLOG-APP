import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
const Layout = ({search, setSearch}) => {
  return (
    <div className="App">
      <Header title="Social Blog App" />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
     </div>
  )
}

export default Layout;
