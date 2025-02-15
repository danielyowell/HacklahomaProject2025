import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/logo.svg'
import './App.css'
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

console.log("DY: Reloaded page");

const payload = {
  prompt: "Flock of birds",
  output_format: "png"
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generateImage = async () => {
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        prompt: prompt,
        width: 512,
        height: 512,
        steps: 30
      },
      {
        headers: {
          Authorization: `Bearer sk-elATeOhmDHdnKPsj3ugkTMAMuhp1alnJompkL36lCl8UsY9E`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setImage(response.data.image_url);
  };

  return (
    <>
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>IMAGE GENERATOR</h1>
      <div>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a prompt..." />
        <button onClick={generateImage}>Generate</button>
        {image && <img src={image} alt="Generated" />}
      </div>
    </>
  )
}

export default App
