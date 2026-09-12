import React, { useEffect, useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';

const AGENT_NAME = 'motivation_coach';

const STARTER_PROMPT = "Hi! Can you review my course progress and motivate me to keep going?";

export default function MotivationChat() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Load (or create) the conversation on mount.
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      try {
        const list = await base44.agents.listConversations({ agent_name: AGENT_NAME });
        let conv = Array.isArray(list) && list.length > 0 ? list[0] : null;
        if (!conv) {
          conv = await base44.agents.createConversation({
            agent_name: AGENT_NAME,
            metadata: { name: 'Motivation Coach', description: 'Personalized motivation for stalled learners' },
          });
        }
        setConversation(conv);
        setMessages(conv.messages || []);
        unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
          setMessages(data.messages || []);
        });
      } catch (e) {
        console.error('[MotivationChat] init error', e);
      } finally {
        setLoading(false);
      }
    })();
    return () => unsub();
  }, []);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!conversation || !text.trim() || sending) return;
    setSending(true);
    setInput('');
    try {
      const updated = await base44.agents.addMessage(conversation, { role: 'user', content: text.trim() });
      setConversation(updated);
    } catch (e) {
      console.error('[MotivationChat] send error', e);
    } finally {
      setSending(false);
    }
  };

  const startConversation = () => sendMessage(STARTER_PROMPT);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '320px' }}>
        <div className="w-7 h-7 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(232,184,91,0.2)', borderTopColor: '#e8b85b' }} />
      </div>
    );
  }

  const hasMessages = messages && messages.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'clamp(420px, 60vh, 640px)' }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center text-center" style={{ height: '100%', gap: '1rem', padding: '1.5rem' }}>
            <Sparkles size={32} style={{ color: '#e8b85b' }} />
            <p className="font-heading" style={{ color: '#f8f0df', fontSize: '1.25rem', margin: 0 }}>
              Your Motivation Coach is here.
            </p>
            <p style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.9rem', maxWidth: '380px', margin: 0 }}>
              Feeling stuck in your course? Share where you are and your coach will review your progress and help you find your next step.
            </p>
            <button
              onClick={startConversation}
              disabled={sending}
              className="font-body"
              style={{
                marginTop: '0.5rem',
                background: '#e8b85b',
                color: '#24150f',
                border: 'none',
                borderRadius: '6px',
                padding: '0.6rem 1.4rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: sending ? 'not-allowed' : 'pointer',
                opacity: sending ? 0.6 : 1,
              }}
            >
              {sending ? 'Connecting…' : 'Check my progress & motivate me'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m, i) => <MessageBubble key={i} message={m} />)}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(243,234,216,0.1)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to your coach…"
          className="font-body"
          style={{
            flex: 1,
            background: 'rgba(243,234,216,0.05)',
            border: '1px solid rgba(243,234,216,0.15)',
            borderRadius: '8px',
            padding: '0.6rem 0.9rem',
            color: '#f8f0df',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          style={{
            background: '#e8b85b',
            color: '#24150f',
            border: 'none',
            borderRadius: '8px',
            padding: '0 0.9rem',
            cursor: sending || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: sending || !input.trim() ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}