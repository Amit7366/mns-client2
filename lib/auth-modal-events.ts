export const OPEN_AUTH_MODAL_EVENT = "bkbaji:open-auth-modal";

export type AuthModalMode = "login" | "register";

export type OpenAuthModalDetail = {
  mode?: AuthModalMode;
  next?: string;
};

export function openAuthModal(mode: AuthModalMode = "login", next?: string): void {
  window.dispatchEvent(
    new CustomEvent<OpenAuthModalDetail>(OPEN_AUTH_MODAL_EVENT, {
      detail: { mode, next },
    }),
  );
}
