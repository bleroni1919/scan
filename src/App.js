import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
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
  }, []);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="App">
      <h1>QR code SCANNER</h1>
      {scanResult ? (
        <div>
          Success:{" "}
          <a
            href={"http://" + scanResult}
            onClick={(e) => {
              e.preventDefault();
              openLinkInNewTab("http://" + scanResult);
            }}
          >
            {scanResult}
          </a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default App;
