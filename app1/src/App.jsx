import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/logo.svg'
import './App.css'
import fs from "node:fs";
import axios from 'axios';
import FormData from "form-data";
import styled from "styled-components";

console.log("DY: Reloaded page");

const theme = {
  blue: {
    default: "#8d6f3c",
    hover: "#644f2b",
  },
  // pink: {
  //   default: "#e91e63",
  //   hover: "#ad1457",
  // },
};

const Button2 = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px black;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button2.defaultProps = {
  theme: "blue",
};

const payload = {
  prompt: "Flock of birds",
  output_format: "png"
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generateImage1 = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate', {prompt});
      console.log(response)
      setImage(response.data.message.prompt);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  /* TODO */
  const connectToEthereum = async () => {
    console.log("DY: Connect to Ethereum clicked");
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
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setImage(response.data.image_url);
  };

  return (
    <>
      <header className="App-header">
        <Button2 onClick={connectToEthereum}>Connect to Ethereum</Button2>
      </header>
      <br></br>
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      {/* <h1>COMIC AI GENERATOR</h1> */}
      <h2>Bring your ideas to life with Comic.AI!</h2><h4>(pronounced "comical")</h4>
      <h3>Enter your keywords into the text box below and press GENERATE</h3>
      <div>
        <input class="input" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a prompt..." />
      </div>
      <br></br>
      <div>
        <button onClick={generateImage1}>GENERATE</button>
      </div>
      <div>
        {image && <div>{image}</div>}
      </div>
    </>
  )
}

export default App
