// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import style from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={style.not_found_container}>
      <h1 className={style.h}>404</h1>
      <h2 className={style.hh}>Page Not Found</h2>
      <p className={style.p} >Oops! It seems like the page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className={style.home_link}>
        <button className={style.gawkgawk}>Return to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;