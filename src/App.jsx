import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Star, GitBranch, BookOpen, MapPin, Users, 
  Code, Cpu, Mail, ChevronRight, Activity, Calendar, Award, 
  Zap, Palette, Printer, X, Share2,
  RefreshCw, Search, Trophy, ArrowUp,
  Rocket, History, Command, Key,
  ExternalLink, Edit, User, Globe, Sparkles
} from 'lucide-react';

// Özel Github İkonu
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

// Özel Twitter İkonu
const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

// --- DİLE ÖZEL TİPOGRAFİK İKONLAR ---
const LanguageLogo = ({ language, className, style }) => {
  const lang = language?.toLowerCase() || '';
  if (lang === 'javascript') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>JS</span>;
  if (lang === 'typescript') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>TS</span>;
  if (lang === 'python') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>PY</span>;
  if (lang === 'html') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '2.5rem', ...style }}>HTML</span>;
  if (lang === 'css') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '2.5rem', ...style }}>CSS</span>;
  if (lang === 'java') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '2.5rem', ...style }}>JAVA</span>;
  if (lang === 'c++') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>C++</span>;
  if (lang === 'c#') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>C#</span>;
  if (lang === 'php') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>PHP</span>;
  if (lang === 'go') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>GO</span>;
  if (lang === 'rust') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>RS</span>;
  if (lang === 'ruby') return <span className={`font-black tracking-tighter ${className}`} style={{ fontSize: '3rem', ...style }}>RB</span>;
  
  return <Code className={className} style={{ width: '3rem', height: '3rem', ...style }} />;
};

// --- TEMA MOTORU KONFİGÜRASYONU ---
const THEMES = {
  emerald: {
    id: 'emerald', name: 'Matrix', hexColor: '10b981', 
    primaryText: 'text-emerald-500', secondaryText: 'text-emerald-400', primaryBg: 'bg-emerald-500',
    badgeBg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/50',
    hoverText: 'group-hover:text-emerald-400', gradientText: 'from-emerald-400 to-cyan-500', shadow: 'hover:shadow-emerald-500/10'
  },
  violet: {
    id: 'violet', name: 'Cyberpunk', hexColor: '8b5cf6',
    primaryText: 'text-violet-500', secondaryText: 'text-violet-400', primaryBg: 'bg-violet-500',
    badgeBg: 'bg-violet-500/10', border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-500/50',
    hoverText: 'group-hover:text-violet-400', gradientText: 'from-violet-400 to-fuchsia-500', shadow: 'hover:shadow-violet-500/10'
  },
  rose: {
    id: 'rose', name: 'Sunset', hexColor: 'f43f5e',
    primaryText: 'text-rose-500', secondaryText: 'text-rose-400', primaryBg: 'bg-rose-500',
    badgeBg: 'bg-rose-500/10', border: 'border-rose-500/20', hoverBorder: 'hover:border-rose-500/50',
    hoverText: 'group-hover:text-rose-400', gradientText: 'from-rose-400 to-orange-500', shadow: 'hover:shadow-rose-500/10'
  },
  blue: {
    id: 'blue', name: 'Ocean', hexColor: '3b82f6',
    primaryText: 'text-blue-500', secondaryText: 'text-blue-400', primaryBg: 'bg-blue-500',
    badgeBg: 'bg-blue-500/10', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/50',
    hoverText: 'group-hover:text-blue-400', gradientText: 'from-blue-400 to-cyan-500', shadow: 'hover:shadow-blue-500/10'
  }
};

const getLanguageGradient = (language) => {
  const map = {
    'JavaScript': 'from-yellow-400 to-yellow-600',
    'TypeScript': 'from-blue-400 to-blue-600',
    'Python': 'from-blue-500 to-yellow-400',
    'Java': 'from-red-500 to-orange-500',
    'C++': 'from-indigo-500 to-purple-600',
    'C#': 'from-green-500 to-emerald-700',
    'HTML': 'from-orange-400 to-rose-500',
    'CSS': 'from-blue-300 to-blue-500',
    'PHP': 'from-purple-400 to-indigo-600',
    'Go': 'from-cyan-400 to-blue-500',
    'Rust': 'from-orange-500 to-red-600',
    'Ruby': 'from-red-500 to-rose-700',
    'Swift': 'from-orange-400 to-rose-500',
    'Vue': 'from-emerald-400 to-emerald-600',
    'Dart': 'from-orange-400 to-red-500'
  };
  return map[language] || 'from-slate-700 to-slate-900';
};

// --- SÖZLÜK (Çoklu Dil Desteği) ---
const DICT = {
  TR: {
    hiIm: "Merhaba, ben",
    projects: 'Projeler', articles: 'Makaleler', journey: 'Yolculuk', contact: 'İletişim',
    theme: 'Tema', share: 'Paylaş', print: 'PDF', refresh: 'Yenile',
    available: 'Yeni fırsatlara açık',
    coreTech: 'Temel Teknolojiler', langDist: 'Dil Dağılımı',
    devJourney: 'Yazılımcı Yolculuğu', featured: 'Öne Çıkan Projeler', search: 'Projelerde ara...',
    noProject: 'Aramanıza uygun proje bulunamadı.',
    recentArticles: 'Son Makaleler', analytics: 'GitHub Analitikleri',
    stars: 'Toplam Yıldız', forks: 'Toplam Fork', repos: 'Açık Projeler',
    contrib: 'Katkı Aktivitesi (Son 1 Yıl)', achievements: 'Başarılar',
    buildTitle: 'Harika bir şeyler inşa edelim.',
    buildDesc: 'İster vizyoner bir projeniz olsun, ister teknik danışmanlık isteyin, mesaj kutum her zaman açık.',
    sayHello: 'Merhaba De', follow: 'GitHub\'da Takip Et', rights: 'Tüm hakları saklıdır.',
    joined: 'GitHub\'a Katıldı', joinedDesc: 'Hesap oluşturuldu ve açık kaynak yolculuğu başladı.',
    firstRepo: 'İlk Herkese Açık Proje', firstRepoDesc: 'Yayınlandı ve topluluğa ilk adım atıldı.',
    latestRepo: 'En Yeni Geliştirme', latestRepoDesc: 'Şu anki aktif odak noktası ve geliştirme süreci devam ediyor.',
    demoFill: 'Demoyu Doldur', getKey: 'Ücretsiz API anahtarı al', genPort: 'Portfolyoyu Oluştur',
    defaultBio: 'Ölçeklenebilir uygulamalar oluşturma ve açık kaynak topluluğuna katkıda bulunma tutkusu olan geliştirici.',
    noDesc: 'Açıklama bulunmuyor.'
  },
  EN: {
    hiIm: "Hi, I'm",
    projects: 'Projects', articles: 'Articles', journey: 'Journey', contact: 'Contact',
    theme: 'Theme', share: 'Share', print: 'PDF', refresh: 'Refresh',
    available: 'Available for new opportunities',
    coreTech: 'Core Technologies', langDist: 'Language Distribution',
    devJourney: 'My Developer Journey', featured: 'Featured Projects', search: 'Search projects...',
    noProject: 'No projects found matching your search.',
    recentArticles: 'Recent Articles', analytics: 'GitHub Analytics',
    stars: 'Total Stars Earned', forks: 'Total Forks', repos: 'Public Repositories',
    contrib: 'Contribution Activity (Last Year)', achievements: 'Developer Achievements',
    buildTitle: 'Let\'s build something amazing together.',
    buildDesc: 'Whether you have a visionary project in mind, need a technical consultation, or just want to connect, my inbox is always open.',
    sayHello: 'Say Hello', follow: 'Follow on GitHub', rights: 'All rights reserved.',
    joined: 'Joined GitHub', joinedDesc: 'Created account and started the open-source journey.',
    firstRepo: 'First Public Repository', firstRepoDesc: 'Published and established a public presence.',
    latestRepo: 'Latest Milestone', latestRepoDesc: 'Continuously improving. Current active focus.',
    demoFill: 'Fill Demo', getKey: 'Get free API key', genPort: 'Generate Portfolio',
    defaultBio: 'Full-stack developer passionate about building scalable applications and contributing to open-source.',
    noDesc: 'No description provided.'
  }
};

