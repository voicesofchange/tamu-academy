import React, { useEffect, useRef, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { canViewInDevelopment } from '@/lib/module-access';
import MessageBubble from './MessageBubble';
import { MessageCircle, X, Trash2, Send, Sparkles } from 'lucide-react';

const AGENT_NAME = 'tamu_learning_guide';

const GREETING =
  "Hello! I'm the Tamu Learning Guide. I can help you explore our courses, understand how the platform works, find learning resources, or determine where to continue. What would you like help with?";

const SUGGESTED_QUESTIONS = [
  'Which course is right for me?',
  'What courses are currently available?',
  'How do I start a course?',
  'How do I resume my progress?',
  'Where can I find learning resources?',
  'How do certificates work?',
];

const PRIVACY_NOTICE =
  'Please do not share private reflections, assessment answers, medical information, passwords, or personal stories in this chat.';

const BTN_STYLE = {
  position: 'fixed',
  right: 'clamp(1rem, 3vw, 2rem)',
  bottom: 'clamp(1rem, 3vw, 2rem)',
  zIndex: 60,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#D4A12A',
  color: '#1A130E',
  border: 'none',
  borderRadius: '999px',
  padding: '0.7rem 1.2rem',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.78rem',
  letterSpacing: '0.04em',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
};

const OVERLAY = {
  position: 'fixed',
  inset: 0,
  zIndex: 70,
  backgroundColor: 'rgba(10,7,5,0.55)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: 'clamp(0.75rem, 3vw, 2rem)',
};

const PANEL = {
  width: 'min(420px, 100vw)',
  maxWidth: '100%',
  height: 'min(620px, 80vh)',
  backgroundColor: '#1A130E',
  border: '1px solid rgba(212,161,42,0.3)',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
  overflow: 'hidden',
};

const HEADER = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.85rem 1rem',
  borderBottom: '1px solid rgba(212,161,42,0.18)',
  flexShrink: 0,
};

