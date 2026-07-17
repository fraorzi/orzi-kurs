import { channel } from "node:diagnostics_channel";
export function solve<T>(name: string): (createMessage: () => T) => boolean {
  const diagnostics = channel(name);
  return (createMessage) => {
    if (!diagnostics.hasSubscribers) return false;
    diagnostics.publish(createMessage());
    return true;
  };
}
