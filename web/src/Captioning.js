import React from'react';
import './index.css';
import Navigation from './components/Navigation';
function Captioning() {
  return(
    //<div className="Sex">
    <div style={{
      "width": "100%",
      "height": "100%"}}>
      <Navigation />
      <iframe src="upload.html" title="captioning page" id = "captioning"></iframe>
    </div>
      //<div className="App">
       //<iframe src="upload.html" title="my-iframe"></iframe>
      //</div>
    //</div>
  );
}

export default Captioning;