import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

export default function noSlop(pi: ExtensionAPI) {
  pi.setLabel("No-Slop Comments");
}
