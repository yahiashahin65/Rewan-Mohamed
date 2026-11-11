import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight,
  Award, BookOpen, BookOpenCheck, BrainCircuit, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Download, ExternalLink,
  Eye, Flower2, Heart, HeartHandshake, Instagram, Languages, Leaf, Mail, MapPin,
  Menu, MessageCircleHeart, MessagesSquare, Moon, Phone, ScanEye, Send, ShieldCheck,
  Sparkles, Sun, Target, X, Blocks, Laptop, House, GraduationCap, BriefcaseBusiness,
  ArrowUp, Clock3, UsersRound, MoveUpRight
} from 'lucide-react';
import { BRAND, COPY, SERVICES, CERTIFICATES } from './content.js';

const SERVICE_ICONS = { MessageCircleHeart, BrainCircuit, Blocks, ScanEye, MessagesSquare, BookOpenCheck, HeartHandshake };
const sectionIds = ['home', 'about', 'services', 'experience', 'certificates', 'faq'];
const certPath = (page) => `/assets/certs/cert-p${String(page).padStart(2, '0')}.webp`;

function BotanicalMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 235 280" fill="none" aria-hidden="true">
    <path d="M27 267C103 210 167 152 184 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M80 217C40 211 31 186 40 160C68 168 85 190 80 217ZM101 196C134 196 153 171 149 148C123 154 109 169 101 196ZM134 162C99 147 98 114 117 94C142 112 144 135 134 162ZM164 108C194 96 209 71 200 52C178 58 168 77 164 108ZM173 67C144 49 146 24 159 10C178 27 181 45 173 67ZM59 234C26 232 6 214 10 194C36 199 53 211 59 234Z" fill="currentColor" opacity=".42" />
    <circle cx="185" cy="15" r="5" fill="currentColor" opacity=".7" />
  </svg>;
}

function WordMark({ t, lang }) {
  return <a href="#home" className="wordmark" aria-label={t.brand}>
    <span className="wordmark-symbol" aria-hidden="true"><Leaf size={25} strokeWidth={1.75} /></span>
    <span className="wordmark-copy"><strong>{t.brand}</strong><small>{t.brandSub}</small></span>
  </a>;
}

function Header({ t, lang, onLanguage, theme, onTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const handle = () => setStuck(window.scrollY > 22);
    handle(); window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [lang]);
  const closeNav = () => setMenuOpen(false);
  return <header className={`site-header ${stuck ? 'site-header--stuck' : ''}`}>
    <div className="shell nav-shell">
      <WordMark t={t} lang={lang} />
      <nav className={`primary-nav ${menuOpen ? 'primary-nav--open' : ''}`} aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}>
        {sectionIds.map((id, idx) => <a onClick={closeNav} href={`#${id}`} key={id}>{t.nav[idx]}</a>)}
        <a onClick={closeNav} href="#booking" className="mobile-contact-link">{t.contact}</a>
      </nav>
      <div className="nav-controls">
        <button type="button" className="icon-btn language-btn" onClick={onLanguage} aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}><Languages size={18}/><span>{lang === 'ar' ? 'EN' : 'ع'}</span></button>
        <button type="button" className="icon-btn theme-btn" onClick={onTheme} aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button>
        <a className="nav-cta" href="#booking">{t.contact}<ArrowUpLeft className="rtl-arrow" size={16}/></a>
        <button type="button" className="icon-btn menu-toggle" onClick={() => setMenuOpen((v)=>!v)} aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
    </div>
  </header>;
}

function SectionTag({ children, dark = false }) {
  return <div className={`section-tag ${dark ? 'section-tag--dark' : ''}`}><span className="section-tag-line"/><span>{children}</span></div>;
}

function SectionHeading({ eyebrow, a, b, desc, center = false }) {
  return <div className={`section-heading ${center ? 'section-heading--center' : ''}`}>
    <SectionTag>{eyebrow}</SectionTag>
    <h2>{a}<span className="accent-text"> {b}</span></h2>
    {desc && <p>{desc}</p>}
  </div>;
}

