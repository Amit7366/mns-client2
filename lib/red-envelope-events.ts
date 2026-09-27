export const OPEN_RED_ENVELOPE_EVENT = "bkbaji:open-red-envelope";

export function openRedEnvelope(): void {
  window.dispatchEvent(new CustomEvent(OPEN_RED_ENVELOPE_EVENT));
}
