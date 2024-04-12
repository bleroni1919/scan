import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./Scanner.css"; 

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = () => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 450,
        height: 450,
      },
      fps: 5,
    });

    const handleSuccess = (result) => {
      scanner.clear();
      setScanResult(result);
      // Redirect to the VisitorInput page with the scan result as a parameter
      navigate(`/visitorinput/${encodeURIComponent(result)}`);
    };

    const handleError = (err) => {
      console.error("QR code scanning error:", err);
      // Optionally provide user feedback for errors
    };

    scanner.render(handleSuccess, handleError);

    // Cleanup function
    return () => {
      scanner.clear();
    };
  };

  return (
    <div className="scanner-container">
      <h3>Welcome to ImagineRIT Exhibitions</h3>
      <p>Scan Your QR Code to Enter the Exhibit</p>
      <button onClick={handleScan} className="scan-but">Start Scanning</button>
      {scanResult ? (
        <div>
          Success: {scanResult}
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
