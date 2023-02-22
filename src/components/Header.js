import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rounter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [listCate, setListCate] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLogin, setUserLogin] = useState([]);
  const getUserAPI = "https://dummyjson.com/products/categories";

  const searchProduct = () => {
    setKeyword(keyword);
  };
  useEffect(()=>{
    searchProduct();
  },[])

  const getCate = () => {
    axios
      .get(getUserAPI)
      .then((res) => {
        setListCate(res.data);
      })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
      });
  };
  useEffect(()=>{
    getCate();
  },[])

  const [mobileMenu, setMobileMenu] = useState(0);
  const handlerMobileMenu = show => {
    setMobileMenu(show);
  };

  return (
    <div className="header">
      <div className="container flexbox">
        <div className={`catenav ${mobileMenu === 1 ? 'show' : ''}`}>
          <div className="catenav_btn" onClick={() => handlerMobileMenu(1)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="catenav_close_btn" onClick={() => handlerMobileMenu(0)}>
            <i className="fa fa-close"></i>
          </div>
          <div className="catenav_list">
            {listCate.map((cate, index) => {
              return (
                <React.Fragment key={cate}>
                  <div className="catenav_listitem" onClick={() => handlerMobileMenu(0)}>
                    <Link to={`/cate/${cate}`}>{cate}</Link>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="search">
          <input type="text" name="keyword" className="search_tf" onChange={e => setKeyword(e.target.value)} />
          <Link to={`/search/` + keyword} className="search_btn">Search</Link>
        </div>
        <ul className="topmenu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header