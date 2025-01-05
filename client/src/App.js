import { useRef, useState, useEffect } from "react";
import "./App.css";
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To manage error state

  const fileInpuRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true); // Start loader
        setError(""); // Reset error state
        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          let response = await uploadFile(data);

          if (response.error) {
            // Handle backend-sent error
            setError(response.error); // Display error message from backend
          } else {
            setResult(response.path); // Set file path if successful
          }
        } catch (err) {
          setError("Only image files (JPEG, PNG, GIF) and PDFs are allowed!"); // Generic error handling
        } finally {
          setLoading(false); // Stop loader
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInpuRef.current.click();
  };

  return (
    <div className="app">
      <div className="filewave-container">
        <h1 className="filewave-heading">File Wave</h1>
        <p className="filewave-description">
          Share your files effortlessly with FileWave, an user-friendly platform
          for quick file uploads and downloads. Upload, share, and manage your
          files with ease!
        </p>

        <button className="upload-button" onClick={() => onUploadClick()}>
          Upload
        </button>
        <input
          type="file"
          ref={fileInpuRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {loading && <p className="loader">Uploading...</p>} {/* Loader */}
        {error && <p className="error">{error}</p>} {/* Error message */}

        {result && (
          <div>
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
