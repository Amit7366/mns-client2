"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { openAuthModal } from "@/lib/auth-modal-events";
import {
  fetchChatQuickReplies,
  localizedText,
  type ChatQuickReply,
  type ChatQuickReplyIcon,
} from "@/lib/chat-quick-replies";
import { useSupportChat } from "@/lib/chat/useSupportChat";
import { memberLiveChatHref } from "@/lib/member-routes";

type PopupView = "topics" | "thread" | "agent";

type FaqTurn = {
  id: string;
  role: "user" | "bot";
  text: string;
};

type LiveChatPopupProps = {
  onClose: () => void;
};

function formatTime(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ReplyIcon({ name }: { name: ChatQuickReplyIcon | "agent" }) {
  const common = "h-5 w-5";
  if (name === "deposit") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }
  if (name === "withdrawal") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 3v12" />
        <path d="M7 11l5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  if (name === "game") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="8" width="18" height="10" rx="4" />
        <path d="M8 13h3M9.5 11.5v3" />
        <circle cx="16" cy="12.5" r="0.8" fill="currentColor" />
        <circle cx="18" cy="14.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }
  if (name === "bonus") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="4" y="10" width="16" height="10" rx="1.5" />
        <path d="M12 10v10M4 14h16" />
        <path d="M12 10c-2-4-6-4-6-1.5S10 10 12 10zM12 10c2-4 6-4 6-1.5S14 10 12 10z" />
      </svg>
    );
  }
  if (name === "agent") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M7 17.5V16a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.5" />
        <circle cx="12" cy="8" r="3" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c1.2-3 3.4-4.5 7-4.5S17.8 16 19 19" />
    </svg>
  );
}

