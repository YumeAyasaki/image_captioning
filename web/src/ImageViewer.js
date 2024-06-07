import React, { Component, useState } from 'react';
import {UserContext} from "./index.js";
import { useContext, useEffect } from "react";


/*function ImageDisplay(imagesObj) {
    return (
      ((typeof imagesObj !=='undefined' && typeof imagesObj.item !=='undefined')?
      <div>
        Object.keys(imagesObj.imagesObj.images).map((key) => (
        <img key={key} src={imagesObj.imagesObj.images[key].url} alt={`Image ${key}`} />
      ))
      </div> : null)
    );
  }
  */

function ImageDisplay(imagesObj) {
    if (imagesObj.imagesObj)
        {
            console.log ("FUCK ME");
            console.log (imagesObj.imagesObj);
        }
    return (
        <div>
        {imagesObj.imagesObj && Object.keys(imagesObj.imagesObj.images).map((key) => (
          <div key={key}>
        <img key={key} src={imagesObj.imagesObj.images[key].url} alt={`Image ${key}`} />
        <p>{imagesObj.imagesObj.images[key].annotation}</p>
        </div>
        ))}
      </div>
  );
  }
export default function ImageViewer() {
    const [images, setImages] = React.useState(null);
    const [error, setError] = React.useState(null);
    const {user, setUser} = useContext(UserContext);  
    
    //const response = fetch('/api/image/', {
    //    method: 'GET',
    //    headers,
    //  }).then ((response) => {response.json().then (result => {setImages(result);})});
    useEffect(()=>{
        const headers = new Headers();
        headers.append('Authorization',"Bearer " + user); // Add the Authorization token to the headers
        headers.append('Content-Type','application/json');
        console.log ("useEffect");
        console.log (user);
        const response = fetch('/api/image/', {
            method: 'GET',
            headers,
          }).then ((response) => {response.json().then (result => {console.log (images);setImages(result);console.log (images);})
        });
    }, []); 

    return (
      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            <ImageDisplay imagesObj = {images}/>
          </ul>
        )}
      </div>
    );
  }