import './App.css';
import { useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onClick = async (e) => {
    // Call the API here
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      body: JSON.stringify({ 'image_url': imageUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    const text = await response.text();
    setCaption(text);
  }

  return (
    <div>
      <h1>App here</h1>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={handleImageChange}
      />
      
      <div>
        <button onClick={onClick}>Generate caption</button>
        <div>{caption}</div>
      </div>
      {imageUrl && <img src={imageUrl} alt="Preview" />}
    </div>
  );
}

export default App;
