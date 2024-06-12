// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}> Trang chủ </Link>
        </li>
        <li style={styles.li}>
          <Link to="/register" style={styles.link}> Đăng ký </Link>
        </li>
        <li style={styles.li}>
          <Link to="/captioning" style={styles.link}> Chú thích ảnh </Link>
        </li>
        <li style={styles.li}>
          <Link to="/ImageUploader" style={styles.link}> Đăng ảnh </Link>
        </li>
        <li style={styles.li}>
          <Link to="/ImageViewer" style={styles.link}> Xem ảnh </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: '#333',
    padding: '1em 1em 1em 15em'
  },
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex'
  },
  li: {
    margin: '0 1em'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default Navigation;
