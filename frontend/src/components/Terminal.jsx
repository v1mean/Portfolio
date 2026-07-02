import { useState, useRef, useEffect } from 'react';

const WELCOME = `Welcome to Vimean's Terminal v1.0.0
Type 'help' to see available commands.
`;

const ASCII_NAME = `
 __   __ _                         
 \\ \\ / /(_) _ __ ___    ___   __ _ _ __  
  \\ V / | || '_ \` _ \\  / _ \\ / _\` | '_ \\ 
   | |  | || | | | | ||  __/| (_| | | | |
   |_|  |_||_| |_| |_| \\___| \\__,_|_| |_|
`;

const COMMANDS = {
  help: () => `Available commands:
  whoami       - About me
  skills       - My technical skills
  projects     - List my projects
  contact      - How to reach me
  experience   - My education & experience
  services     - What I offer
  ascii        - Display my name in ASCII
  clear        - Clear the terminal
  history      - Show command history
  pwd          - Print working directory
  ls           - List "files"
  cat resume   - Display resume summary
  sudo hire-me - Execute special command 😄
  exit         - Close terminal`,

  whoami: () => `Ngorn Vimean
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role     : Full-Stack Developer
Student  : Software Engineering
Uni      : Finishing Bachelor's in 2028
ID       : 6025010008
Location : Cambodia
Hobby    : Building cool websites
Status   : Available for opportunities 🟢`,

  skills: () => `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Languages  : C/C++ | Java | Python | JavaScript
Frontend   : HTML5 | CSS3 | React | Tailwind CSS
Backend    : Node.js | REST API | Express.js
Databases  : MongoDB | MySQL | Redis
Cloud      : AWS | Vercel | Firebase
Tools      : Git | GitHub | VSCode | Figma`,

  projects: () => `My Projects (visit /projects for details):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] E-Commerce Platform    → React, Node.js, MongoDB
[2] Task Management App    → React, Firebase
[3] AI Image Classifier    → Python, Flask, TensorFlow
[+] More at /admin → Seed Data`,

  contact: () => `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email    : meanv081@gmail.com
🐙 GitHub   : github.com/v1mean
📱 Telegram : 092401458
🌐 Portfolio: localhost:5173`,

  experience: () => `Education & Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
2022 - 2024  High School          Grade B
2024 - 2028  Bachelor's Degree    Software Engineering (ongoing)
2025 - 2025  Web Dev Internship   Vue.js + Firebase (Current)
Total XP     3 years coding experience`,

  services: () => `Services I Offer:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Web Development         Full-stack web apps
⚙️  API Development         RESTful API design
🗄️  Database Design         MongoDB, MySQL, Redis
🐛 Bug Fixing              Debugging & testing
⚡ Performance Optimization  Lighthouse 90+ scores
☁️  Deployment              AWS, Vercel, Firebase`,

  ascii: () => ASCII_NAME,

  pwd: () => `/home/vimean/portfolio`,

  ls: () => `about.md   skills.json   projects/   resume.pdf
contact.txt experience.json services.md  blog/`,

  'cat resume': () => `===== NGORN VIMEAN - RÉSUMÉ =====
Full-Stack Developer | SE Student

EDUCATION
• High School — Grade B (2022-2024)
• Bachelor of SE — In Progress (2024-2028)

EXPERIENCE  
• Web Dev Intern — Vue.js + Firebase (2025)

SKILLS
• React, Node.js, MongoDB, AWS, Python...

CONTACT
• meanv081@gmail.com | github.com/v1mean
===================================`,

  'sudo hire-me': () => `[sudo] password for vimean: ••••••••
Verifying credentials...
✅ Permission GRANTED
🚀 Executing hire-me protocol...
📬 Sending offer to meanv081@gmail.com...
✨ Welcome aboard! Let's build something great!`,

  history: null, // handled dynamically
  clear: null,   // handled specially
  exit: null,    // handled specially
};

export default function Terminal({ open, onClose }) {
  const [lines, setLines] = useState([{ type: 'output', text: WELCOME, style: 'accent' }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...lines, { type: 'input', text: cmd }];

    if (cmd === 'clear') {
      setLines([{ type: 'output', text: 'Terminal cleared. Type "help" for commands.', style: 'muted' }]);
      setCmdHistory((h) => [raw, ...h]);
      setHistoryIdx(-1);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      onClose();
      setInput('');
      return;
    }

    if (cmd === 'history') {
      const histText = cmdHistory.length
        ? cmdHistory.map((h, i) => `  ${cmdHistory.length - i}  ${h}`).join('\n')
        : '  (no history yet)';
      newLines.push({ type: 'output', text: histText, style: '' });
    } else if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      newLines.push({ type: 'output', text: result, style: cmd === 'sudo hire-me' ? 'accent' : '' });
    } else {
      newLines.push({
        type: 'output',
        text: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
        style: 'error',
      });
    }

    setLines(newLines);
    setCmdHistory((h) => [raw, ...h]);
    setHistoryIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      if (cmdHistory[nextIdx]) setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="terminal-titlebar">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <div className="terminal-titlebar-text">vimean@portfolio ~ zsh</div>
          <button className="terminal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">
              {line.type === 'input' ? (
                <>
                  <span className="terminal-prompt-sym">vimean@portfolio:~$</span>
                  <span className="terminal-cmd">{line.text}</span>
                </>
              ) : (
                <span className={`terminal-output ${line.style || ''}`}>{line.text}</span>
              )}
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="terminal-input-row">
          <span className="terminal-input-prompt">vimean@portfolio:~$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            spellCheck={false}
            id="terminal-input"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
