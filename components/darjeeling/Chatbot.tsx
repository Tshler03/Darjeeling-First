'use client'

import { useState, useRef, useEffect } from 'react'

const KB: { patterns: string[]; answer: string }[] = [
  {
    patterns: ['what is', 'who are you', 'about', 'tell me', 'explain'],
    answer: 'Darjeeling First is a community cleanup movement started by a group of friends from the same school in Darjeeling. No NGO, no funding — just people who love their hills and show up every Sunday to take care of them. 🌿',
  },
  {
    patterns: ['join', 'volunteer', 'how to help', 'participate', 'sign up', 'get involved', 'come'],
    answer: 'Just DM us on Instagram @darjeeelingfirst and we\'ll tell you where to be! Show up any Sunday — gloves are provided. No experience needed, just bring yourself. 🧤',
  },
  {
    patterns: ['when', 'sunday', 'schedule', 'next drive', 'time', 'day'],
    answer: 'We go out every Sunday morning. DM us on Instagram @darjeeelingfirst to find out the exact time and meeting point for the next drive! 📅',
  },
  {
    patterns: ['where', 'location', 'place', 'area', 'spots', 'which'],
    answer: 'We\'ve cleaned 12+ locations — Mall Road, Chowrasta, Tiger Hill, Batasia Loop, Happy Valley, Ghoom, Lebong, Chowk Bazaar, Singamari, Jalapahar, Victoria Falls, and the Himalayan Railway area. 📍',
  },
  {
    patterns: ['how many', 'stats', 'numbers', 'drives', 'followers', 'count', 'total'],
    answer: 'We have 62 posts on Instagram, 1,956 followers, and 200+ people have shown up in person. Every Sunday the number grows. 💪',
  },
  {
    patterns: ['instagram', 'social', 'follow', 'handle', 'account', 'post'],
    answer: 'Find us on Instagram @darjeeelingfirst (three e\'s!) — we post every drive, before and after photos. Give us a follow and share our posts! 📸',
  },
  {
    patterns: ['spread', 'share', 'promote', 'without coming', 'support', 'help online'],
    answer: 'The easiest way to help is to share our Instagram posts @darjeeelingfirst. Every share puts Darjeeling in front of someone who might just show up next Sunday. 📣',
  },
  {
    patterns: ['start', 'my own', 'neighbourhood', 'other city', 'other place', 'different'],
    answer: 'Yes! Start your own cleanup wherever you are — you don\'t need permission, just a group chat and a Sunday morning. DM us @darjeeelingfirst and we\'ll help you get started. 🌍',
  },
  {
    patterns: ['donate', 'fund', 'money', 'sponsor', 'contribution'],
    answer: 'We don\'t take donations — this movement runs on time and effort, not money. The best thing you can do is show up or share our story. 🙏',
  },
  {
    patterns: ['why', 'reason', 'purpose', 'mission', 'goal'],
    answer: '"This is not just waste. This is neglect." Darjeeling is losing itself quietly — one plastic bag at a time. We show up because clean places don\'t stay clean by accident. They stay clean when people care. 🏔️',
  },
  {
    patterns: ['contact', 'reach', 'message', 'email', 'talk', 'dm'],
    answer: 'Best way to reach us is Instagram DM — @darjeeelingfirst. We respond there! 💬',
  },
  {
    patterns: ['founder', 'who started', 'started by', 'team', 'members', 'people behind'],
    answer: 'Darjeeling First was started by a group of school friends — people from Darjeeling who grew up hiking these trails and refused to watch them disappear under garbage. "Group of friends coming from same school of thought!" 🤝',
  },
  {
    patterns: ['plastic', 'waste', 'garbage', 'trash', 'litter', 'pollution'],
    answer: 'Plastic and solid waste is the biggest challenge in Darjeeling. We collect bags of waste every Sunday from trails, roads and markets — and document everything to show what\'s possible. ♻️',
  },
  {
    patterns: ['trail', 'hill', 'mountain', 'forest', 'nature'],
    answer: 'We clean the trails tourists love and locals cherish — Tiger Hill Road, Happy Valley, Singamari Forest Trail and more. From the hills that raised us, we take back what should never have been left behind. 🏔️',
  },
  {
    patterns: ['market', 'road', 'street', 'bazaar', 'town'],
    answer: 'The bazaars, bus stands and morning markets are the beating heart of Darjeeling. Mall Road, Chowrasta, Chowk Bazaar — we keep them breathing clean, every Sunday. 🛒',
  },
  {
    patterns: ['gloves', 'equipment', 'bring', 'carry', 'what to wear', 'prepare'],
    answer: 'Gloves are provided! Just wear comfortable clothes you don\'t mind getting dirty, bring a water bottle, and bring your energy. That\'s it. We handle the rest. 🧤',
  },
  {
    patterns: ['how long', 'duration', 'hours', 'how much time'],
    answer: 'Each drive is usually 2–3 hours on Sunday mornings. Enough to make a real difference without taking your whole day. ⏱️',
  },
  {
    patterns: ['tourist', 'visit', 'travel', 'visitor', 'outsider', 'not from'],
    answer: 'Absolutely — tourists and visitors are welcome to join! If you\'re in Darjeeling on a Sunday, come clean with us. DM @darjeeelingfirst and we\'ll tell you where to meet. 🌏',
  },
  {
    patterns: ['student', 'school', 'college', 'young', 'youth', 'kids'],
    answer: 'Many of our members are students! If you\'re in school or college in Darjeeling, you\'re exactly who this movement needs. DM us @darjeeelingfirst to join. 🎓',
  },
  {
    patterns: ['impact', 'difference', 'result', 'change', 'effect', 'before after'],
    answer: 'After each drive, the difference is visible immediately — we document everything with before and after photos posted to @darjeeelingfirst. 54+ Sundays in, 67+ drives completed, 12+ locations cleaned. The hills are responding. 🌱',
  },
  {
    patterns: ['ropeway', 'toy train', 'tea', 'darjeeling famous', 'heritage'],
    answer: '"Darjeeling ropeway is admired by many, but protecting it is everyone\'s responsibility." We clean around heritage sites too — the toy train tracks, tea estate roads, viewpoints. These places deserve to be as beautiful as they are famous. 🚂',
  },
  {
    patterns: ['alone', 'by myself', 'solo', 'know anyone', 'no friends coming'],
    answer: 'Come alone — you\'ll leave with friends. Everyone who shows up for the first time comes solo and leaves as part of the group. That\'s how this thing started. Just DM @darjeeelingfirst. 💛',
  },
  {
    patterns: ['hello', 'hi', 'hey', 'hola', 'namaste', 'greetings'],
    answer: 'Hey! 👋 Welcome. I can tell you about Darjeeling First — how to join, where we clean, what we\'ve done, or how you can help. What would you like to know?',
  },
  {
    patterns: ['thank', 'thanks', 'great', 'awesome', 'amazing', 'good', 'nice', 'cool'],
    answer: 'Thank you! 🌿 Every person who cares makes a difference. Share our story @darjeeelingfirst if you want to help spread the word!',
  },
  {
    patterns: ['website', 'site', 'darjeeling first website'],
    answer: 'You\'re on it! 😊 This website was built to tell the story of Darjeeling First. Follow us on Instagram @darjeeelingfirst for live updates every Sunday.',
  },
]