function AgentPane({
  initialMessage,
  onConnected,
}: {
  initialMessage: string | null;
  onConnected: (connected: boolean) => void;
}) {
  const { session } = useAuth();
  const { t } = useLocale();
  const chat = useSupportChat();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);
  const myId = session?.objectId ?? "";

  useEffect(() => {
    onConnected(chat.connected);
  }, [chat.connected, onConnected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages.length, chat.typingFrom]);

  useEffect(() => {
    if (seeded.current || !initialMessage || chat.loading || !chat.room?.roomId) return;
    seeded.current = true;
    void chat.sendMessage(initialMessage).catch(() => {
      setDraft(initialMessage);
    });
  }, [initialMessage, chat.loading, chat.room?.roomId, chat.sendMessage]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || chat.sending) return;
    const text = draft;
    setDraft("");
    chat.notifyTyping(false);
    try {
      await chat.sendMessage(text);
    } catch {
      setDraft(text);
    }
  }

  const canSend = Boolean(chat.room?.roomId) && !chat.sending && !chat.loading;

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f7f6] px-3 py-3">
        {!chat.room?.officerAssigned && !chat.loading ? (
          <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
            {t.chatNoAgent}
          </p>
        ) : null}
        {chat.error ? (
          <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
            {chat.error}
          </p>
        ) : null}
        {chat.loading ? (
          <p className="text-center text-[13px] text-[#6b7280]">{t.loading}</p>
        ) : chat.messages.length === 0 ? (
          <p className="text-center text-[13px] text-[#6b7280]">{t.chatEmpty}</p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {chat.messages.map((msg) => {
              const mine = String(msg.senderId) === myId;
              return (
                <li key={msg._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                      mine
                        ? "rounded-br-md bg-[#014038] text-white"
                        : "rounded-bl-md border border-[#e5e7eb] bg-white text-[#111827]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-white/70" : "text-[#9ca3af]"}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {chat.typingFrom ? <p className="mt-2 text-[12px] text-[#6b7280]">{t.chatTyping}</p> : null}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={(e) => void onSubmit(e)} className="border-t border-[#e5e7eb] bg-white px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              chat.notifyTyping(e.target.value.length > 0);
            }}
            onBlur={() => chat.notifyTyping(false)}
            rows={1}
            placeholder={t.chatPlaceholder}
            disabled={!canSend}
            className="max-h-24 min-h-[42px] flex-1 resize-none rounded-full border border-[#d1d5db] px-4 py-2.5 text-[14px] text-[#111827] outline-none focus:border-[var(--cyan-dim)] disabled:bg-[#f3f4f6]"
          />
          <button
            type="submit"
            disabled={!canSend || !draft.trim()}
            aria-label={t.chatSend}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--cyan)] text-[#00332b] disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3.4 11.2 20.2 4.3c.8-.3 1.6.4 1.3 1.2l-4.8 16.2c-.3.9-1.4 1.1-2 .4l-4.2-4.6-4.6 2.2c-.8.4-1.7-.3-1.5-1.2l1-4.7-1.9-1.6c-.7-.6-.4-1.7.5-1.9z" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

export default function LiveChatPopup({ onClose }: LiveChatPopupProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t, preferences } = useLocale();
  const locale = preferences.locale;
  const [replies, setReplies] = useState<ChatQuickReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<PopupView>("topics");
  const [turns, setTurns] = useState<FaqTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [wantAgent, setWantAgent] = useState(false);
  const [pendingText, setPendingText] = useState<string | null>(null);
  const [agentConnected, setAgentConnected] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const onConnected = useCallback((connected: boolean) => {
    setAgentConnected(connected);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetchChatQuickReplies()
      .then((rows) => {
        if (!cancelled) setReplies(rows);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load suggestions");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && wantAgent) {
      setView("agent");
      setWantAgent(false);
    }
  }, [isAuthenticated, wantAgent]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [turns.length, view]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (document.querySelector(".auth-modal-root")) return;
      onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function expand() {
    const href = memberLiveChatHref(locale);
    if (!isAuthenticated) {
      openAuthModal("login", href);
      return;
    }
    router.push(href);
  }

  function startAgent(text?: string) {
    const trimmed = text?.trim() ?? "";
    setPendingText(trimmed || null);
    if (!isAuthenticated) {
      setWantAgent(true);
      openAuthModal("login");
      return;
    }
    setView("agent");
  }

  function pickReply(reply: ChatQuickReply) {
    setWantAgent(false);
    const label = localizedText(reply.label, locale);
    const answer = localizedText(reply.answer, locale);
    setTurns((prev) => [
      ...prev,
      { id: `${reply._id}-q-${prev.length}`, role: "user", text: label },
      { id: `${reply._id}-a-${prev.length}`, role: "bot", text: answer },
    ]);
    setView("thread");
  }

  const statusLabel = view === "agent" ? (agentConnected ? t.chatOnline : t.chatReconnecting) : t.chatPopupOnline;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.liveSupport}
      className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-3 z-[80] flex h-[min(640px,calc(100dvh-6.5rem))] w-[min(100vw-1.5rem,380px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] lg:bottom-24 lg:right-8"
    >
      <header className="flex items-center gap-2.5 bg-[#014038] px-3 py-2.5 text-white">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)] text-[#014038]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6A3.5 3.5 0 0 1 15.5 16H9l-4 3.5V6.5z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold">{t.liveSupport}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" aria-hidden />
            {statusLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={expand}
          aria-label={t.chatPopupExpand}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M14 5h5v5M10 19H5v-5M19 5l-7 7M5 19l7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.chatPopupMinimize}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.chatPopupClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      {view === "agent" ? (
        <AgentPane initialMessage={pendingText} onConnected={onConnected} />
      ) : (
        <>
          <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto bg-[#f7f8fa] px-3 py-3">
            {view === "thread" ? (
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setView("topics")}
                  className="text-[12px] font-semibold text-[#014038]"
                >
                  ← {t.chatPopupBack}
                </button>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {turns.map((turn) => (
                    <li key={turn.id} className={`flex ${turn.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                          turn.role === "user"
                            ? "rounded-br-md bg-[#014038] text-white"
                            : "rounded-bl-md border border-[#e5e7eb] bg-white text-[#111827]"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{turn.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mb-3 px-2 text-center">
                <span className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)] text-[#014038] shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6A3.5 3.5 0 0 1 15.5 16H9l-4 3.5V6.5z" />
                  </svg>
                </span>
                <h2 className="text-[17px] font-bold text-[#111827]">{t.chatPopupGreeting}</h2>
                <p className="mt-1 text-[12px] leading-snug text-[#6b7280]">{t.chatPopupHint}</p>
              </div>
            )}

            {error ? <p className="mb-3 text-center text-[12px] text-red-600">{error}</p> : null}
            {loading ? <p className="mb-3 text-center text-[13px] text-[#6b7280]">{t.loading}</p> : null}

            <div className="grid grid-cols-2 gap-2">
              {replies.map((reply) => (
                <button
                  key={reply._id}
                  type="button"
                  onClick={() => pickReply(reply)}
                  className="flex items-center gap-2 rounded-xl border border-[#e6ebf0] bg-white px-2.5 py-2.5 text-left shadow-sm transition hover:border-[var(--cyan-dim)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--cyan-muted)] text-[#014038]">
                    <ReplyIcon name={reply.icon} />
                  </span>
                  <span className="text-[12px] font-semibold leading-tight text-[#1f2937]">
                    {localizedText(reply.label, locale)}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => startAgent()}
                className="flex items-center gap-2 rounded-xl border border-[#c5efe8] bg-[#f3fffc] px-2.5 py-2.5 text-left shadow-sm transition hover:border-[var(--cyan-dim)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dff7f2] text-[#014038]">
                  <ReplyIcon name="agent" />
                </span>
                <span className="text-[12px] font-semibold leading-tight text-[#1f2937]">{t.chatPopupDirect}</span>
              </button>
            </div>
          </div>

          {view === "topics" ? (
            <p className="flex items-center justify-center gap-1.5 border-t border-[#eef2f4] bg-[#f7f8fa] px-3 py-2 text-[11px] text-[#6b7280]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#178358" strokeWidth="2" aria-hidden>
                <path d="M5 12.5 9.2 17 19 7" />
              </svg>
              {t.chatPopupSecure}
            </p>
          ) : null}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              const text = draft;
              setDraft("");
              startAgent(text);
            }}
            className="border-t border-[#e5e7eb] bg-white px-3 py-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={1}
                placeholder={t.chatPlaceholder}
                className="max-h-24 min-h-[42px] flex-1 resize-none rounded-full border border-[#d1d5db] px-4 py-2.5 text-[14px] text-[#111827] outline-none focus:border-[var(--cyan-dim)]"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label={t.chatSend}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[#1a1400] disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3.4 11.2 20.2 4.3c.8-.3 1.6.4 1.3 1.2l-4.8 16.2c-.3.9-1.4 1.1-2 .4l-4.2-4.6-4.6 2.2c-.8.4-1.7-.3-1.5-1.2l1-4.7-1.9-1.6c-.7-.6-.4-1.7.5-1.9z" />
                </svg>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
