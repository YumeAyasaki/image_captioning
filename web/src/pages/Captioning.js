import React from'react';
import '.././index.css';
import Navigation from '.././components/Navigation';
function Captioning() {
  return(
    <div style={{
      "width": "100%",
      "height": "100%"}}>
      <Navigation />
      <iframe src="upload.html" title="captioning page" id = "captioning"></iframe>
    </div>
  );
}

export default Captioning;