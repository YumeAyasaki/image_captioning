import React, { useState } from 'react';
import {UserContext} from ".././index.js";
import { useContext } from "react";
import {Link} from 'react-router-dom';
import Navigation from '.././components/Navigation';
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function ImageUploader() {
    const {user, setUser} = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(['']);
  const [serverResponse, setServerResponse] = useState('');
  //console.log (user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleInfoChange = (event, index) => {
    const tempInfo = [...additionalInfo];
    tempInfo[index] = event.target.value;
    setAdditionalInfo(tempInfo);
  };
  const addCaptionBox = () => {
    setAdditionalInfo([...additionalInfo, '']);
  }
  const removeCaptionBox = () => {
    const tempInfo = additionalInfo;
    tempInfo.pop();
    setAdditionalInfo([...tempInfo]);
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      setServerResponse('Chọn ảnh trước.');
      return;
    }
    if (additionalInfo.length == 0) {
      setServerResponse('Thêm ít nhất một câu caption cho ảnh.');
      return;
    }
    try {
      setServerResponse ('');
      var reader = new FileReader();
        var base64data = await (blobToBase64(selectedImage))
      console.log (base64data);
      const dataToSend = {
        image: selectedImage,
        image_file: base64data,
        url: base64data,
        title: 'testImage',
        annotation: additionalInfo
      };

      const headers = new Headers();
      headers.append('Authorization',"Bearer " + user); // Add the Authorization token to the headers
      headers.append('Content-Type','application/json'); 

      const response = await fetch('/api/image/add/', {
        method: 'POST',
        body: JSON.stringify(dataToSend), // Convert the object to a JSON string
        headers,
      });

      if (response.ok) {
        //alert('Image uploaded successfully!');
        const data = await response.json();
        setServerResponse(data.msg);
        // Handle any further actions after successful upload
      } else {
        //alert('Error uploading image. Please try again later.');
        const data = await response.json();
        setServerResponse(data.msg);
        console.log ("Error: ", data);
        console.log (data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div><Navigation />
    <div className = "paddingBothSide paddingTop mediumText">
      
      <div style = {{"width": "100%"}}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div style = {{"width": "100%"}}>
        {additionalInfo.map ((info, index) => (
        <input
          type="text"
          placeholder="Miêu tả ảnh"
          value={info}
          onChange= {(event) => handleInfoChange (event, index)} //{handleInfoChange}
        />
        ))}
      </div>
      <div style = {{"width": "100%", "margin-left":"0.2vw", "margin-top":"0.5vh"}}>
        <button onClick={addCaptionBox}> Thêm chú thích </button>
        <button style = {{"margin-left":"0.2vw"}} onClick={removeCaptionBox}> Xóa chú thích </button>   
      </div>     
      <div style = {{"width": "100%", "margin-left":"0.2vw", "margin-top":"0.5vh"}}>
        <button onClick={handleUpload}> Đăng ảnh và các chú thích </button>
      </div>     
      <div style = {{"width": "100%", "margin-left":"0.2vw", "margin-top":"0.5vh"}}>
        {serverResponse? <p style = {{"padding-left": "0.3vw"}}> Phản hồi từ server: {serverResponse}</p> : null}
      </div>     
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected Image Preview"
          style={{ width: 'auto', maxHeight: '50vh', marginTop: '2vh' }}
        />
      )}
    </div>
    </div>
  );
}

export default ImageUploader;