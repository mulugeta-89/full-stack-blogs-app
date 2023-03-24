import axios from 'axios';
import moment from 'moment';
import React, { useContext } from 'react'
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
const Write = () => {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser.ID)
  const state = useLocation().state
  const navigate = useNavigate()
  const [value, setValue] =useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || "")

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data

    } catch (err) {
      console.log(err)
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const imageUrl = await uploadImage()

  //   try {
  //     state
  //       ? await axios.put(`/posts/${state.id}`, {
  //           title,
  //           desc: value,
  //           image: file ? imageUrl : "",
  //           cat,
  //         })
  //       : await axios.post("/posts", {
  //           title,
  //           desc: value,
  //         image: file ? imageUrl : "",
  //           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //           cat,
            
  //       });
  //     navigate("/")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
   const handleClick = async (e) => {
     e.preventDefault();
     const imgUrl = await uploadImage();

     try {
       state
         ? await axios.put(`/posts/${state.id}`, {
             title,
             desc: value,
             cat,
             img: file ? imgUrl : "",
           })
         : await axios.post(`/posts`, {
             title,
             desc: value,
             image: file ? imgUrl : "",
             date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
             id: currentUser.ID,
             cat,
           });
       navigate("/");
     } catch (err) {
       console.log(err);
     }
   };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "art"}
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              checked={cat === "science"}
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "technology"}
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              checked={cat === "cinema"}
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              checked={cat === "design"}
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              checked={cat === "food"}
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write