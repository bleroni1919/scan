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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
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
          <h3>You need to take a photo to sign the insurance form</h3>
          <div>
            <strong>Full Name: {visitors[currentVisitorIndex].fullName}</strong>
            <p>Email: {visitors[currentVisitorIndex].email}</p>
          </div>
          <button onClick={handleOpenCamera}>Open Camera</button>
        </div>
      ) : (
        <div id="camera-preview">
          <video ref={videoRef} autoPlay playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button onClick={handleCloseCamera}>Close Camera</button>
          <button onClick={handleCaptureScreenshot}>Take Photo</button>
        </div>
      )}
      {imagesData.map((visitorData, index) => (
        <div key={index}>
          <strong>{visitorData.name}</strong>
          <img src={visitorData.image} alt="Captured" />
        </div>
      ))}
      {imagesData.length === visitors.length && <button onClick={() => navigate('/submit')}>Sign Insurance Form</button>}
    </div>
  );
}

export default Insurance;