// --- YENİ EKLENTİLER ---

// Scroll İlerleme Çubuğu
const ScrollProgress = ({ theme }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 z-[100] w-full print:hidden">
      <div 
        className={`h-full ${theme.primaryBg} transition-all duration-150 shadow-[0_0_15px_currentColor] ease-out`} 
        style={{ width: progress }}
      ></div>
    </div>
  );
};

// Özel Hacker İmleci
const CustomCursor = ({ theme }) => {
  const cursorRef = useRef(null);
  const outerCursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && outerCursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        // Dış halka biraz gecikmeli gelsin
        setTimeout(() => {
          if(outerCursorRef.current) outerCursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, 50);
      }
    };
    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT'].includes(e.target.tagName) || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Mobilde imleci gizliyoruz, masaüstünde gösteriyoruz
  return (
    <div className="hidden md:block pointer-events-none print:hidden">
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full ${theme.primaryBg} z-[9999] transition-all duration-200 ease-out shadow-[0_0_10px_currentColor] ${isHovering ? 'scale-[2.5] opacity-40' : 'scale-100 opacity-100'}`}
      ></div>
      <div 
        ref={outerCursorRef} 
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border ${theme.border} z-[9998] transition-all duration-300 ease-out ${isHovering ? 'scale-150 opacity-0 border-transparent' : 'scale-100 opacity-50'}`}
      ></div>
    </div>
  );
};

// --- API & UTILS ---
const GITHUB_API_BASE = 'https://api.github.com/users';
const DEVTO_API_BASE = 'https://dev.to/api/articles?username=';

const fetchDevToArticles = async (username) => {
  try {
    const res = await fetch(`${DEVTO_API_BASE}${username}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("DevTo Error:", err);
    return [];
  }
};

const callGemini = async (prompt, userApiKey, addLog) => {
  const cleanKey = userApiKey ? userApiKey.trim() : '';
  if (!cleanKey) return null;

  let targetModel = 'gemini-1.5-flash';

  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
    const listRes = await fetch(listUrl);
    
    if (listRes.ok) {
      const listData = await listRes.json();
      const validModels = (listData.models || []).filter(m => 
        m.supportedGenerationMethods?.includes('generateContent') && 
        m.name.includes('gemini')
      );
      
      if (validModels.length > 0) {
        const preferredModel = validModels.find(m => m.name.includes('flash')) || validModels[0];
        targetModel = preferredModel.name.replace('models/', '');
      }
    }
  } catch (e) {}

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${cleanKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
      }

      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || response.statusText;
      
      if (response.status === 400 || response.status === 401 || response.status === 403) {
         if (addLog) await addLog(`[ERROR] API Anahtarı Geçersiz veya Yasaklı! Lütfen yeni anahtar alın.`, 100);
         return null;
      }
      
      if (attempt === delays.length) {
         if (addLog) await addLog(`[ERROR] Google API Sunucuları Çok Yoğun (${targetModel}). Lütfen daha sonra tekrar deneyin.`, 100);
         return null;
      }

      await new Promise(resolve => setTimeout(resolve, delays[attempt]));

    } catch (err) {
      if (attempt === delays.length) {
         if (addLog) await addLog(`[ERROR] Bağlantı Hatası: Ağınızı kontrol edin.`, 100);
         return null;
      }
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
    }
  }
  
  return null;
};

const fetchGitHubData = async (username) => {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/${username}`),
      fetch(`${GITHUB_API_BASE}/${username}/repos?per_page=100&sort=updated`)
    ]);

    if (!profileRes.ok) throw new Error('Kullanıcı bulunamadı veya API limiti aşıldı.');
    
    const profile = await profileRes.json();
    const repos = await reposRes.json();
    return { profile, repos, error: null };
  } catch (err) {
    return { profile: null, repos: [], error: err.message };
  }
};

const analyzeData = (profile, repos) => {
  let totalStars = 0;
  let totalForks = 0;
  const languageMap = {};

  const rankedRepos = repos
    .filter(repo => !repo.fork) 
    .map(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }

      const daysSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 100 - daysSinceUpdate) * 0.5; 
      const score = (repo.stargazers_count * 10) + (repo.forks_count * 5) + recencyScore;

      return { 
        ...repo, 
        aiScore: score,
        topics: repo.topics || [], 
        homepage: repo.homepage || null 
      };
    })
    .sort((a, b) => b.aiScore - a.aiScore);

  const topLanguages = Object.entries(languageMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([name]) => name);

  const totalWithLang = Object.values(languageMap).reduce((a, b) => a + b, 0);
  const languageStats = Object.entries(languageMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)
    .map(([name, count]) => ({ 
      name, 
      percentage: Math.round((count / totalWithLang) * 100) 
    }));

  const achievements = [];
  if (totalStars > 10) achievements.push({ id: 'star', title: 'Stargazer', desc: 'Topluluktan yüksek beğeni aldı' });
  if (topLanguages.length >= 4) achievements.push({ id: 'polyglot', title: 'Polyglot', desc: "4'ten fazla dilde kod yazıyor" });
  if (repos.length >= 10) achievements.push({ id: 'machine', title: 'Code Machine', desc: '10+ açık kaynak proje üretti' });
  if (totalForks > 5) achievements.push({ id: 'collab', title: 'Collaborator', desc: 'Projeleri başkalarınca geliştirildi' });

  const joinYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear();
  const sortedByCreated = [...repos].filter(r => !r.fork).sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  const oldestRepo = sortedByCreated.length > 0 ? sortedByCreated[0] : null;
  const newestRepo = rankedRepos.length > 0 ? rankedRepos[0] : null; 

  const journey = {
    joinYear,
    oldestRepo: oldestRepo ? { name: oldestRepo.name, year: new Date(oldestRepo.created_at).getFullYear() } : null,
    newestRepo: newestRepo ? { name: newestRepo.name, year: new Date(newestRepo.updated_at).getFullYear() } : null,
  };

  return {
    featuredProjects: rankedRepos.slice(0, 6),
    stats: { totalStars, totalForks, repoCount: repos.length },
    topLanguages,
    languageStats,
    achievements,
    journey
  };
};

