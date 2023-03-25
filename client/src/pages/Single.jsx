import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../pages/menu'
import moment from "moment"
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const Single = () => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext)
  var [body, setBody] = useState("")

  const locat = useLocation();
  const navigate = useNavigate();
  const id = locat.pathname.split("/")[2]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
        setBody(res.data.desc)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  body = body.slice(0, 500);

 

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} />}
          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {post.username === currentUser.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} />
              </Link>
              <img onClick={handleDelete} src={Delete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Single