const FALLBACK = 'Great question! For the most accurate answer, DM us on Instagram @darjeeelingfirst — we\'re always happy to chat. 💬'

const SUGGESTED = [
  'What is Darjeeling First?',
  'How can I join?',
  'Where do you clean?',
  'When is the next drive?',
  'What should I bring?',
  'Can tourists join?',
]

function getAnswer(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of KB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.answer
  }
  return FALLBACK
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [open, setOpen]                       = useState(false)
  const [messages, setMessages]               = useState<Message[]>([])
  const [input, setInput]                     = useState('')
  const [isTyping, setIsTyping]               = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    setShowSuggestions(false)
    setMessages(prev => [...prev, { role: 'user', content: text.trim() }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getAnswer(text) }])
      setIsTyping(false)
    }, 500 + Math.random() * 400)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <>
      <style>{`
        .df-chat-bubble {
          position: fixed; bottom: 2rem; right: 2rem;
          z-index: 9000;
          font-family: var(--ff-body, system-ui, sans-serif);
        }
        .df-chat-toggle {
          width: 56px; height: 56px; border-radius: 50%;
          background: #c9a84c; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: df-pulse 2.5s ease-in-out infinite;
          overflow: hidden; padding: 0;
        }
        .df-chat-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 32px rgba(0,0,0,0.5), 0 0 0 8px rgba(201,168,76,0.15);
          animation: none;
        }
        .df-chat-toggle img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
        }
        .df-chat-toggle .df-close-icon {
          position: absolute;
          background: rgba(0,0,0,0.55);
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        @keyframes df-pulse {
          0%,100% { box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 0 rgba(201,168,76,0.4); }
          50%      { box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 10px rgba(201,168,76,0); }
        }
        .df-chat-panel {
          position: absolute; bottom: 70px; right: 0;
          width: min(360px, 92vw);
          background: #0f0e0b;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.7);
          display: flex; flex-direction: column; max-height: 520px;
          transform-origin: bottom right;
          transition: opacity 0.25s, transform 0.25s;
        }
        .df-chat-panel.closed { opacity:0; transform:scale(0.92) translateY(8px); pointer-events:none; }
        .df-chat-panel.open   { opacity:1; transform:scale(1) translateY(0); }
        .df-chat-header {
          background: linear-gradient(135deg,rgba(201,168,76,0.15) 0%,rgba(201,168,76,0.05) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
          padding: 1rem 1.2rem;
          display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;
        }
        .df-chat-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          overflow: hidden; flex-shrink: 0;
          border: 1px solid rgba(201,168,76,0.3);
        }
        .df-chat-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .df-chat-header-text h4 { margin:0; font-size:0.88rem; font-weight:700; color:#f0ece4; }
        .df-chat-header-text p  { margin:0; font-size:0.65rem; color:rgba(201,168,76,0.7); letter-spacing:0.05em; text-transform:uppercase; }
        .df-online-dot { width:7px; height:7px; border-radius:50%; background:#4caf7d; margin-left:auto; flex-shrink:0; box-shadow:0 0 6px rgba(76,175,125,0.6); }
        .df-chat-messages {
          flex:1; overflow-y:auto; padding:1rem;
          display:flex; flex-direction:column; gap:0.75rem;
          scrollbar-width:thin; scrollbar-color:rgba(201,168,76,0.2) transparent;
        }
        .df-chat-messages::-webkit-scrollbar { width:4px; }
        .df-chat-messages::-webkit-scrollbar-thumb { background:rgba(201,168,76,0.2); border-radius:2px; }
        .df-greeting { font-size:0.83rem; line-height:1.65; color:rgba(240,236,228,0.75); }
        .df-greeting strong { color:#c9a84c; }
        .df-msg {
          max-width:85%; font-size:0.83rem; line-height:1.6;
          padding:0.65rem 0.9rem; border-radius:12px;
          animation:df-msg-in 0.2s ease;
        }
        @keyframes df-msg-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .df-msg.assistant { background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.12); color:rgba(240,236,228,0.88); align-self:flex-start; border-bottom-left-radius:4px; }
        .df-msg.user      { background:#c9a84c; color:#0f0e0b; align-self:flex-end; font-weight:500; border-bottom-right-radius:4px; }
        .df-typing { display:flex; gap:4px; align-items:center; padding:0.65rem 0.9rem; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.12); border-radius:12px; border-bottom-left-radius:4px; align-self:flex-start; }
        .df-typing span { width:6px; height:6px; border-radius:50%; background:rgba(201,168,76,0.6); animation:df-bounce 1.2s ease-in-out infinite; }
        .df-typing span:nth-child(2) { animation-delay:0.15s; }
        .df-typing span:nth-child(3) { animation-delay:0.3s; }
        @keyframes df-bounce { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-5px);opacity:1} }
        .df-suggestions { padding:0 1rem 0.75rem; display:flex; flex-wrap:wrap; gap:0.4rem; flex-shrink:0; }
        .df-suggestion { font-size:0.72rem; padding:0.3rem 0.7rem; border:1px solid rgba(201,168,76,0.3); border-radius:20px; background:transparent; color:rgba(201,168,76,0.8); cursor:pointer; transition:background 0.2s,color 0.2s; font-family:inherit; }
        .df-suggestion:hover { background:rgba(201,168,76,0.15); color:#c9a84c; }
        .df-chat-input-row { border-top:1px solid rgba(201,168,76,0.1); padding:0.75rem 1rem; display:flex; gap:0.5rem; align-items:center; flex-shrink:0; }
        .df-chat-input { flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(201,168,76,0.15); border-radius:8px; padding:0.55rem 0.8rem; color:#f0ece4; font-size:0.83rem; font-family:inherit; outline:none; transition:border-color 0.2s; }
        .df-chat-input::placeholder { color:rgba(240,236,228,0.25); }
        .df-chat-input:focus { border-color:rgba(201,168,76,0.4); }
        .df-chat-send { width:34px; height:34px; border-radius:8px; background:#c9a84c; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:background 0.2s,transform 0.15s; }
        .df-chat-send:hover { background:#d4b05a; transform:scale(1.05); }
        .df-chat-send:disabled { background:rgba(201,168,76,0.3); cursor:not-allowed; transform:none; }
      `}</style>

      <div className="df-chat-bubble">
        <div className={`df-chat-panel ${open ? 'open' : 'closed'}`}>

          {/* Header */}
          <div className="df-chat-header">
            <div className="df-chat-avatar">
              <img src="/Logo.jpeg" alt="Darjeeling First" />
            </div>
            <div className="df-chat-header-text">
              <h4>Darjeeling First</h4>
              <p>Ask me anything</p>
            </div>
            <div className="df-online-dot" />
          </div>

          {/* Messages */}
          <div className="df-chat-messages">
            {messages.length === 0 && (
              <div className="df-greeting">
                Hey! 👋 I&apos;m here to tell you about{' '}
                <strong>Darjeeling First</strong> — a group of friends cleaning
                up Darjeeling every Sunday. Ask me how to join, where we clean,
                or anything else!
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`df-msg ${m.role}`}>{m.content}</div>
            ))}
            {isTyping && (
              <div className="df-typing"><span /><span /><span /></div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="df-suggestions">
              {SUGGESTED.map(s => (
                <button key={s} className="df-suggestion" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="df-chat-input-row">
            <input
              ref={inputRef}
              className="df-chat-input"
              placeholder="Ask about Darjeeling First..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping}
            />
            <button
              className="df-chat-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l3 6-3 6 12-6z" fill="#0f0e0b" />
              </svg>
            </button>
          </div>
        </div>

        {/* Toggle button — Logo.jpeg as the icon, X overlay when open */}
        <button
          className="df-chat-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          style={{ position: 'relative' }}
        >
          <img src="/Logo.jpeg" alt="Darjeeling First" />
          {open && (
            <div className="df-close-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </button>
      </div>
    </>
  )
}
