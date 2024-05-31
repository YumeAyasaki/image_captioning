import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/captioning">Captioning</Link>
          </li>
          <li>
            <Link to="/ImageUploader">Image Uploader</Link>
          </li>
          <li>
            <Link to="/ImageViewer">Image Viewer</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;