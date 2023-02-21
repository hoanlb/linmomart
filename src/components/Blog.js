import React, { useEffect, useState } from 'react';
import { Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import Lodash from "lodash";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [mergedList,setMergedList] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts?limit=150`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, [])

  useEffect(() => {
    fetch(`https://dummyjson.com/comments?limit=340`)
      .then((res) => res.json())
      .then((data) => {
        data = Lodash.groupBy(data.comments, item => item.postId);
        const dataArray = Object.keys(data).map(key => ({ key, list: data[key] }))
        setComments(dataArray);
      });
  }, [])

  useEffect(()=>{
    const merged = Lodash.merge(Lodash.keyBy(comments,'key'), Lodash.keyBy(posts,'id'));
    const values = Lodash.values(merged);
    setMergedList(values);
  },[posts, comments])

  return (
    <div className="blog">
      <div className="container">
        <div className="blogs">
          {mergedList?.map((post, index) => {
            return (
              <div className="blog" key={post.id}>
                <div className="blog_name">{post.title}</div>
                <div className="blog_desc">{post.body}</div>
                {post.list?.map((comment, index) => {
                  return (
                    <div className="comments" key={comment.id}>
                      <div className="comment">{comment.body} - <i>{comment.user.username}</i></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog