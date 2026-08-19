import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

export default function slopStop(pi: ExtensionAPI) {
  pi.setLabel("slop-stop");
}
