import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Insurance() {
  const navigate = useNavigate();
  const location = useLocation();
  const visitors = location.state.visitors;
  const [currentVisitorIndex, setCurrentVisitorIndex] = useState(0);
  const [fullName, setFullName] = useState(visitors[currentVisitorIndex].fullName);
  const [email, setEmail] = useState(visitors[currentVisitorIndex].email);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imagesData, setImagesData] = useState([]); // Change this to an array
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setFullName(visitors[currentVisitorIndex].fullName);
    setEmail(visitors[currentVisitorIndex].email);
  }, [currentVisitorIndex]);

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
    setImagesData([...imagesData, imageDataURL]); // Add the new image to the array

    handleCloseCamera();
  };

  const handleSubmit = () => {
    if (currentVisitorIndex < visitors.length - 1) {
      setCurrentVisitorIndex(currentVisitorIndex + 1);
    } else {
      navigate('/submit');
    }
  };

  return (
    <div>
      {!cameraOpen ? (
        <div>
          <h1>You need to take a photo to sign the insurance form</h1>
          <div>
            <label>
              Full Name:
              <input type="text" value={fullName} readOnly />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" value={email} readOnly />
            </label>
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
      {imagesData.map((imageDataURL, index) => (
        <div key={index}>
          <img src={imageDataURL} alt="Captured" />
          <button onClick={handleSubmit}>Sign Insurance Form</button>
        </div>
      ))}
    </div>
  );
}

export default Insurance;