function Hero({ t, lang }) {
  return <section id="home" className="hero section-anchor">
    <div className="hero-grain" aria-hidden="true" />
    <BotanicalMark className="hero-botanical hero-botanical--one" />
    <BotanicalMark className="hero-botanical hero-botanical--two" />
    <div className="shell hero-grid">
      <div className="hero-copy fade-up">
        <div className="hero-badge"><span className="spark-icon"><Sparkles size={15}/></span>{t.eyebrow}</div>
        <h1>{t.heroTitle1}<br/><em>{t.heroTitle2}</em><span className="hero-title-period">.</span></h1>
        <p className="hero-description">{t.heroDesc}</p>
        <div className="hero-actions">
          <a href="#services" className="button button-primary">{t.heroCTA}<ArrowUpLeft className="rtl-arrow" size={20}/></a>
          <a href="#booking" className="button button-ghost">{t.heroSecondary}<ArrowDownLeft className="rtl-arrow" size={19}/></a>
        </div>
        <div className="hero-footnote"><span className="footnote-icon"><Heart size={17}/></span><span>{t.photoHint}</span></div>
      </div>
      <div className="hero-art fade-up" style={{ animationDelay: '.12s' }}>
        <div className="art-orbit art-orbit--one"/><div className="art-orbit art-orbit--two"/>
        <div className="portrait-frame">
          <img src="/assets/portrait.webp" alt={lang === 'ar' ? 'صورة شخصية في التصميم التعريفي المرفق' : 'Portrait from the provided profile design'} fetchPriority="high" />
          <div className="portrait-filter"/>
        </div>
        <div className="floating-card floating-card--top"><span className="floating-card-symbol"><Flower2 size={23}/></span><span>{t.photoNote}</span></div>
        <div className="floating-card floating-card--bottom"><span className="online-pulse"/><span>{t.heroChip}</span><CheckCircle2 size={16}/></div>
        <div className="art-stamp">RM<span className="art-stamp-leaf">✳</span></div>
      </div>
    </div>
    <div className="shell hero-metrics">
      <div className="metric"><strong>07<span>+</span></strong><span>{t.metric1}</span></div>
      <div className="metric"><strong>02</strong><span>{t.metric2}</span></div>
      <div className="metric"><strong>16</strong><span>{t.metric3}</span></div>
      <div className="hero-scroll"><span>{lang === 'ar' ? 'اكتشفي المزيد' : 'Explore more'}</span><ArrowDownLeft className="rtl-arrow" size={22}/></div>
    </div>
  </section>;
}

function TrustStrip({ t }) {
  return <div className="trust-strip"><div className="shell trust-strip-inner"><Sparkles size={17}/><span>{t.trust}</span><Sparkles size={17}/></div></div>;
}

function About({ t, lang }) {
  return <section id="about" className="about-section section-space section-anchor">
    <div className="shell about-grid">
      <div className="about-visual reveal">
        <div className="about-visual-card">
          <div className="large-sun"><span/><span/><span/><span/><span/><span/><span/><span/></div>
          <div className="about-quote-mark">“</div>
          <p>{lang==='ar' ? 'نحن لا نقارن الأطفال ببعضهم، بل نحتفي بكل خطوة يحققها كل طفل في رحلته الخاصة.' : 'We never compare children. We celebrate every step they take along their own journey.'}</p>
          <div className="about-card-sign"><span className="line-emblem"/><span>{t.brand}</span></div>
          <BotanicalMark className="about-card-botanical"/>
        </div>
        <div className="about-side-label">GROW • BLOOM • THRIVE</div>
      </div>
      <div className="about-copy reveal">
        <SectionHeading eyebrow={t.aboutEyebrow} a={t.aboutTitle1} b={t.aboutTitle2}/>
        <p className="about-intro">{t.aboutLead}</p>
        <p className="body-muted">{t.aboutBody}</p>
        <div className="about-points">
          {[t.aboutPoint1,t.aboutPoint2,t.aboutPoint3].map((pt,i)=><div key={i}><span><Check size={16}/></span>{pt}</div>)}
        </div>
        <div className="about-citation"><span><GraduationCap size={20}/></span><div>{t.aboutBadge}<small>{lang==='ar'?'جامعة بنها · تدريب مهني موثق':'Benha University · Documented training'}</small></div></div>
      </div>
    </div>
  </section>;
}

