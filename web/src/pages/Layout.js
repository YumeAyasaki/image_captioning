import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav style = {{"margin":"10vh 15vw"}}>
        <ul style={{"list-style-type": "none"}}>
          <li style={{"padding":"1vh 1vw"}}> 
            <button><Link style={{"font-size":"2vh", "padding":"0 0.5vw", "text-decoration": "inherit"}} to="/register"> Đăng ký </Link></button>
          </li>
          <li  style={{"padding":"1vh 1vw"}}>
          <button><Link style={{"font-size":"2vh", "padding":"0 0.5vw", "text-decoration": "inherit"}} to="/captioning"> Chú thích ảnh </Link></button>
          </li>
          <li  style={{"padding":"1vh 1vw"}}>
          <button><Link style={{"font-size":"2vh", "padding":"0 0.5vw", "text-decoration": "inherit"}} to="/ImageUploader"> Đăng ảnh </Link></button>
          </li> 
          <li  style={{"padding":"1vh 1vw"}}>
          <button><Link style={{"font-size":"2vh", "padding":"0 0.5vw", "text-decoration": "inherit"}} to="/ImageViewer"> Xem ảnh </Link></button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;