//Hide ad when clicked
var ad_list = document.querySelectorAll('.advertisement');
var ad_list_arr = [...ad_list];
ad_list_arr.forEach(i => {
	i.onclick = function() {
	};
});
function binanceNigga()
{
	alert ("My binance user id: 21262360");
}

//for everyone else
document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
  
 }, false);

//Update range/slider input value
//https://stackoverflow.com/questions/10004723/html5-input-type-range-show-range-value
function updateTextInput(val, ID) {
          document.getElementById(ID).value=val; 
        }

//Drag N Drop Image
const dropContainer = document.getElementById("dropContainer");
const InputBox = document.getElementById("InputBox");
const ChinhSuaBox = document.getElementById("ChinhSuaBox");
  
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
  evt.preventDefault();
};
dropContainer.ondrop = function(evt) {
  // pretty simple -- but not for IE :(
  console.log ("ye");
  evt.preventDefault();
  InputBox.files = evt.dataTransfer.files;
  ChinhSuaBox.files = evt.dataTransfer.files;

  // If you want to use some of the dropped files
  const dT = new DataTransfer();
  dT.items.add(evt.dataTransfer.files[0]);
  InputBox.files = dT.files;
  ChinhSuaBox.files = dT.files;
  blah.src = URL.createObjectURL(evt.dataTransfer.files[0]);
  //document.getElementById("sample").src =  blah.src;
  evt.preventDefault();
  document.getElementsByClassName ("ShowAfterShrink")[0].style.display = "block";
  document.getElementsByClassName ("RemoveAfterShrink")[0].style.display = "none";
  document.getElementById("Review_Image").classList.remove("Hidden");
  var elmntToView = document.getElementById("AdjustmentBox");
  elmntToView.scrollIntoView({ behavior: "smooth"});
};
InputBox.onchange = evt => {
  const [file] = InputBox.files;
  ChinhSuaBox.files = InputBox.files;
  if (file) {
    blah.src = URL.createObjectURL(file);
	//document.getElementById("sample").src =  blah.src;
  }
  document.getElementsByClassName ("ShowAfterShrink")[0].style.display = "block";
  document.getElementsByClassName ("RemoveAfterShrink")[0].style.display = "none";
  document.getElementById("Review_Image").classList.remove("Hidden");
  var elmntToView = document.getElementById("AdjustmentBox");
  elmntToView.scrollIntoView({ behavior: "smooth"}); 
};

/*const InputBoxOverlay = document.getElementById("InputBoxOverlay");
InputBoxOverlay.onchange = evt => {
  const [file] = InputBoxOverlay.files;
  if (file) {
    overlayImg.src = URL.createObjectURL(file)
  }
}*/

var currentBlobImage;

function changeImage(blobImage) {
 const urlCreator = window.URL || window.webkitURL;
 currentBlobImage = blobImage;
 document.getElementById('resultImg').src = urlCreator.createObjectURL(blobImage);
}
function changeResultText(textValue) {
console.log (textValue);
 document.getElementById('CaptioningResult').textContent = textValue;
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    console.log ("Type of blob: ");
    console.log (typeof blob);
    console.log (blob);
    reader.readAsDataURL(blob);
  });
}
document.querySelector("#ImageForm").addEventListener("submit", async function(e){
        e.preventDefault();    //stop form from submitting
		const myForm = document.forms['ImageForm'];
    var base64data = await blobToBase64(myForm['InputBox'].files[0]);
    dataToSend = {"file":base64data}
    console.log (dataToSend);
    //console.log (base64data);
    //console.log (JSON.stringify(dataToSend));
		fetch("/api/caption/upload", {method:'POST', headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(dataToSend)})
				.then((response) => {
			if (!response.ok) {
			  throw new Error("HTTP error: ${response.status}");
			}
			return response.blob();
		  })
		  .then(blob => blob.text()).then (textValue => {changeResultText (textValue)});
});

/*document.querySelector("#ChinhSuaForm").addEventListener("submit", function(e){
		console.log ("ChinhSuaForm");
        e.preventDefault();    //stop form from submitting
		const myForm2 = document.forms['ChinhSuaForm']
		fetch(document.forms['ChinhSuaForm'].action, {method:'post', body: new FormData(myForm2)})
				.then((response) => {
			if (!response.ok) {
			  throw new Error("HTTP error: ${response.status}");
			}
			return response.blob();
		  })
		  .then((blob) => {console.log (blob); 
  });
});
function disableLastButton(){
      document.getElementById("LastButton").disabled = true;
      setTimeout(function(){document.getElementById("LastButton").disabled = false;},20000);
  }*/
/*document.querySelector("#LastButton").addEventListener("click", function(e){
	disableLastButton();
  fetch('/convert', {method:"POST", body:currentBlobImage})
                .then(response  => {
			if (!response.ok) {
			  throw new Error("HTTP error: ${response.status}");
			}
			return response.blob();
		  })
		  .then((blob) => {
					var file = window.URL.createObjectURL(blob);
					window.location.assign(file);
					});
});
*/