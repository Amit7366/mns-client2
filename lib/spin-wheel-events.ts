export const OPEN_SPIN_WHEEL_EVENT = "bkbaji:open-spin-wheel";

export function openSpinWheel(): void {
  window.dispatchEvent(new CustomEvent(OPEN_SPIN_WHEEL_EVENT));
}
