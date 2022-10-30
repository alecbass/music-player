import React from "react";
import logo from "./logo.svg";

import "./App.css";

import { KeyBoard } from "components";
import { useAudio } from "hooks";

function App() {
  const audio = useAudio();

  return (
    <div id="main">
      <KeyBoard playOnPressed />
      <button disabled={audio.isPlaying} onClick={audio.start}>
        START
      </button>
      <button disabled={!audio.isPlaying} onClick={audio.stop}>
        STOP
      </button>
    </div>
  );
}

export default App;