function Services({ t, lang, onInquiry }) {
  return <section id="services" className="services-section section-space section-anchor">
    <div className="shell">
      <div className="section-intro-grid reveal"><SectionHeading eyebrow={t.servicesEyebrow} a={t.servicesTitle1} b={t.servicesTitle2}/><p>{t.servicesDesc}</p></div>
      <div className="service-grid">
        {SERVICES.map((s,i) => {
          const Icon=SERVICE_ICONS[s.icon];
          return <article className={`service-card service-card--${i%4} reveal`} key={s.id} style={{ transitionDelay: `${(i%3)*75}ms` }}>
            <span className="service-n">{s.n}</span>
            <div className="service-icon"><Icon size={34} strokeWidth={1.65}/></div>
            <h3>{lang==='ar'?s.ar:s.en}</h3><p>{lang==='ar'?s.descriptionAr:s.descriptionEn}</p>
            <div className="service-actions"><a className="service-details" href={`/${lang==='en'?'en/':''}services/${s.slug}/`}>{lang==='ar'?'التفاصيل':'Details'} <ExternalLink size={13}/></a><button type="button" className="service-link" onClick={()=>onInquiry(s.id)}>{t.serviceAction}<ArrowUpLeft className="rtl-arrow" size={17}/></button></div>
          </article>;
        })}
        <a href="#booking" className="service-card service-card--feature reveal"><div className="feature-motif"><HeartHandshake size={54} strokeWidth={1.25}/></div><h3>{lang==='ar'?'لستِ متأكدة من البداية؟':'Not sure where to start?'}</h3><p>{lang==='ar'?'احكي لنا ما يشغلك، وسنبدأ بخطوة مناسبة وواضحة.':'Tell us your concern and we can discuss an appropriate next step.'}</p><span>{t.contact}<ArrowUpLeft className="rtl-arrow" size={17}/></span></a>
      </div>
    </div>
  </section>;
}

