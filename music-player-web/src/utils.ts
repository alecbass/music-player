export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

export function bytesToMidiFile(bytes: Uint8Array) {
  return new File(
    [new Blob([bytes.buffer], { type: "audio/midi" })],
    "test.mid"
  );
}

export function classNames(...names: (string | undefined | boolean)[]) {
  return names.filter((n) => !!n).join(" ");
}
