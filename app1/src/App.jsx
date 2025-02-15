import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const payload = {
  prompt: "Flock of penguins in a snowstorm",
  output_format: "webp"
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
  axios.toFormData(payload, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: { 
      Authorization: `Bearer sk-elATeOhmDHdnKPsj3ugkTMAMuhp1alnJompkL36lCl8UsY9E`, 
      Accept: "image/*" 
    },
  },
);



function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const foo = () => {
    if(response.status === 200) {
      fs.writeFileSync("./testing.webp", Buffer.from(response.data));
    } else {
      throw new Error(`Oops! ${response.status}: ${response.data.toString()}`);
    }
    console.log("foo");
  }

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
              "Content-Type": "application/json"
          }
      }
  );

  setImage(response.data.image_url);
  };

  const connectWeb3 = async () => {
    // Simulate connecting to a web3 wallet
    console.log("Connecting to web3 wallet...");
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>COMIC GENERATOR</h1>
      <div>
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a prompt..." />
            <button onClick={generateImage}>Generate</button>
            {image && <img src={image} alt="Generated" />}
        </div>
    </>
  )
}

export default App