function Process({t}) {
  return <section className="process-section section-space" aria-labelledby="process-title">
    <div className="shell">
      <div className="process-intro reveal"><SectionTag dark>{t.processEyebrow}</SectionTag><h2 id="process-title">{t.processTitle}</h2><p>{t.processDesc}</p></div>
      <div className="process-grid">{t.process.map((step,i)=><article className="process-step reveal" key={step.n} style={{transitionDelay:`${i*80}ms`}}><span className="process-index">{step.n}</span><span className="process-bubble"><span/></span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </div>
  </section>;
}

function Experience({t, lang}) {
  return <section id="experience" className="experience-section section-space section-anchor"><div className="shell experience-grid">
    <div className="experience-intro reveal"><SectionHeading eyebrow={t.qualificationEyebrow} a={t.qualificationTitle1} b={t.qualificationTitle2} desc={t.qualificationDesc}/>
      <div className="qualification-note"><div className="qualification-icon"><ShieldCheck size={24}/></div><p>{lang==='ar'?'المعلومات التالية مستمدة من السيرة الذاتية والشهادات المرفقة، دون إضافة مؤهلات أو نتائج غير موثقة.':'These details come from the supplied CV and certificates, without adding unverified qualifications or outcomes.'}</p></div>
      <a href="#certificates" className="button button-outline">{t.certificateLink}<ArrowUpLeft className="rtl-arrow" size={18}/></a>
    </div>
    <div className="timeline reveal">{t.qualificationItems.map((it,i)=> <article className="timeline-item" key={i}><span className={`timeline-icon timeline-icon--${it.type}`}>{it.type==='education'?<GraduationCap size={19}/>:it.type==='practice'?<BriefcaseBusiness size={19}/>:<BookOpen size={19}/>}</span><div className="timeline-body"><span className="timeline-date" dir="ltr">{it.date}</span><h3>{it.title}</h3><strong>{it.source}</strong><p>{it.detail}</p></div></article>)}</div>
  </div></section>;
}

function Credentials({t,lang}) {
  const [filter,setFilter] = useState('all');
  const [selected,setSelected] = useState(-1);
  const [limit,setLimit] = useState(8);
  const filters=['all','academic','special','practical'];
  const visible = useMemo(()=>CERTIFICATES.filter(c=>filter==='all'||c.group===filter),[filter]);
  const displayed=visible.slice(0,limit);
  useEffect(()=>setLimit(8),[filter]);
  useEffect(()=>{
    if(selected<0)return;
    const handler=(e)=>{if(e.key==='Escape')setSelected(-1);else if(e.key==='ArrowRight')setSelected(i=>(i+1)%visible.length);else if(e.key==='ArrowLeft')setSelected(i=>(i-1+visible.length)%visible.length)};
    window.addEventListener('keydown',handler);document.body.classList.add('modal-open');
    return ()=>{window.removeEventListener('keydown',handler);document.body.classList.remove('modal-open')};
  },[selected,visible]);
  const current=selected>=0?visible[selected]:null;
  return <section id="certificates" className="credentials-section section-space section-anchor">
    <div className="shell">
      <div className="credentials-header reveal"><SectionHeading eyebrow={t.credEyebrow} a={t.credTitle1} b={t.credTitle2} desc={t.credDesc}/><div className="credentials-sigil"><Award size={43}/><span>{lang==='ar'?'تعلم موثق':'Documented learning'}</span></div></div>
      <div className="cert-filter-row" role="group" aria-label={lang==='ar'?'تصفية الشهادات':'Filter certificates'}>{filters.map((f,i)=><button type="button" key={f} onClick={()=>setFilter(f)} className={`cert-filter ${filter===f?'cert-filter--active':''}`} aria-pressed={filter===f}>{t.filters[i]}<span>{f==='all'?CERTIFICATES.length:CERTIFICATES.filter(c=>c.group===f).length}</span></button>)}</div>
      <div className="cert-grid">{displayed.map((cert,i)=><button type="button" className="cert-card reveal" key={cert.id} onClick={()=>setSelected(visible.findIndex(c=>c.id===cert.id))} aria-label={`${t.openCert}: ${lang==='ar'?cert.ar:cert.en}`}>
        <span className="cert-image-wrap"><img src={certPath(cert.page)} loading="lazy" alt={lang==='ar'?cert.ar:cert.en}/><span className="cert-image-overlay"><Eye size={23}/></span></span>
        <span className="cert-card-content"><span className="cert-card-category">{t.filters[filters.indexOf(cert.group)]}</span><strong>{lang==='ar'?cert.ar:cert.en}</strong><small>{lang==='ar'?cert.issuerAr:cert.issuerEn}</small><span className="cert-card-more">{t.showCertificate}<ArrowUpLeft className="rtl-arrow" size={16}/></span></span>
      </button>)}</div>
      {limit<visible.length&&<div className="show-more-wrap"><button type="button" className="button button-outline" onClick={()=>setLimit(v=>v+8)}>{lang==='ar'?'عرض المزيد من الشهادات':'Show more certificates'}<ChevronDown size={19}/></button></div>}
      <p className="privacy-footnote"><ShieldCheck size={16}/>{t.privacyNote}</p>
    </div>
    {current&&<div className="lightbox-backdrop" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)setSelected(-1)}}>
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={lang==='ar'?current.ar:current.en}>
        <div className="lightbox-bar"><div><strong>{lang==='ar'?current.ar:current.en}</strong><span>{selected+1} {t.certificateCounter} {visible.length}</span></div><button type="button" className="icon-btn lightbox-close" aria-label={t.close} onClick={()=>setSelected(-1)}><X size={22}/></button></div>
        <div className="lightbox-media"><img src={certPath(current.page)} alt={lang==='ar'?current.ar:current.en}/></div>
        <div className="lightbox-actions"><button type="button" onClick={()=>setSelected(i=>(i-1+visible.length)%visible.length)} aria-label="Previous"><ChevronRight className="rtl-arrow" size={24}/></button><span>{lang==='ar'?current.issuerAr:current.issuerEn}</span><button type="button" onClick={()=>setSelected(i=>(i+1)%visible.length)} aria-label="Next"><ChevronLeft className="rtl-arrow" size={24}/></button></div>
      </div>
    </div>}
  </section>;
}

function Faq({t}) {
  const [active,setActive]=useState(0);
  return <section id="faq" className="faq-section section-space section-anchor"><div className="shell faq-grid">
    <div className="faq-intro reveal"><SectionHeading eyebrow={t.faqEyebrow} a={t.faqTitle1} b={t.faqTitle2}/><div className="faq-art"><CircleHelp size={126} strokeWidth={.65}/><span>?</span></div></div>
    <div className="faq-list reveal">{t.faq.map((item,i)=><div key={i} className={`faq-item ${active===i?'faq-item--open':''}`}><button type="button" aria-expanded={active===i} onClick={()=>setActive(active===i?-1:i)}><span className="faq-num">{String(i+1).padStart(2,'0')}</span><strong>{item.q}</strong><span className="faq-chevron"><ChevronDown size={18}/></span></button>{active===i&&<p>{item.a}</p>}</div>)}</div>
  </div></section>;
}

