interface Props {
  onAccept: () => void;
}

export function Intro(props: Props) {
  async function handleAllow() {
    await navigator.requestMIDIAccess();
    props.onAccept();
  }

  return (
    <div className="intro">
      <h1>Welcome to the music player!</h1>
      <h2>
        To begin,{" "}
        <span onClick={handleAllow}>
          allow MIDI sounds to be played on this page
        </span>
      </h2>
    </div>
  );
}