export default function TamuGuideWidget() {
  const { isAuthenticated, user } = useAuth();
  const allowed = canViewInDevelopment({ isAuthenticated, role: user?.role });

  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const unsubRef = useRef(() => {});

  // Ensure a conversation exists when the panel opens.
  const ensureConversation = useCallback(async () => {
    if (conversation) return conversation;
    setLoading(true);
    try {
      const list = await base44.agents.listConversations({ agent_name: AGENT_NAME });
      let conv = Array.isArray(list) && list.length > 0 ? list[0] : null;
      if (!conv) {
        conv = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: 'Tamu Learning Guide', description: 'Course navigator and learner support' },
        });
      }
      setConversation(conv);
      setMessages(conv.messages || []);
      unsubRef.current = base44.agents.subscribeToConversation(conv.id, (data) => {
        setMessages(data.messages || []);
      });
      return conv;
    } catch (e) {
      console.error('[TamuGuideWidget] init error', e);
      return null;
    } finally {
      setLoading(false);
    }
  }, [conversation]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    // Return focus to the trigger button.
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const handleClear = useCallback(async () => {
    unsubRef.current();
    unsubRef.current = () => {};
    setConversation(null);
    setMessages([]);
    setInput('');
    await ensureConversation();
  }, [ensureConversation]);

  const sendMessage = useCallback(async (text) => {
    const conv = conversation || (await ensureConversation());
    if (!conv || !text.trim() || sending) return;
    setSending(true);
    setInput('');
    try {
      const updated = await base44.agents.addMessage(conv, { role: 'user', content: text.trim() });
      setConversation(updated);
    } catch (e) {
      console.error('[TamuGuideWidget] send error', e);
    } finally {
      setSending(false);
    }
  }, [conversation, ensureConversation, sending]);

  // When the panel opens, ensure a conversation and focus the input.
  useEffect(() => {
    if (!open) return;
    ensureConversation();
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape to close + simple focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  // Auto-scroll to newest message.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Cleanup subscription on unmount.
  useEffect(() => () => unsubRef.current(), []);

  if (!allowed) return null;

  const hasMessages = messages && messages.length > 0;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleOpen}
        aria-label="Ask the Tamu Guide"
        aria-expanded={open}
        className="font-body tamu-guide-trigger"
        style={BTN_STYLE}
      >
        <MessageCircle size={16} aria-hidden="true" />
        Ask the Tamu Guide
      </button>

      {open && (
        <div
          className="tamu-guide-overlay"
          style={OVERLAY}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Tamu Learning Guide chat"
            style={PANEL}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={HEADER}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} style={{ color: '#D4A12A' }} aria-hidden="true" />
                <span className="font-heading" style={{ color: '#F5EFE0', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.02em' }}>
                  Tamu Learning Guide
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button
                  onClick={handleClear}
                  aria-label="Clear conversation and start a new one"
                  title="Clear conversation"
                  style={{ background: 'none', border: 'none', color: 'rgba(245,239,224,0.6)', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px', display: 'inline-flex' }}
                  className="tamu-guide-icon-btn"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
                <button
                  onClick={handleClose}
                  aria-label="Close chat"
                  title="Close"
                  style={{ background: 'none', border: 'none', color: 'rgba(245,239,224,0.6)', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px', display: 'inline-flex' }}
                  className="tamu-guide-icon-btn"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Privacy notice */}
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(212,161,42,0.1)', backgroundColor: 'rgba(212,161,42,0.04)' }}>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.68rem', lineHeight: 1.45, margin: 0 }}>
                {PRIVACY_NOTICE}
              </p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '0.85rem 1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Greeting as initial assistant message */}
                <MessageBubble message={{ role: 'assistant', content: GREETING }} />

                {/* Suggested questions (only before any real messages) */}
                {!hasMessages && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        disabled={sending}
                        className="font-body tamu-guide-chip"
                        style={{
                          background: 'rgba(212,161,42,0.1)',
                          border: '1px solid rgba(212,161,42,0.3)',
                          color: '#D4A12A',
                          borderRadius: '999px',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.74rem',
                          cursor: sending ? 'not-allowed' : 'pointer',
                          opacity: sending ? 0.5 : 1,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {hasMessages && messages.map((m, i) => (
                  <MessageBubble key={i} message={m} />
                ))}

                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem' }}>
                    <div style={{ width: '1.4rem', height: '1.4rem', border: '2px solid rgba(212,161,42,0.2)', borderTopColor: '#D4A12A', borderRadius: '50%', animation: 'tamuGuideSpin 0.7s linear infinite' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderTop: '1px solid rgba(212,161,42,0.18)', flexShrink: 0 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Type a message to the Tamu Learning Guide"
                className="font-body"
                style={{
                  flex: 1,
                  background: 'rgba(245,239,224,0.05)',
                  border: '1px solid rgba(245,239,224,0.15)',
                  borderRadius: '8px',
                  padding: '0.6rem 0.85rem',
                  color: '#F5EFE0',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                style={{
                  background: '#D4A12A',
                  color: '#1A130E',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0 0.85rem',
                  cursor: sending || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: sending || !input.trim() ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tamuGuideSpin { to { transform: rotate(360deg); } }
        .tamu-guide-trigger:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 3px;
        }
        .tamu-guide-trigger:hover { background-color: rgba(212,161,42,0.88); }
        .tamu-guide-icon-btn:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 2px;
        }
        .tamu-guide-icon-btn:hover { color: #F5EFE0; }
        .tamu-guide-chip:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 2px;
        }
        .tamu-guide-chip:hover { background: rgba(212,161,42,0.18); }
        .tamu-guide-overlay input:focus { border-color: rgba(212,161,42,0.5); }
        @media (max-width: 480px) {
          .tamu-guide-trigger span { display: none; }
        }
      `}</style>
    </>
  );
}