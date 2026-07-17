import { readViewer } from "./viewer-data";

export async function ViewerGreeting() {
  const viewer = await readViewer();
  return <p>Witaj, {viewer.name}</p>;
}
