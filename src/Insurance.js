import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Insurance.css";

function Insurance() {
  const navigate = useNavigate();
  const location = useLocation();
  const visitors = location.state.visitors;
  const [currentVisitorIndex, setCurrentVisitorIndex] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleOpenCamera = () => {
    setCameraOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      console.error('getUserMedia not supported on your browser');
    }
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const handleCaptureScreenshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Scale down the size of the canvas
    const scale = 0.5; // Adjust this value to change the size of the captured image
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL('image/png');
    setImagesData([...imagesData, { name: visitors[currentVisitorIndex].fullName, image: imageDataURL }]);

    handleCloseCamera();
    if (currentVisitorIndex < visitors.length - 1) {
      setCurrentVisitorIndex(currentVisitorIndex + 1);
    }
  };

  return (
    <div class="container-fluid">
      {!cameraOpen ? (
        <div>
          <h3>You Need to Take a Photo to Sign the Insurance</h3>
          <div>
            <p className='col'>{visitors[currentVisitorIndex].fullName}</p>
            <p className='col'> {visitors[currentVisitorIndex].email}</p>
          </div>
          <button onClick={handleOpenCamera} className='butoni3'>Open Camera</button>
          {imagesData.length === visitors.length && <button onClick={() => navigate('/submit')} className='butoni3'>Sign Insurance Form</button>}
        </div>
      ) : (
        <div id="camera-preview">
          <video ref={videoRef} autoPlay playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button onClick={handleCloseCamera} className='butoni4'>Close Camera</button>
          <button onClick={handleCaptureScreenshot} className='butoni4'>Take Photo</button>
        </div>
      )}
      {imagesData.map((visitorData, index) => (
        <div key={index}>
          <strong>{visitorData.name}</strong>
          <img src={visitorData.image} alt="Captured" />
        </div>
      ))}
      
    </div>
  );
}

export default Insurance;