function Booking({t,lang,prefill,clearPrefill}) {
  const [name,setName]=useState('');
  const [service,setService]=useState('');
  const [meeting,setMeeting]=useState('online');
  const [date,setDate]=useState('');
  const [note,setNote]=useState('');
  const [error,setError]=useState('');
  useEffect(()=>{if(prefill){setService(prefill);clearPrefill();}},[prefill,clearPrefill]);
  const submit=(e)=>{
    e.preventDefault();
    if(!name.trim()){setError(t.formNameRequired);return;}
    setError('');
    const serviceObj=SERVICES.find(s=>s.id===service);
    const chosen=serviceObj?(lang==='ar'?serviceObj.ar:serviceObj.en):lang==='ar'?'استفسار عام':'General inquiry';
    const message=lang==='ar'
      ?`مرحبًا أ. روان، أود الاستفسار عن موعد جلسة.\nالاسم: ${name.trim()}\nالخدمة: ${chosen}\nنوع الجلسة: ${meeting==='online'?'أونلاين':'حضوري'}${date?`\nالتاريخ المفضل: ${date}`:''}${note.trim()?`\nاستفسار إضافي: ${note.trim()}`:''}\nيرجى إفادتي بالتفاصيل والمواعيد المتاحة.`
      :`Hello Rewan, I'd like to inquire about an appointment.\nName: ${name.trim()}\nService: ${chosen}\nFormat: ${meeting==='online'?'Online':'In person'}${date?`\nPreferred date: ${date}`:''}${note.trim()?`\nAdditional note: ${note.trim()}`:''}\nPlease let me know about available times.`;
    window.open(`https://wa.me/${BRAND.internationalPhone}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
  };
  const today= new Date().toLocaleDateString('en-CA');
  return <section id="booking" className="booking-section section-space section-anchor"><div className="shell booking-grid">
    <div className="booking-copy reveal"><SectionTag dark>{t.bookingEyebrow}</SectionTag><h2>{t.bookingTitle1}<br/><em>{t.bookingTitle2}</em></h2><p>{t.bookingDesc}</p>
      <div className="booking-contact-list"><a href={`tel:+${BRAND.internationalPhone}`}><span><Phone size={21}/></span><div><small>{lang==='ar'?'اتصال مباشر':'Call directly'}</small><strong dir="ltr">{BRAND.phone}</strong></div><ArrowUpLeft className="rtl-arrow" size={18}/></a><a href={`mailto:${BRAND.email}`}><span><Mail size={21}/></span><div><small>{t.mail}</small><strong dir="ltr">{BRAND.email}</strong></div><ArrowUpLeft className="rtl-arrow" size={18}/></a></div>
    </div>
    <div className="booking-form-wrapper reveal"><div className="booking-form-head"><span className="booking-form-emblem"><CalendarDays size={24}/></span><div><h3>{lang==='ar'?'طلب موعد / استفسار':'Appointment inquiry'}</h3><p>{lang==='ar'?'املئي التفاصيل لنجهز رسالتك':'Complete the details to prepare your message'}</p></div></div>
      <form onSubmit={submit} noValidate>
        <div className="form-row"><label className="form-field"><span>{t.name}<i>*</i></span><input value={name} onChange={e=>{setName(e.target.value);setError('')}} placeholder={t.namePlace} autoComplete="name" aria-required="true" /></label><label className="form-field"><span>{t.service}</span><select value={service} onChange={e=>setService(e.target.value)}><option value="">{t.selectService}</option>{SERVICES.map(s=><option key={s.id} value={s.id}>{lang==='ar'?s.ar:s.en}</option>)}</select></label></div>
        <div className="form-row"><fieldset className="form-field"><legend>{t.meeting}</legend><div className="session-choice"><label className={meeting==='online'?'active':''}><input type="radio" name="session" checked={meeting==='online'} onChange={()=>setMeeting('online')}/><Laptop size={17}/>{t.online}</label><label className={meeting==='offline'?'active':''}><input type="radio" name="session" checked={meeting==='offline'} onChange={()=>setMeeting('offline')}/><House size={17}/>{t.offline}</label></div></fieldset><label className="form-field"><span>{t.date} <small>({t.optional})</small></span><input type="date" min={today} value={date} onChange={e=>setDate(e.target.value)} /></label></div>
        <label className="form-field"><span>{t.note}</span><textarea rows="3" value={note} maxLength={550} placeholder={t.notePlace} onChange={e=>setNote(e.target.value)} /></label>
        {error&&<p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button button-primary submit-btn">{t.send}<Send size={18}/></button>
        <p className="form-privacy"><ShieldCheck size={15}/>{t.privacy}</p>
      </form>
    </div>
  </div></section>;
}

function Footer({t,lang}) {
  return <footer className="site-footer"><div className="shell footer-top"><div className="footer-brand"><WordMark t={t} lang={lang}/><p>{t.footerDescription}</p><div className="footer-socials"><a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/></a><a href={`mailto:${BRAND.email}`} aria-label="Email"><Mail size={18}/></a><a href={`https://wa.me/${BRAND.internationalPhone}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone size={18}/></a></div></div><div className="footer-link-column"><h4>{t.footerHeading}</h4><a href="#about">{t.nav[1]}</a><a href="#services">{t.nav[2]}</a><a href="#experience">{t.nav[3]}</a><a href="#certificates">{t.nav[4]}</a></div><div className="footer-link-column"><h4>{t.footerContact}</h4><a href="#booking">{t.contact}</a><a href={`mailto:${BRAND.email}`}>{t.mail}</a><a href={BRAND.instagram} target="_blank" rel="noreferrer">{t.insta}</a><a href="/Rewan_Mohamed_Professional_Profile.pdf" target="_blank" rel="noreferrer">{t.cv}<ExternalLink size={13}/></a></div><div className="footer-signature"><span>RM</span><BotanicalMark/></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {t.brand} — {t.copy}</span><a href="#home">{t.backTop}<ArrowUp size={15}/></a><span>Made with care <Heart size={13}/></span></div></footer>;
}

function FloatingActions({ t,lang }) {
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const fn=()=>setVisible(window.scrollY>650);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
  return <><a className="floating-whatsapp" href={`https://wa.me/${BRAND.internationalPhone}`} target="_blank" rel="noreferrer" aria-label={lang==='ar'?'تواصل عبر واتساب':'Contact via WhatsApp'}><Phone size={21}/></a><a href="#home" aria-label={t.backTop} className={`floating-back-top ${visible?'floating-back-top--visible':''}`}><ArrowUp size={21}/></a></>;
}

export default function App() {
  const [lang,setLang]=useState(()=>(window.location.pathname.startsWith('/en/')||new URLSearchParams(window.location.search).get('lang')==='en')?'en':'ar');
  const [theme,setTheme]=useState('light');
  const [progress,setProgress]=useState(0);
  const [prefill,setPrefill]=useState('');
  const t=COPY[lang];
  useEffect(()=>{
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.title=lang==='ar'?'روان محمد | التخاطب وتنمية المهارات':'Rewan Mohamed | Speech & Child Development';
    document.documentElement.dataset.theme=theme;
  },[lang,theme]);
  useEffect(()=>{
    const scroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?Math.min(100,window.scrollY/max*100):0)};
    scroll();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
  },[]);
  useEffect(()=>{
    const target=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){target.forEach(e=>e.classList.add('revealed'));return}
    const obs=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('revealed');obs.unobserve(entry.target)}}},{threshold:.09,rootMargin:'0px 0px -35px 0px'});
    target.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[lang]);
  const inquire=(id)=>{setPrefill(id);document.getElementById('booking')?.scrollIntoView({behavior:'smooth'});};
  return <div className="app-frame" data-lang={lang}>
    <a href="#main" className="skip-link">{lang==='ar'?'تخطي إلى المحتوى':'Skip to content'}</a>
    <div className="reading-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
    <Header t={t} lang={lang} onLanguage={()=>setLang(l=>l==='ar'?'en':'ar')} theme={theme} onTheme={()=>setTheme(v=>v==='light'?'dark':'light')}/>
    <main id="main"><Hero t={t} lang={lang}/><TrustStrip t={t}/><About t={t} lang={lang}/><Services t={t} lang={lang} onInquiry={inquire}/><Process t={t}/><Experience t={t} lang={lang}/><Credentials t={t} lang={lang}/><Faq t={t}/><Booking t={t} lang={lang} prefill={prefill} clearPrefill={()=>setPrefill('')}/></main>
    <Footer t={t} lang={lang}/><FloatingActions t={t} lang={lang}/>
    <a className="mobile-fixed-cta" href="#booking"><CalendarDays size={19}/>{t.contact}<ArrowUpLeft className="rtl-arrow" size={17}/></a>
  </div>;
}