// --- BİLEŞENLER ---

const TiltCard = ({ children, className, style }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15; 
    const y = -(e.clientY - top - height / 2) / 15;
    
    setTiltStyle({ 
      transform: `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `0 20px 40px -15px rgba(0,0,0,0.5), ${-x}px ${y}px 20px rgba(255,255,255,0.05)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ 
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    });
  };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      className={`transition-all duration-200 ease-out ${className}`} 
      style={{ ...style, ...tiltStyle }}
    >
      {children}
    </div>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0'; 
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none"></canvas>;
};

const LoadingTerminal = ({ logs }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const progress = Math.min((logs.length / 11) * 100, 100);

  const getLogColor = (log) => {
    if (log.includes('[ERROR]') || log.includes('[ABORT]')) return 'text-rose-400';
    if (log.includes('[WARN]')) return 'text-yellow-400';
    if (log.includes('[SUCCESS]')) return 'text-emerald-400';
    if (log.includes('[AI ENGINE]')) return 'text-fuchsia-400';
    if (log.includes('[NETWORK]')) return 'text-cyan-400';
    if (log.includes('[BUILD]') || log.includes('[MODULE]')) return 'text-yellow-400';
    return 'text-slate-300';
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative group mt-8">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-[1.5rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col h-[350px]">
        <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
            <Activity className="w-3 h-3 animate-spin text-cyan-400" />
            devportfolio-compiler.exe
          </div>
          <div className="w-12"></div>
        </div>

        <div className="p-6 font-mono text-sm overflow-y-auto flex-1 custom-scrollbar relative bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]">
          {logs.map((log, i) => {
            const match = log.match(/(\[.*?\])(.*)/);
            const tag = match ? match[1] : '';
            const message = match ? match[2] : log;

            return (
              <div key={i} className="mb-3 flex items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-slate-600 mr-3 shrink-0">{'>'}</span>
                <span>
                  {tag && <span className={`${getLogColor(log)} font-bold mr-2`}>{tag}</span>}
                  <span className="text-slate-300">{message}</span>
                </span>
              </div>
            );
          })}
          
          <div className="flex items-start mt-1">
            <span className="text-emerald-500 mr-3">{'>'}</span>
            <span className="w-2.5 h-4 bg-emerald-400 animate-pulse mt-0.5"></span>
          </div>
          <div ref={bottomRef} />
        </div>

        <div className="h-1.5 w-full bg-[#111] relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5"></div>
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 blur-[2px]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

const InteractiveTerminal = ({ profile, topLanguages, stats, theme, onMatrixTrigger }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: `Welcome to DevOS v1.0.0. User: ${profile.login}` },
    { type: 'system', text: `Type 'help' to see available commands.` }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: whoami, skills, stats, contact, clear, sudo, matrix';
        break;
      case 'whoami':
        response = `${profile.name || profile.login} - Software Developer`;
        break;
      case 'skills':
        response = `Top Languages: ${topLanguages.join(', ')}`;
        break;
      case 'stats':
        response = `Stars: ${stats.totalStars} | Forks: ${stats.totalForks} | Repos: ${stats.repoCount}`;
        break;
      case 'contact':
        response = profile.email ? `Email: ${profile.email}` : 'No public email available. Check social links.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        response = 'nice try. this incident will be reported.';
        break;
      case 'matrix':
        response = 'Wake up, Neo... The Matrix has you.';
        onMatrixTrigger(); 
        break;
      default:
        response = `command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { type: 'input', text: `$ ${input}` }, { type: 'system', text: response }]);
    setInput('');
  };

  return (
    <div className="w-full max-w-md relative print:hidden z-10 hover:scale-[1.02] transition-transform duration-500 group cursor-text">
      <div className={`absolute inset-0 bg-gradient-to-tr ${theme.gradientText} rounded-2xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse`}></div>
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col h-64">
        <div className="bg-black/40 px-4 py-3 flex items-center gap-2 border-b border-white/5" onClick={() => {
          const inputEl = document.getElementById('term-input');
          if (inputEl) inputEl.focus();
        }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Command className="w-3 h-3" /> bash - {profile.login}
          </div>
        </div>
        
        <div className="p-5 font-mono text-sm overflow-y-auto flex-1 custom-scrollbar relative" onClick={() => {
          const inputEl = document.getElementById('term-input');
          if (inputEl) inputEl.focus();
        }}>
          {history.map((line, idx) => (
            <div key={idx} className={line.type === 'input' ? 'text-slate-400 mb-1' : `${theme.primaryText} mb-3 drop-shadow-sm`}>
              {line.text}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex text-slate-400">
            <span>$</span>
            <input 
              id="term-input"
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-white ml-2 focus:ring-0 cursor-text"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

const QuickConnectWidget = ({ profile, theme, onPrint, onShare, langState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const lang = DICT[langState];

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden flex flex-col items-end">
      {isOpen && (
        <div className="bg-[#111] border border-slate-800 rounded-2xl w-64 mb-4 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className={`p-4 border-b border-slate-800 ${theme.primaryBg} flex justify-between items-center text-white`}>
            <div className="flex items-center gap-2 font-semibold">
              <Zap className="w-4 h-4" /> Quick Connect
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Menüyü Kapat" className="hover:bg-white/20 p-1 rounded-md transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-2 flex flex-col gap-1">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm text-slate-300 hover:text-white cursor-pointer">
                <Mail className={`w-4 h-4 ${theme.primaryText}`} /> {lang.sayHello}
              </a>
            )}
            <button onClick={onPrint} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm text-slate-300 hover:text-white w-full text-left cursor-pointer">
              <Printer className={`w-4 h-4 ${theme.primaryText}`} /> {lang.print}
            </button>
            <button onClick={onShare} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm text-slate-300 hover:text-white w-full text-left cursor-pointer">
              <Share2 className={`w-4 h-4 ${theme.primaryText}`} /> {lang.share}
            </button>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm text-slate-300 hover:text-white cursor-pointer">
              <GithubIcon className={`w-4 h-4 ${theme.primaryText}`} /> {lang.follow}
            </a>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hızlı İletişim Menüsünü Aç"
        className={`w-14 h-14 rounded-full ${theme.primaryBg} text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform duration-300 relative cursor-pointer`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <User className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20 border-2 border-current"></span>
          </span>
        )}
      </button>
    </div>
  );
};

// --- PORTFOLYO ŞABLONU ---

const PortfolioTemplate = ({ data, onRefresh }) => {
  const [themeKey, setThemeKey] = useState('emerald');
  const [langState, setLangState] = useState('TR');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false); 
  
  const theme = THEMES[themeKey];
  const lang = DICT[langState];
  const { profile, featuredProjects, stats, topLanguages, languageStats, articles, achievements, journey } = data;

  const glowRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    document.title = `${profile.name || profile.login} | Portfolio`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = profile.avatar_url;
  }, [profile]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
        timeout = null;
      }, 150); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        requestAnimationFrame(() => {
          glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  const handlePrint = () => window.print();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?user=${profile.login}`;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareUrl);
    } else {
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = shareUrl;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    }
    
    setToastMessage('Link Kopyalandı!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleLang = () => {
    setLangState(prev => prev === 'TR' ? 'EN' : 'TR');
  };

  const availableLangs = ['All', ...new Set(featuredProjects.map(p => p.language).filter(Boolean))];
  const filteredProjects = featuredProjects.filter(p => {
    const matchesFilter = activeFilter === 'All' || p.language === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.aiDescription || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-[#050505] text-slate-200 font-sans print:bg-white print:text-black relative overflow-hidden ${isMatrixMode ? 'hue-rotate-[50deg] saturate-150' : ''}`}>
      
      <ScrollProgress theme={theme} />
      <CustomCursor theme={theme} />

      {isMatrixMode && <MatrixRain />}

      {!isMatrixMode && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 print:hidden transition-all duration-1000"></div>
      )}

      <div className="pointer-events-none fixed inset-0 z-0 print:hidden overflow-hidden">
         <div 
           ref={glowRef}
           className={`absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] ${theme.primaryBg} mix-blend-screen transition-transform duration-75 ease-out`} 
           style={{ transform: `translate(-1000px, -1000px)` }} 
         />
      </div>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-white text-black px-4 py-2 rounded-full shadow-2xl font-medium animate-in slide-in-from-top-4 fade-in">
          {toastMessage}
        </div>
      )}

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl print:hidden transition-all duration-300">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          
          <div className="font-bold text-lg md:text-xl tracking-tighter flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className={`p-2 rounded-xl ${theme.badgeBg} border border-white/5 group-hover:scale-110 transition-transform`}>
              <Terminal className={`w-5 h-5 ${theme.primaryText}`} />
            </div>
            <span className="hidden sm:block">{profile.login}<span className={`${theme.primaryText}`}>.dev</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-white transition-colors cursor-pointer">{lang.projects}</a>
            {articles && articles.length > 0 && <a href="#articles" className="hover:text-white transition-colors cursor-pointer">{lang.articles}</a>}
            {journey && <a href="#journey" className="hover:text-white transition-colors cursor-pointer">{lang.journey}</a>}
            <a href="#contact" className="hover:text-white transition-colors cursor-pointer">{lang.contact}</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            
            <div className="relative">
              <button aria-label="Tema Değiştir" onClick={() => setShowThemeMenu(!showThemeMenu)} className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                <Palette className="w-4 h-4" /> <span className="hidden lg:block text-xs font-semibold">{lang.theme}</span>
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-slate-800 rounded-xl shadow-2xl p-2 flex flex-col gap-1">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      aria-label={`${t.name} temasını seç`}
                      onClick={() => { setThemeKey(t.id); setShowThemeMenu(false); }}
                      className={`text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${themeKey === t.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300'} cursor-pointer`}
                    >
                      <span className={`w-3 h-3 rounded-full ${t.primaryBg} shadow-[0_0_8px_currentColor]`}></span> {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={toggleLang} className="px-2 py-1 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors cursor-pointer font-bold text-xs" title="Dil Değiştir">
                {langState}
              </button>
              <button onClick={handleShare} aria-label="Linki Paylaş" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors cursor-pointer" title="Paylaş">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={handlePrint} aria-label="PDF Olarak Yazdır" className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.badgeBg} ${theme.secondaryText} hover:brightness-125 border border-transparent hover:border-white/5 transition-all text-xs font-bold tracking-wide cursor-pointer`} title="PDF Olarak Yazdır">
                <Printer className="w-4 h-4" /> PDF
              </button>
              <button onClick={onRefresh} aria-label="Verileri Güncelle" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors group cursor-pointer" title="Verileri Güncelle">
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

            <a href={profile.html_url} target="_blank" rel="noreferrer" aria-label="GitHub Profiline Git" className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl ${theme.primaryBg} text-white font-bold hover:scale-105 transition-all text-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer`}>
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 print:pt-10 print:pb-10 min-h-[80vh] justify-center z-10">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none print:hidden -z-10">
          {topLanguages && topLanguages.length >= 3 && !isMatrixMode && (
            <>
              <div className={`absolute top-[20%] left-[10%] opacity-10 animate-bounce duration-[3000ms]`}>
                 <LanguageLogo language={topLanguages[0]} className={`${theme.primaryText}`} />
              </div>
              <div className={`absolute top-[60%] right-[15%] opacity-10 animate-pulse duration-[4000ms]`}>
                 <LanguageLogo language={topLanguages[1]} className={`${theme.primaryText}`} />
              </div>
              <div className={`absolute bottom-[10%] left-[25%] opacity-10 animate-bounce duration-[5000ms]`}>
                 <LanguageLogo language={topLanguages[2]} className={`${theme.primaryText}`} />
              </div>
            </>
          )}
        </div>

        <div className="flex-1 space-y-6 relative z-10 bg-[#0a0a0a]/50 p-6 md:p-0 rounded-2xl md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.secondaryText} border ${theme.border} text-sm font-medium print:hidden`}>
            <Zap className="w-4 h-4 animate-pulse" /> {lang.available}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white print:text-black leading-tight">
            {lang.hiIm} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} print:text-black print:bg-none`}>{profile.name || profile.login}</span>
          </h1>
          
          <div className="relative group">
            <p className="text-xl text-slate-400 print:text-slate-700 max-w-2xl leading-relaxed">
              {data.aiBio ? (typeof data.aiBio === 'string' ? data.aiBio : data.aiBio[langState]) : profile.bio || lang.defaultBio}
            </p>
            {data.aiBio && (
              <div className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${theme.secondaryText} ${theme.badgeBg} px-2.5 py-1 rounded-full border ${theme.border} print:hidden`}>
                <Sparkles className="w-3.5 h-3.5" /> AI Optimized Profile
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4 print:text-slate-600">
            {profile.location && (
              <div className="flex items-center gap-2 text-slate-400 print:text-slate-600">
                <MapPin className="w-4 h-4" /> {profile.location}
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-400 print:text-slate-600">
              <Users className="w-4 h-4" /> {profile.followers} Followers
            </div>
            {profile.company && (
              <div className="flex items-center gap-2 text-slate-400 print:text-slate-600">
                <BookOpen className="w-4 h-4" /> {profile.company}
              </div>
            )}
          </div>
        </div>
        
        <InteractiveTerminal profile={profile} topLanguages={topLanguages} stats={stats} theme={theme} onMatrixTrigger={() => setIsMatrixMode(true)} />

      </section>

      <section ref={statsRef} className="py-12 border-y border-white/5 bg-white/[0.02] print:border-y-slate-200 print:bg-transparent relative z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-slate-500 print:text-slate-800 uppercase tracking-wider mb-6">
              {lang.coreTech}
            </div>
            <div className="flex flex-wrap gap-3">
              {topLanguages.map(l => (
                <span key={l} className="px-4 py-2 rounded-xl bg-white/[0.03] print:bg-white border border-white/10 text-slate-300 print:text-slate-800 print:border-slate-300 text-sm flex items-center gap-2 hover:border-white/30 hover:bg-white/[0.06] hover:-translate-y-1 transition-all cursor-default shadow-sm hover:shadow-lg">
                  <Code className={`w-4 h-4 ${theme.secondaryText}`} /> {l}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 border-l border-white/5 pl-0 md:pl-12 print:border-slate-200">
            <div className="text-sm font-semibold text-slate-500 print:text-slate-800 uppercase tracking-wider mb-2">
              {lang.langDist}
            </div>
            {languageStats && languageStats.map(stat => (
              <div key={stat.name} className="space-y-1.5 group">
                <div className="flex justify-between text-xs font-medium text-slate-400 print:text-slate-700">
                  <span className={`${theme.hoverText} transition-colors`}>{stat.name}</span>
                  <span className={`${theme.hoverText} transition-colors`}>{isStatsVisible ? stat.percentage : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 print:bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${theme.primaryBg} rounded-full transition-all duration-[1500ms] ease-out group-hover:brightness-125`}
                    style={{ width: `${isStatsVisible ? stat.percentage : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {journey && (
        <section id="journey" className="py-24 px-6 max-w-4xl mx-auto print:py-10 relative z-10">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <History className={`w-8 h-8 ${theme.primaryText}`} />
            <h2 className="text-3xl font-bold text-white print:text-black">{lang.devJourney}</h2>
          </div>
          
          <div className="relative ml-2 md:ml-1/2 space-y-12 pb-4">
            
            <div className={`absolute left-[15px] md:left-[23px] top-2 bottom-0 w-0.5 bg-gradient-to-b ${theme.gradientText} opacity-30 print:hidden`}></div>
            <div className={`absolute left-[15px] md:left-[23px] top-2 bottom-0 w-[1px] bg-slate-200 hidden print:block`}></div>

            <div className="relative pl-10 md:pl-16 group animate-in slide-in-from-bottom-8 duration-700">
              <div className={`absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full ${theme.primaryBg} ring-4 ring-[#0a0a0a] shadow-[0_0_15px_currentColor] group-hover:scale-125 transition-transform`}></div>
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/[0.04] hover:border-white/20 transition-all">
                <span className={`text-sm font-bold ${theme.secondaryText} mb-2 block`}>{journey.joinYear}</span>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-slate-400" /> {lang.joined}</h3>
                <p className="text-slate-400 text-sm">{lang.joinedDesc}</p>
              </div>
            </div>

            {journey.oldestRepo && (
              <div className="relative pl-10 md:pl-16 group animate-in slide-in-from-bottom-8 duration-700 delay-150">
                <div className={`absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full bg-slate-700 ring-4 ring-[#0a0a0a] group-hover:${theme.primaryBg} shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_15px_currentColor] group-hover:scale-125 transition-all`}></div>
                <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/[0.04] hover:border-white/20 transition-all">
                  <span className={`text-sm font-bold ${theme.secondaryText} mb-2 block`}>{journey.oldestRepo.year}</span>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Code className="w-5 h-5 text-slate-400" /> {lang.firstRepo}</h3>
                  <p className="text-slate-400 text-sm">{lang.firstRepoDesc} <span className="text-white font-mono bg-white/10 px-1 rounded">{journey.oldestRepo.name}</span></p>
                </div>
              </div>
            )}

            {journey.newestRepo && (
              <div className="relative pl-10 md:pl-16 group animate-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className={`absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full ${theme.primaryBg} ring-4 ring-[#0a0a0a] shadow-[0_0_15px_currentColor] group-hover:scale-125 transition-transform animate-pulse group-hover:animate-none`}></div>
                <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/30 transition-all relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme.primaryBg} opacity-5 blur-[50px] rounded-full`}></div>
                  <span className={`text-sm font-bold ${theme.secondaryText} mb-2 block`}>{journey.newestRepo.year} (Present)</span>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Rocket className="w-5 h-5 text-white" /> {lang.latestRepo}</h3>
                  <p className="text-slate-400 text-sm">{lang.latestRepoDesc} <span className="text-white font-mono bg-white/10 px-1 rounded">{journey.newestRepo.name}</span>.</p>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto print:py-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 print:mb-6">
          <div className="flex items-center gap-3">
            <Cpu className={`w-8 h-8 ${theme.primaryText}`} />
            <h2 className="text-3xl font-bold text-white print:text-black">{lang.featured}</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 print:hidden">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder={lang.search} 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Projelerde Ara"
                className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-slate-500 focus:bg-white/[0.05] w-full sm:w-48 transition-all cursor-text"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {availableLangs.map(langOpt => (
                <button 
                  key={langOpt}
                  aria-label={`${langOpt} projelerini filtrele`}
                  onClick={() => setActiveFilter(langOpt)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === langOpt 
                      ? `${theme.primaryBg} text-white shadow-[0_0_15px_rgba(0,0,0,0.3)] scale-105` 
                      : `bg-white/[0.03] backdrop-blur-sm text-slate-400 border border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.06] hover:scale-105`
                  }`}
                >
                  {langOpt}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((repo, idx) => (
            <TiltCard key={repo.id} className="h-full animate-in slide-in-from-bottom-8 fade-in zoom-in fill-mode-both" style={{ animationDelay: `${idx * 150}ms`, animationDuration: '700ms' }}>
              <div onClick={() => window.open(repo.html_url, '_blank')} className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 print:border-slate-300 rounded-3xl overflow-hidden hover:border-white/20 transition-colors flex flex-col h-full cursor-pointer">
                
                <div className={`h-36 w-full bg-gradient-to-br ${getLanguageGradient(repo.language)} relative flex items-center justify-center print:hidden overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <LanguageLogo language={repo.language} className="text-white/40 relative z-10 group-hover:scale-125 group-hover:text-white/60 transition-all duration-500 select-none drop-shadow-xl" />
                  <div className="absolute bottom-3 right-4 text-white/90 font-black text-xs tracking-widest uppercase z-10 drop-shadow-md">
                    {repo.language || 'CODE'}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-transparent to-[#050505]/80 group-hover:to-[#0a0a0a] transition-colors">
                  <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${theme.gradientText} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <BookOpen className={`w-5 h-5 text-slate-400 ${theme.hoverText} transition-colors`} />
                    
                    <div className="flex items-center gap-3">
                      {repo.homepage && (
                        <a href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`} target="_blank" rel="noreferrer" title="Live Demo" className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] uppercase tracking-wider font-bold ${theme.primaryText} transition-all print:hidden`}>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.primaryBg} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.primaryBg}`}></span>
                          </span>
                          Live
                        </a>
                      )}
                      <a href={repo.html_url} target="_blank" rel="noreferrer" title="Source Code" className={`text-slate-500 hover:text-white transition-colors print:hidden`}>
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold text-white print:text-black mb-2 ${theme.hoverText} transition-colors line-clamp-1`}>{repo.name}</h3>
                  
                  <p className="text-slate-400 print:text-slate-600 text-sm mb-5 flex-1 line-clamp-3 leading-relaxed">
                    {typeof repo.aiDescription === 'string' ? repo.aiDescription : (repo.aiDescription?.[langState] || repo.description || lang.noDesc)}
                  </p>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="px-2 py-1 text-[10px] font-medium bg-white/[0.03] text-slate-400 rounded-md border border-white/5">
                          #{topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && <span className="px-2 py-1 text-[10px] font-medium bg-transparent text-slate-500">+{repo.topics.length - 3}</span>}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 print:text-slate-500 mt-auto pt-4 border-t border-white/5 print:border-slate-200">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors"><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1.5 hover:text-white print:hover:text-black transition-colors"><GitBranch className="w-4 h-4" /> {repo.forks_count}</span>
                    </div>
                    {repo.aiEnhanced && (
                      <div className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold ${theme.primaryText} print:hidden`} title="AI Enhanced Description">
                        <Star className="w-3 h-3" /> AI
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500 bg-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/5 border-dashed">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p>{lang.noProject}</p>
          </div>
        )}
      </section>

      {articles && articles.length > 0 && (
        <section id="articles" className="py-24 px-6 bg-white/[0.02] border-y border-white/5 print:py-10 print:bg-transparent print:border-y-0 relative z-10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12 print:mb-6">
              <Edit className={`w-8 h-8 ${theme.primaryText}`} />
              <h2 className="text-3xl font-bold text-white print:text-black">{lang.recentArticles}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article, idx) => (
                <a href={article.url} target="_blank" rel="noreferrer" aria-label={`${article.title} Makalesini Oku`} key={article.id} className="group animate-in slide-in-from-bottom-8 fade-in zoom-in fill-mode-both bg-white/[0.02] backdrop-blur-xl print:bg-white border border-white/10 print:border-slate-300 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col h-full hover:-translate-y-2 shadow-lg cursor-pointer" style={{ animationDelay: `${idx * 150}ms`, animationDuration: '700ms' }}>
                  {article.cover_image ? (
                    <img src={article.cover_image} alt={article.title} loading="lazy" className="w-full h-40 object-cover border-b border-white/10 print:hidden group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-40 bg-gradient-to-br ${theme.gradientText} opacity-80 print:hidden`}></div>
                  )}
                  <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-[#050505]/80 group-hover:to-[#0a0a0a] relative z-10 transition-colors">
                    <h3 className={`text-lg font-bold text-white print:text-black mb-2 ${theme.hoverText} transition-colors line-clamp-2`}>{article.title}</h3>
                    <p className="text-slate-400 print:text-slate-600 text-sm mb-4 line-clamp-3 flex-1">{article.description}</p>
                    <div className="text-xs text-slate-500 flex items-center justify-between mt-auto pt-4 border-t border-white/5 print:border-slate-200">
                      <span>{new Date(article.published_timestamp).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 text-rose-400"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> {article.public_reactions_count}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="stats" className="py-24 px-6 print:py-10 print:border-t-0 print:bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 print:mb-6">
            <Activity className="w-8 h-8 text-cyan-500 print:text-slate-800" />
            <h2 className="text-3xl font-bold text-white print:text-black">{lang.analytics}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 print:border-slate-300 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-default relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradientText} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 ${theme.secondaryText} print:bg-slate-100 print:text-slate-800 group-hover:scale-110 transition-transform`}><Star className="w-8 h-8" /></div>
              <div><div className="text-4xl font-black text-white print:text-black">{stats.totalStars}</div><div className="text-slate-400 print:text-slate-600 text-sm font-medium">{lang.stars}</div></div>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 print:border-slate-300 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-default relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradientText} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 ${theme.secondaryText} print:bg-slate-100 print:text-slate-800 group-hover:scale-110 transition-transform`}><GitBranch className="w-8 h-8" /></div>
              <div><div className="text-4xl font-black text-white print:text-black">{stats.totalForks}</div><div className="text-slate-400 print:text-slate-600 text-sm font-medium">{lang.forks}</div></div>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 print:border-slate-300 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-default relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradientText} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 ${theme.secondaryText} print:bg-slate-100 print:text-slate-800 group-hover:scale-110 transition-transform`}><Award className="w-8 h-8" /></div>
              <div><div className="text-4xl font-black text-white print:text-black">{stats.repoCount}</div><div className="text-slate-400 print:text-slate-600 text-sm font-medium">{lang.repos}</div></div>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 print:border-slate-300 rounded-3xl p-8 overflow-hidden print:hidden group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-8 text-slate-300">
              <Calendar className="w-5 h-5" />
              <h3 className="font-semibold text-lg">{lang.contrib}</h3>
            </div>
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar flex justify-center">
              <img 
                src={`https://ghchart.rshah.org/${theme.hexColor}/${profile.login}`} 
                alt={`${profile.login}'s Github Chart`} 
                loading="lazy"
                className="max-w-none opacity-80 group-hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          {achievements && achievements.length > 0 && (
            <div className="mt-16 pt-16 border-t border-white/5 print:border-slate-300">
              <div className="flex items-center gap-2 mb-8 text-slate-300 justify-center md:justify-start">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="font-semibold text-xl">{lang.achievements}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievements.map(ach => (
                  <div key={ach.id} className="bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm border border-white/10 print:border-slate-300 rounded-3xl p-6 flex flex-col items-center text-center hover:border-yellow-500/40 hover:from-yellow-500/[0.05] transition-all group cursor-default shadow-lg">
                    <div className={`p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-[0_0_15px_rgba(234,179,8,0.2)]`}>
                      <Award className="w-7 h-7" />
                    </div>
                    <h4 className="text-white print:text-black font-bold text-base mb-2">{ach.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{ach.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative z-10 print:hidden overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 ${theme.primaryBg} opacity-5 blur-[120px] pointer-events-none`}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b ${theme.gradientText} blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`}></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.primaryBg} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.primaryBg}`}></span>
              </span>
              {lang.available}
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {lang.buildTitle.split(' ').slice(0, -1).join(' ')} <br className="hidden md:block"/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>{lang.buildTitle.split(' ').slice(-1)}</span>
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              {lang.buildDesc}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {profile.email && (
                <a href={`mailto:${profile.email}`} aria-label="Bana E-posta Gönder" className={`flex items-center gap-3 px-8 py-4 rounded-2xl ${theme.primaryBg} text-white font-bold text-lg hover:scale-105 hover:-translate-y-1 transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_currentColor] cursor-pointer`}>
                  <Mail className="w-5 h-5" /> {lang.sayHello}
                </a>
              )}
              <a href={profile.html_url} target="_blank" rel="noreferrer" aria-label="GitHub Profilime Git" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:-translate-y-1 hover:scale-105 transition-all cursor-pointer">
                <GithubIcon className="w-5 h-5" /> {lang.follow}
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-6 text-slate-500">
              {profile.twitter_username && (
                <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer" className="hover:text-[#1DA1F2] transition-colors cursor-pointer" aria-label="Twitter">
                  <TwitterIcon className="w-6 h-6" />
                </a>
              )}
              {profile.blog && (
                <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className={`hover:${theme.primaryText} transition-colors cursor-pointer`} aria-label="Website">
                  <ExternalLink className="w-6 h-6" />
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 bg-[#050505] print:bg-transparent relative z-10 overflow-hidden pb-28 print:pb-0">
        
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent`}></div>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] ${theme.primaryBg} blur-[2px]`}></div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Terminal className="w-4 h-4" />
            <span>© {new Date().getFullYear()} <span className="text-white font-medium">{profile.login}</span>. {lang.rights}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs font-medium mr-1 hidden sm:block">BUILT WITH</span>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-default">
                <Code className="w-3 h-3" /> React
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-default">
                <Cpu className="w-3 h-3" /> Next.js
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-default">
                <Palette className="w-3 h-3" /> Tailwind
              </span>
            </div>
          </div>

          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all text-xs text-slate-400 hover:text-white group hover:shadow-lg cursor-pointer">
            <Zap className={`w-3.5 h-3.5 ${theme.primaryText} group-hover:scale-110 transition-transform`} />
            <span>Powered by <span className={`font-bold ${theme.primaryText}`}>DevPortfolio AI</span></span>
          </a>

        </div>
      </footer>

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          aria-label="Sayfanın En Üstüne Çık"
          className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white shadow-lg flex items-center justify-center hover:bg-white/10 hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm print:hidden cursor-pointer`}
          title="Yukarı Çık"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <QuickConnectWidget profile={profile} theme={theme} onPrint={handlePrint} onShare={handleShare} langState={langState} />
    </div>
  );
}

// --- ANA UYGULAMA (APP) ---

export default function App() {
  const [appState, setAppState] = useState('landing'); 
  const [username, setUsername] = useState('');
  const [devToUser, setDevToUser] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [logs, setLogs] = useState([]);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedUser = params.get('user');
    
    if (sharedUser) {
      setUsername(sharedUser);
      setTimeout(() => {
        handleGenerate(null, sharedUser);
      }, 800); 
    }
  }, []);

  const addLog = (msg, delay = 0) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        resolve();
      }, delay);
    });
  };

  const handleGenerate = async (e, forceUsername = null) => {
    if (e) e.preventDefault();
    
    const currentUsername = (forceUsername || username).trim();
    if (!currentUsername) return;

    setAppState('generating');
    
    const currentDevTo = devToUser.trim();
    
    // DÜZELTME: Cache versiyonu v22'ye yükseltildi (Çoklu Dil AI desteği için)
    const cacheKey = `devportfolio_v22_${currentUsername}_${currentDevTo}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData && !apiKey) {
      setLogs([`> npx devportfolio ${currentUsername} --theme=developer ${currentDevTo ? `--blog=${currentDevTo}` : ''}`]);
      await addLog(`[CACHE] Önceki oturumdan veriler bulundu. Hızlı yükleniyor...`, 300);
      await addLog(`[SUCCESS] Portfolyo önbellekten saniyeler içinde geri yüklendi!`, 300);
      
      setPortfolioData(JSON.parse(cachedData));
      setTimeout(() => {
        setAppState('complete');
      }, 400);
      return; 
    }

    setLogs([`> npx devportfolio ${currentUsername} --theme=developer ${currentDevTo ? `--blog=${currentDevTo}` : ''}`]);
    await addLog(`[INFO] Initializing DevPortfolio Engine v21.0.0 (Luxury Edition)...`, 200);
    await addLog(`[NETWORK] Fetching profile data for @${currentUsername} from GitHub REST API...`, 200);
    
    const { profile, repos, error } = await fetchGitHubData(currentUsername);

    if (error) {
      await addLog(`[ERROR] ${error}`, 300);
      await addLog(`[ABORT] Process terminated. Please try another username.`, 300);
      setTimeout(() => setAppState('landing'), 3000);
      return;
    }

    await addLog(`[SUCCESS] Profile retrieved: ${profile.name || profile.login}`, 200);
    await addLog(`[NETWORK] Fetching repository history (${repos.length} found)...`, 200);
    
    let articles = [];
    if (currentDevTo) {
      await addLog(`[NETWORK] Connecting to Dev.to API for user @${currentDevTo}...`, 200);
      articles = await fetchDevToArticles(currentDevTo);
      await addLog(articles.length > 0 ? `[SUCCESS] Fetched ${articles.length} latest articles.` : `[WARN] No articles found for this user.`, 200);
    }

    await addLog(`[AI ENGINE] Analyzing codebases and extracting architecture metadata...`, 200);
    
    const analyzedData = analyzeData(profile, repos);
    
    await addLog(`[SUCCESS] Extracted primary languages: ${analyzedData.topLanguages.slice(0,3).join(', ')}...`, 200);
    
    let aiBio = null;
    let enhancedDescriptions = {};

    if (apiKey) {
      await addLog(`[AI ENGINE] Securing API Key and requesting AI enhancements...`, 200);
      
      const bioPrompt = `Write a short, professional, and engaging 2-sentence developer bio for a GitHub user named ${profile.name || profile.login}. They specialize in ${analyzedData.topLanguages.join(', ')} and have a total of ${analyzedData.stats.totalStars} stars across ${analyzedData.stats.repoCount} repositories. Return ONLY a valid JSON object with exactly two keys: "EN" (English version) and "TR" (Turkish version of the bio). Do not use markdown formatting.`;
      
      const reposToEnhance = analyzedData.featuredProjects.filter(r => !r.description || r.description.length < 20);
      let descPrompt = null;
      if (reposToEnhance.length > 0) {
        const repoListStr = reposToEnhance.map(r => `${r.name} (Language: ${r.language || 'mixed'})`).join(', ');
        descPrompt = `Write a single, compelling 1-sentence technical description for each of these open-source projects. Return ONLY a valid JSON object where keys are the exact project names and values are objects with two keys: "EN" (English description) and "TR" (Turkish description). Do not use markdown formatting. Projects: ${repoListStr}`;
      }

      const [aiBioRes, aiDescJsonStr] = await Promise.all([
        callGemini(bioPrompt, apiKey, addLog),
        descPrompt ? callGemini(descPrompt, apiKey, addLog) : Promise.resolve(null)
      ]);

      if (aiBioRes) {
        try {
          const cleanBioStr = aiBioRes.replace(/```json/gi, '').replace(/```/g, '').trim();
          aiBio = JSON.parse(cleanBioStr);
        } catch(e) {
           aiBio = { EN: aiBioRes, TR: aiBioRes }; 
        }
      }

      if (aiDescJsonStr) {
        try {
          const cleanStr = aiDescJsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
          enhancedDescriptions = JSON.parse(cleanStr);
        } catch(e) {
          console.error("JSON parse error for AI descriptions", e);
        }
      }
      
      if (aiBio || Object.keys(enhancedDescriptions).length > 0) {
        await addLog(`[SUCCESS] Yapay zeka içerikleri başarıyla oluşturuldu!`, 200);
      } else {
        await addLog(`[WARN] AI generation failed. Using default descriptions.`, 200);
      }

    } else {
      await addLog(`[WARN] No Gemini API key provided. Skipping AI enhancements...`, 200);
    }

    analyzedData.featuredProjects = analyzedData.featuredProjects.map(repo => {
      if (enhancedDescriptions[repo.name]) {
        return { ...repo, aiDescription: enhancedDescriptions[repo.name], aiEnhanced: true };
      }
      return { ...repo, aiDescription: repo.description || null, aiEnhanced: false };
    });

    await addLog(`[BUILD] Compiling Components...`, 300);
    await addLog(`[MODULE] Activating Interactive Terminal...`, 200);
    await addLog(`[SUCCESS] Tüm modüller hazır. Portfolio generated!`, 300);

    const finalData = { profile, aiBio, articles, ...analyzedData };
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify(finalData));
    } catch (e) {
      console.warn("Cache save failed.", e);
    }

    setPortfolioData(finalData);
    setTimeout(() => {
      setAppState('complete');
    }, 400);
  };

  const handleRefreshCache = () => {
    if(!portfolioData) return;
    const cacheKey = `devportfolio_v21_${portfolioData.profile.login}_${devToUser}`;
    localStorage.removeItem(cacheKey);
    setAppState('landing'); 
  };

  const handleDemoFill = () => {
    setUsername('Can-Ozan'); 
    setDevToUser('');
  };

  // Açılış ekranı için yeşil tema referansı
  const landingTheme = THEMES.emerald;

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-sans text-slate-200 relative overflow-hidden">
      
      {/* Sadece Landing Page'de çalışacak Cursor */}
      {appState === 'landing' && <CustomCursor theme={landingTheme} />}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse duration-[4000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse duration-[5000ms]"></div>
      </div>

      {appState === 'landing' && (
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-center animate-in fade-in duration-1000 py-10">
          
          <div className="flex-1 text-center xl:text-left">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm shadow-xl backdrop-blur-sm hover:scale-105 transition-transform cursor-default">
              <Star className="w-4 h-4" />
              <span className="font-medium">DevPortfolio <span className="font-bold tracking-wider">v21.0</span></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white">
              Kodu sen yaz, <br className="hidden xl:block" />
              hikayeni <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Yapay Zeka</span> anlatsın.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto xl:mx-0 leading-relaxed font-medium">
              Sadece GitHub kullanıcı adını gir ve saniyeler içinde nefes kesici, 3D animasyonlu ve interaktif bir portfolyoya sahip ol. Google Gemini entegrasyonu ile projelerini profesyonelce tanıt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto xl:mx-0 text-left">
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <Cpu className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-1">Yapay Zeka Destekli</h4>
                <p className="text-sm text-slate-500">Gemini ile otomatik açıklamalar</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <Zap className="w-6 h-6 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-1">Ultra Performans</h4>
                <p className="text-sm text-slate-500">Sıfır bekleme, anında render</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <Key className="w-6 h-6 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-1">Kendi Anahtarın (BYOK)</h4>
                <p className="text-sm text-slate-500">Sınır yok, %100 güvenli</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <Globe className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-1">Çoklu Dil Desteği</h4>
                <p className="text-sm text-slate-500">Türkçe & İngilizce entegrasyonu</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto xl:max-w-lg xl:ml-auto relative group pt-8 xl:pt-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/40 via-cyan-500/20 to-blue-500/40 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                  <Terminal className="w-6 h-6 text-emerald-400" />
                  Kurulum
                </h3>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
              </div>
              
              <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                <div className="relative flex items-center group/input">
                  <GithubIcon className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="GitHub Kullanıcı Adı *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-text hover:bg-white/[0.04]"
                    required
                  />
                </div>
                
                <div className="relative flex items-center group/input">
                  <Edit className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Dev.to Kullanıcı Adı (Opsiyonel)"
                    value={devToUser}
                    onChange={(e) => setDevToUser(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all cursor-text hover:bg-white/[0.04]"
                  />
                </div>

                <div className="relative">
                  <div className="relative flex items-center group/input">
                    <Key className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within/input:text-yellow-400 transition-colors" />
                    <input
                      type="password"
                      placeholder="Gemini API Anahtarı (AI İçin)"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all cursor-text hover:bg-white/[0.04]"
                    />
                  </div>
                  <div className="text-right mt-2 flex justify-between px-1">
                     <button type="button" onClick={handleDemoFill} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium cursor-pointer flex items-center gap-1 z-10 relative">
                       <Zap className="w-3 h-3" /> Demoyu Doldur
                     </button>
                    <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-yellow-400 transition-colors z-10 relative">
                      Ücretsiz API anahtarı al →
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 py-4 font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer z-10 relative"
                >
                  Portfolyoyu Oluştur <ChevronRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

      {appState === 'generating' && (
        <div className="w-full max-w-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="mb-8 text-center">
             <h2 className="text-3xl font-bold text-white mb-2 animate-pulse">Portfolyonuz İnşa Ediliyor...</h2>
             <p className="text-slate-400">Lütfen yapay zeka kodlarınızı ve geçmişinizi analiz ederken bekleyin.</p>
           </div>
           <LoadingTerminal logs={logs} />
        </div>
      )}

      {appState === 'complete' && portfolioData && (
        <PortfolioTemplate data={portfolioData} onRefresh={handleRefreshCache} />
      )}
    </div>
  );
}