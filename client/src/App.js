import { useRef, useState, useEffect } from "react";
import "./App.css";
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile] = useState("");

  const [result, setResult] = useState("");

  const fileInpuRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInpuRef.current.click();
  };

  console.log(file);
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

        <div>
          <a href={result}>{result}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
