import React, { useState } from 'react';
import {UserContext} from "./index.js";
import { useContext } from "react";

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
  console.log (user);

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

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }
    try {
      //const formData = new FormData();
      //formData.append('image', selectedImage);
      //formData.append('additionalInfo', additionalInfo);
      var reader = new FileReader();
      //reader.readAsDataURL(selectedImage); //URL.createObjectURL (selectedImage)
      //reader.onloadend = function() {
        var base64data = await (blobToBase64(selectedImage))
      //url: URL.createObjectURL (selectedImage)
      console.log (base64data);
      const dataToSend = {
        image: selectedImage,
        image_file: base64data,
        url: base64data,
        title: 'testImage',
        annotation: additionalInfo
        //additionalInfo: additionalInfo,
        //authorizationToken: user,
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
        alert('Image uploaded successfully!');
        const data = await response.json();
        setServerResponse(data.message);
        // Handle any further actions after successful upload
      } else {
        alert('Error uploading image. Please try again later.');
        const data = await response.json();
        setServerResponse(data.message);
        console.log ("Error: ", data);
        console.log (data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected Image Preview"
          style={{ width: 'auto', maxHeight: '50vh' }}
        />
      )}
      {additionalInfo.map ((info, index) => (
      <input
        type="text"
        placeholder="Image Caption"
        value={info}
        onChange= {(event) => handleInfoChange (event, index)} //{handleInfoChange}
      />
      ))};
      <button onClick={addCaptionBox}>Add Caption</button>
      <button onClick={handleUpload}>Upload Image</button>
      <p>Server Response: {serverResponse}</p>
    </div>
  );
}

export default ImageUploader;
