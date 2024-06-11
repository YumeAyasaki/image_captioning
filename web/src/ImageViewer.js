import React, { Component, useState } from 'react';
import {UserContext} from "./index.js";
import { useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import {Link} from 'react-router-dom';

function ImageDisplay(imagesObj) {
    if (imagesObj.imagesObj)
        {
            //console.log ("FUCK ME");
            //console.log (imagesObj.imagesObj); 
        }
    var nigger = "";
    return (
        <div style = {{display: "ruby", width: "100%"}}>
        {
          imagesObj.imagesObj && 
          Object.keys(imagesObj.imagesObj.images).map((key) => (
          // + imagesObj.imagesObj.images[key].id
          <div style = {{ "padding": "1vh 1vw 1vh 1vw"}}>
          <div style = {{"display": "none"}}>{nigger = "//" + window.location.host.split('/')[0] + "/api/image/" + imagesObj.imagesObj.images[key].id + "/"}</div>
          <a href = {nigger} style = {{width: "auto", "minWidth": "0"}} key={key}>
            {console.log (imagesObj.imagesObj.images[key].annotation)}
            <img class = "imgBig" key={key} src={imagesObj.imagesObj.images[key].url} alt={`Image ${key}`} />
            <p>{imagesObj.imagesObj.images[key].annotation + ","}</p>
          </a>
          </div>
        ))
        }
      </div>
  );
  }
export function ImageViewer() {
    const [images, setImages] = React.useState(null);
    const [error, setError] = React.useState(null);
    const {user, setUser} = useContext(UserContext);  
    console.log ("ImageViewer, current User API key: ", user);
    
    useEffect(()=>{
        const headers = new Headers();
        headers.append('Authorization',"Bearer " + user); // Add the Authorization token to the headers
        headers.append('Content-Type','application/json');
        const response = fetch('/api/image/', {
            method: 'GET',
            headers,
          }).then ((response) => {response.json().then (result => {setImages(result);})
        });
    }, []); 

    return (
      <div class = "paddingBothSide paddingTop">
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            <ImageDisplay imagesObj = {images}/>
          </ul>
        )}
        {(!images || !images.imagesObj)? <><p> Hình như không có ảnh nào ở đây hết </p> <Link to='/ImageUploader'> Bấm để qua trang upload ảnh </Link> </> : null}
      </div>
    );
  }

  export function SingleImageViewer ()
  {
 
    const [image, setImage] = React.useState('');
    const [SvMsg, setSvMsg] = React.useState('');
    const [error, setError] = React.useState(null);
    const {user, setUser} = useContext(UserContext);
    console.log ("Current User API key: ", user);
    const navigate = useNavigate();
    const DeleteImageAPI = async () => {
      console.log ("DeleteImageApi");
      try {
        const headers = new Headers();
        headers.append('Authorization',"Bearer " + user); // Add the Authorization token to the headers
        headers.append('Content-Type','application/json');

        const response = await fetch("//" + window.location.host.split('/')[0] + '/api/image/delete/' + window.location.href.split('#').shift().split('?').shift().replace(/\/$/, '').split('/').pop() + "/", {
          method: 'DELETE', 
          headers,
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
    
        const data = await response.json();
        setSvMsg (data.msg);
        console.log('API response:', data); // Handle the API response as needed
        setTimeout(function() {
          navigate("/ImageViewer");
        }, 3000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    //const imgUrl = "//" + window.location.host.split('/')[0] + '/api/image/' + window.location.href.split('#').shift().split('?').shift().replace(/\/$/, '').split('/').pop();
    const imgUrl = ('/api/image/' + window.location.href.split('#').shift().split('?').shift().replace(/\/$/, '').split('/').pop() + "/");
    //const img = fetch (imgUrl).then ((response) =>{return response.json().then  ((response) => {console.log (response); return response;})});
    console.log ("Gay",imgUrl);   
    useEffect(()=>{
        const headers = new Headers();
        headers.append('Authorization',"Bearer " + user); // Add the Authorization token to the headers
        headers.append('Content-Type','application/json');
        const response = fetch(('/api/image/' + window.location.href.split('#').shift().split('?').shift().replace(/\/$/, '').split('/').pop() + "/"), {
            method: 'GET',
            headers,
          } 
        ).then ((response) => {response.json().then (result => {console.log ("useEffect: ",image); console.log (result);setImage(result);})
        }); 
    }, []); 
    return (
      <div className = "paddingBothSide paddingTop">
        <button onClick={() => DeleteImageAPI({})}>Delete Image</button> 
        {SvMsg}
        <img src = {image && image.image.image_file}></img> 
        {!image ? <> <p> Có thể ảnh không còn tồn tại nữa </p> <Link to='/ImageViewer'> Bấm để về trang thư viện ảnh</Link> </> : null}
      </div>
      );
  }