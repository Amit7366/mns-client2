export const OPEN_GOLDEN_EGG_EVENT = "bkbaji:open-golden-egg";

export function openGoldenEgg(): void {
  window.dispatchEvent(new CustomEvent(OPEN_GOLDEN_EGG_EVENT));
}
