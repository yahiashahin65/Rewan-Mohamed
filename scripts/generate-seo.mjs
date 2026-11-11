import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
// The production domain is the canonical source of truth even if Vercel has no SITE_URL variable.
const DEFAULT_SITE_URL = 'https://rewan-mohamed.vercel.app';
const rawSite = process.env.SITE_URL || DEFAULT_SITE_URL;
const origin = rawSite ? rawSite.replace(/\/$/, '') : '';
const esc = (s) => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const fullUrl = (route) => origin ? `${origin}${route}` : '';
const topics = [
  {
    slug: 'speech-therapy',
    ar: 'التخاطب وتنمية مهارات التواصل', en: 'Speech and Language Development',
    shortAr: 'جلسات التخاطب', shortEn: 'Speech support',
    descAr: 'التخاطب ليس مجرد نطق الحروف، بل هو طريقة الطفل في الفهم والتعبير والتواصل مع المحيطين به. يركز هذا المجال على مهارات التواصل المناسبة لاحتياجات الطفل من خلال أنشطة تفاعلية وخطة متابعة فردية.',
    descEn: 'Speech and communication support includes more than pronunciation. It also involves listening, understanding, expression and interaction. Rewan focuses on child-centered activities and individual follow-up.',
    pointsAr: ['تنمية التواصل اللفظي وغير اللفظي حسب احتياجات الطفل', 'أنشطة لتحسين وضوح الكلام ومهارات التعبير', 'التعاون مع الأسرة على تطبيق أنشطة في الحياة اليومية'],
    pointsEn: ['Individualized verbal and non-verbal communication activities', 'Speech clarity, listening and expressive language', 'Practical family guidance for everyday interaction'],
    faqAr: ['متى أطلب استشارة بشأن التخاطب؟','إذا لاحظت الأسرة صعوبة مستمرة في التواصل أو النطق مقارنة بالتطور المتوقع للعمر، يمكن طلب تقييم من متخصص لتحديد الخطوات المناسبة.'],
    faqEn: ['When should I ask about speech support?','If a child has persistent communication or speech difficulties, a professional assessment can help determine appropriate next steps.'],
    keysAr:'أخصائية تخاطب, جلسات تخاطب, تنمية التواصل, علاج النطق, مهارات الكلام', keysEn:'speech therapist, speech therapy, speech and language specialist, child communication support'
  },
  {
    slug: 'speech-delay',
    ar: 'تأخر الكلام وتطور اللغة', en: 'Speech Delay and Language Development',
    shortAr:'تأخر الكلام', shortEn:'Speech delay support',
    descAr:'قد يحتاج بعض الأطفال إلى مساندة إضافية في اكتساب المفردات أو تكوين الجمل أو فهم التعليمات. يتم التركيز على مهارات اللغة الاستقبالية والتعبيرية والتواصل الوظيفي وفق احتياجات كل طفل.',
    descEn:'Some children need additional support with vocabulary, sentences, comprehension or everyday communication. Activities can focus on receptive and expressive language, guided by individual needs.',
    pointsAr:['التواصل اليومي وفهم التعليمات','أنشطة المفردات والتعبير اللغوي','إرشادات عملية للأسرة لدعم التفاعل'],
    pointsEn:['Everyday communication and understanding instructions','Vocabulary and expressive-language activities','Parent-friendly ideas for meaningful interaction'],
    faqAr:['هل تأخر الكلام يحتاج إلى جلسات لكل طفل؟','ليس بالضرورة. تحديد الاحتياج يعتمد على تقييم مهني وفهم عمر الطفل وتطوره وسياقه الصحي والتعليمي.'],
    faqEn:['Does every child with speech delay need sessions?','Not always. Decisions should follow an appropriate professional assessment of the child’s development and needs.'],
    keysAr:'تأخر الكلام عند الأطفال, تأخر اللغة, أخصائية تخاطب, تطوير اللغة', keysEn:'speech delay, language delay in children, expressive language development'
  },
  {
    slug: 'behavior-modification',
    ar: 'تعديل السلوك والدعم السلوكي', en: 'Behavior Support and Modification',
    shortAr:'تعديل السلوك', shortEn:'Behavior support',
    descAr:'يبدأ دعم السلوك بمحاولة فهم وظيفة السلوك والظروف المرتبطة به، ثم اختيار استراتيجيات إيجابية وتوقعات واضحة تناسب الطفل والأسرة. يركز العمل على التواصل والتعزيز والاتساق، دون وعود بنتائج ثابتة.',
    descEn:'Behavior support begins with understanding why behaviors happen and the situations around them. Positive, respectful strategies and consistent family guidance can support practical goals.',
    pointsAr:['فهم المحفزات والاحتياجات المرتبطة بالسلوك','العمل على روتين واضح ومهارات بديلة','متابعة الأسرة وتعديل الأنشطة وفق الاستجابة'],
    pointsEn:['Understanding behavior triggers and needs','Positive routines and alternative skills','Family follow-up and individually adjusted activities'],
    faqAr:['هل تعديل السلوك يعني العقاب؟','لا. يركز الدعم السلوكي الإيجابي على فهم الاحتياجات وتنمية المهارات والبدائل المناسبة، وليس على العقاب.'],
    faqEn:['Is behavior modification about punishment?','No. Positive behavior support emphasizes understanding needs, building skills and using suitable alternatives.'],
    keysAr:'تعديل سلوك الأطفال, أخصائية تعديل سلوك, دعم سلوكي إيجابي', keysEn:'behavior modification, child behavior support, positive behavior strategies'
  },
  {
    slug: 'learning-difficulties',
    ar: 'صعوبات التعلم وتنمية الاستعداد الأكاديمي', en: 'Learning Difficulties and Foundational Skills',
    shortAr:'صعوبات التعلم', shortEn:'Learning difficulties',
    descAr:'يركز الدعم التعليمي على المهارات الأساسية التي تساعد الطفل على المشاركة في التعلم، مع تقدير نقاط القوة والتحديات الخاصة به. يمكن مناقشة أنشطة الانتباه والتمييز والذاكرة والمهارات السابقة للقراءة والكتابة.',
    descEn:'Support for learning difficulties is shaped around a child’s learning profile. Foundational activities may involve attention, discrimination, memory and readiness for reading and writing.',
    pointsAr:['أنشطة مناسبة للفروق الفردية','تنمية المهارات الأولية للتعلم','تعاون الأسرة والمتابعة التدريجية'],
    pointsEn:['Individualized foundational-learning activities','Early learning and attention skills','Family collaboration and step-by-step follow-up'],
    faqAr:['هل صعوبات التعلم تعني ضعف الذكاء؟','لا. صعوبات التعلم قد تظهر لدى أطفال بقدرات متنوعة وتحتاج إلى فهم وتقييم مناسبين بعيدًا عن الأحكام العامة.'],
    faqEn:['Do learning difficulties mean low intelligence?','No. Learning difficulties can affect children with a wide range of abilities and call for careful, individualized assessment.'],
    keysAr:'صعوبات التعلم, أخصائية صعوبات تعلم, تنمية مهارات التعلم', keysEn:'learning difficulties specialist, learning support, foundational learning skills'
  },
  {
    slug: 'child-development',
    ar: 'تنمية مهارات الطفل والاستقلالية', en: 'Child Skills Development',
    shortAr:'تنمية المهارات', shortEn:'Skills development',
    descAr:'تنمية المهارات عملية متدرجة تهتم بالتواصل والتفاعل والمشاركة والاعتماد على النفس. اختيار الأنشطة يقوم على أولويات الطفل والأسرة ولا يعتمد على مقارنة طفل بآخر.',
    descEn:'Developmental skills grow at different rates. Activities can nurture interaction, participation and independence while respecting the child’s individuality and family priorities.',
    pointsAr:['مهارات الحياة اليومية والاعتماد على النفس','مهارات اللعب والمشاركة الاجتماعية','أهداف واقعية قابلة للمتابعة'],
    pointsEn:['Independence and daily-living activities','Play and social participation','Realistic, trackable individual goals'],
    faqAr:['كيف يتم اختيار المهارات المستهدفة؟','تُناقش احتياجات الطفل وأولويات الأسرة، ثم تُحدد أهداف مناسبة بعد التقييم والخطة الفردية.'],
    faqEn:['How are development goals selected?','Goals are guided by the child’s needs and family priorities, with assessment-based individualized planning.'],
    keysAr:'تنمية مهارات الطفل, مهارات اجتماعية, تنمية الاستقلالية', keysEn:'child development specialist, skills development, early developmental support'
  },
  {
    slug: 'attention-and-focus',
    ar: 'تنمية الانتباه والتركيز لدى الأطفال', en: 'Attention and Focus Skills for Children',
    shortAr:'الانتباه والتركيز', shortEn:'Attention and focus',
    descAr:'قد يحتاج الطفل إلى أنشطة تساعده على الاستمرار في مهمة مناسبة لعمره أو تنظيم الاستجابة للمشتتات. لا تعني صعوبة التركيز وحدها وجود تشخيص، لذلك تبدأ الخطوات بفهم السياق واحتياجات الطفل.',
    descEn:'Attention and focus activities can help children participate in age-appropriate tasks and develop task organization. Difficulty focusing alone is not a diagnosis.',
    pointsAr:['أنشطة الانتباه البصري والسمعي','العمل على تنظيم المهمة والتدرج في مدتها','تعاون الأسرة على عادات وأنشطة مناسبة'],
    pointsEn:['Visual and listening-attention activities','Age-appropriate task organization','Consistent support at home'],
    faqAr:['هل ضعف التركيز يعني فرط حركة؟','ليس بالضرورة؛ تتعدد الأسباب المحتملة وتحتاج المخاوف المستمرة إلى تقييم مختص قبل تحديد أي تشخيص.'],
    faqEn:['Does inattention always mean ADHD?','No. There can be many reasons for inattention; ongoing concerns warrant appropriate professional evaluation.'],
    keysAr:'تنمية الانتباه والتركيز, قلة التركيز عند الأطفال, مهارات الانتباه', keysEn:'attention training for children, child focus skills, attention support'
  },
  {
    slug: 'family-guidance',
    ar: 'الإرشاد الأسري ودعم الأهل', en: 'Family Guidance and Parent Support',
    shortAr:'الإرشاد الأسري', shortEn:'Family guidance',
    descAr:'وجود الأسرة شريك أساسي في رحلة الطفل. تركز الإرشادات على اختيار أنشطة منزلية قابلة للتطبيق، وتوضيح أهداف المتابعة، والإجابة عن الأسئلة المرتبطة بالتواصل والمهارات والسلوك.',
    descEn:'Family involvement can strengthen a child-centered support plan. Guidance focuses on practical home activities, clear goals and communicating about speech, behavior and developmental needs.',
    pointsAr:['مناقشة تحديات الأسرة وأولوياتها','أفكار عملية متناسبة مع روتين المنزل','تنسيق المتابعة وملاحظة التقدم'],
    pointsEn:['Understanding family concerns and priorities','Practical activities for everyday routines','Communication and follow-up'],
    faqAr:['هل يمكن الاستفادة من جلسة إرشاد دون حضور الطفل؟','يمكن الاستفسار عن طبيعة الإرشاد المناسب، لكن تحديد الحاجة إلى تقييم الطفل أو حضوره يعتمد على الحالة وأهداف الدعم.'],
    faqEn:['Can parents seek guidance without the child attending?','Families can discuss available formats, although the need for child assessment or attendance depends on the goals.'],
    keysAr:'إرشاد أسري, دعم الأهل, إرشادات التعامل مع الطفل', keysEn:'parent guidance, family support, child development guidance'
  }
];
const navLinks=(language='ar') => topics.map(t=>`<a href="/${language==='en'?'en/':''}services/${t.slug}/">${esc(language==='ar'?t.shortAr:t.shortEn)}</a>`).join('');
function page(t, language){
  const ar=language==='ar';
  const lang=ar?'ar':'en';
  const route=`/${ar?'':'en/'}services/${t.slug}/`;
  const translatedRoute=`/${ar?'en/':''}services/${t.slug}/`;
  const title=ar?`${t.ar} | روان محمد | Rewan Mohamed`:`${t.en} | Rewan Mohamed`;
  const description=ar?`${t.descAr} روان محمد — أخصائية تخاطب وتنمية مهارات وتعديل سلوك. للاستفسار عن الجلسات الأونلاين والحضورية.`:`${t.descEn} Learn about Rewan Mohamed’s approach and ask about online and in-person sessions.`;
  const points=ar?t.pointsAr:t.pointsEn;
  const keywords=ar?`${t.keysAr}, روان محمد, Rewan Mohamed`:`${t.keysEn}, Rewan Mohamed, روان محمد`;
  const what=ar?'كيف يتم الدعم؟':'How support works';
  const who=ar?'مساحة للتقدم تناسب كل طفل':'Supporting each child as an individual';
  const steps=ar?['مناقشة الهدف مع الأسرة','فهم الاحتياجات والتقييم المناسب','أنشطة وأهداف فردية','متابعة وتواصل مستمر']:['Discuss goals with the family','Understand needs and professional assessment','Individual goals and activities','Ongoing communication and follow-up'];
  const descriptionCopy=ar?`${t.descAr} تتنوع احتياجات الأطفال، لذلك لا توجد خطة واحدة تلائم الجميع. تبدأ الخطوة المناسبة من الاستماع للأسرة والتعرف على نقاط القوة والتحديات، ثم الاتفاق على أسلوب متابعة واضح. تتوفر إمكانية الاستفسار عن الجلسات الحضورية أو الأونلاين، ويتم اختيار الشكل المناسب وفق الاحتياج.`:`${t.descEn} Every child has a different set of strengths and challenges, so no single plan fits everyone. The first step is to discuss family concerns, understand the child’s abilities and consider appropriate assessment. You can inquire about online and in-person sessions; the most suitable format depends on the specific needs.`;
  const extra=ar?'هذا المحتوى للتعريف بالخدمة ولا يمثل تشخيصًا أو وعدًا بنتيجة علاجية. تستلزم الحالات التي تحتاج إلى تقييم تشخيصي الرجوع إلى المختص المناسب.':'This page describes an area of support. It is not a diagnosis, medical advice, or a promise of results. Assessment and diagnosis, where needed, should be provided by appropriately qualified professionals.';
  const faq=ar?t.faqAr:t.faqEn;
  const canonical=origin?`<link rel="canonical" href="${esc(fullUrl(route))}" />`:'';
  const hreflangs=origin?`<link rel="alternate" hreflang="ar" href="${esc(fullUrl(`/services/${t.slug}/`))}" /><link rel="alternate" hreflang="en" href="${esc(fullUrl(`/en/services/${t.slug}/`))}" /><link rel="alternate" hreflang="x-default" href="${esc(fullUrl(`/services/${t.slug}/`))}" />`:'';
  const schema={ '@context':'https://schema.org','@graph':[
    { '@type':'WebPage',name:title,inLanguage:lang,description, ...(origin?{url:fullUrl(route)}:{}) },
    { '@type':'Service',name:ar?t.ar:t.en,serviceType:ar?t.ar:t.en,description:ar?t.descAr:t.descEn,provider:{'@type':'Person',name:'روان محمد',alternateName:['Rewan Mohamed','Rawan Mohamed'],jobTitle:'Speech and child development specialist'},availableLanguage:['ar','en'],areaServed:'EG' },
    { '@type':'FAQPage',mainEntity:[{'@type':'Question',name:faq[0],acceptedAnswer:{'@type':'Answer',text:faq[1]}}]}
  ]};
  return `<!doctype html><html lang="${lang}" dir="${ar?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#173e32"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="keywords" content="${esc(keywords)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${esc(fullUrl('/assets/portrait.webp')||'/assets/portrait.webp')}"><meta property="og:url" content="${esc(fullUrl(route))}"><meta property="og:locale" content="${ar?'ar_EG':'en_US'}"><meta name="twitter:card" content="summary_large_image">${canonical}${hreflangs}<link rel="icon" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Tajawal:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
<style>:root{font-family:${ar?"'Tajawal'":"'DM Sans'"},sans-serif;color:#173f32;background:#f8f7f2}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}a{color:inherit;text-decoration:none}p{line-height:1.9}header{background:#fff;border-bottom:1px solid #dfe7db;padding:19px 0}.shell{max-width:1060px;width:calc(100% - 36px);margin:0 auto}.nav{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}.brand{font-weight:800;font-size:25px}.brand small{display:block;font-size:10px;font-weight:600;color:#73877a}.switch{border:1px solid #b8cdbb;border-radius:30px;padding:10px 17px;font-size:13px;font-weight:700}main{padding-bottom:85px}.hero{background:linear-gradient(112deg,#e5efe5,#f8f7f2);padding:105px 0 100px}.eyebrow{color:#8f714e;font-weight:800;letter-spacing:1px;font-size:13px}h1{font-size:clamp(37px,6vw,74px);line-height:1.2;letter-spacing:-1px;max-width:880px;margin:16px 0 20px}h1 span{color:#628e76}.lead{font-size:19px;max-width:780px;color:#476857}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.btn{padding:16px 24px;border-radius:45px;background:#173f32;color:#fff;font-weight:800;display:inline-block}.btn.outline{border:1px solid #c7d5c7;background:#fff;color:#173f32}.section{padding:70px 0}.section h2{font-size:clamp(29px,4vw,42px);margin:0 0 18px}.body{max-width:820px;color:#587161;font-size:17px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:30px 0}.item{padding:28px 25px;border-radius:18px;border:1px solid #dce6dc;background:#fff;line-height:1.8;font-weight:700}.item b{display:block;color:#ba976b;font:700 13px 'DM Sans';margin-bottom:18px}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:30px}.step{padding:22px 18px;background:#e7eee5;border-radius:14px;font-weight:700}.step span{display:block;color:#a88862;font:700 13px 'DM Sans';margin-bottom:10px}.faq{border:1px solid #dce6dc;border-radius:20px;background:#fff;padding:24px 28px;max-width:850px}.faq h3{font-size:21px}.faq p{margin-bottom:0;color:#587161}.notice{font-size:13px;color:#758b79;margin-top:20px}.all{display:flex;gap:10px;flex-wrap:wrap;padding-top:17px}.all a{border:1px solid #dce6dc;border-radius:30px;background:#fff;padding:9px 14px;font-size:13px;font-weight:700}.ctas{background:#173f32;color:#fff;padding:65px 0}.ctas p{max-width:700px;color:#d0e1d1}.ctas .btn{background:#e6d0a9;color:#193c30}footer{background:#0e2c23;color:#aec2b5;padding:28px 0;font-size:13px}.foot{display:flex;gap:14px;justify-content:space-between;flex-wrap:wrap}@media(max-width:700px){.hero{padding:70px 0}.section{padding:55px 0}.grid,.steps{grid-template-columns:1fr}.lead{font-size:16px}} </style></head><body><header><div class="shell nav"><a class="brand" href="/">${ar?'روان محمد':'Rewan Mohamed'}<small>${ar?'تخاطب · تنمية مهارات · تعديل سلوك':'Speech · Development · Behavior'}</small></a><a class="switch" href="${translatedRoute}">${ar?'English version':'النسخة العربية'}</a></div></header><main><section class="hero"><div class="shell"><div class="eyebrow">${ar?'مجالات تخصص روان محمد':'REWAN MOHAMED · AREAS OF SUPPORT'}</div><h1>${esc(ar?t.ar:t.en)} <span>— ${ar?'بداية لفهم أفضل':'individual care'}</span></h1><p class="lead">${esc(ar?t.descAr:t.descEn)}</p><div class="actions"><a class="btn" href="${ar?'/':'/en/'}#booking">${ar?'استفسري عن موعد':'Ask about an appointment'}</a><a class="btn outline" href="${ar?'/':'/en/'}#services">${ar?'جميع التخصصات':'All service areas'}</a></div></div></section><section class="section"><div class="shell"><h2>${esc(what)}</h2><p class="body">${esc(descriptionCopy)}</p><div class="grid">${points.map((p,i)=>`<div class="item"><b>${String(i+1).padStart(2,'0')}</b>${esc(p)}</div>`).join('')}</div></div></section><section class="section" style="background:#edf2eb"><div class="shell"><h2>${who}</h2><p class="body">${ar?'لا تعتمد رحلة الدعم على مقارنات أو وعود سريعة. من المهم النظر إلى الطفل كفرد والتعاون مع الأسرة في خطوات واضحة ومناسبة.':'The process is based on listening and realistic goals rather than comparisons or promises of quick results.'}</p><div class="steps">${steps.map((s,i)=>`<div class="step"><span>${String(i+1).padStart(2,'0')}</span>${esc(s)}</div>`).join('')}</div></div></section><section class="section"><div class="shell"><h2>${ar?'أسئلة شائعة':'Common questions'}</h2><article class="faq"><h3>${esc(faq[0])}</h3><p>${esc(faq[1])}</p></article><p class="notice">${esc(extra)}</p><h2 style="margin-top:50px;font-size:26px">${ar?'اكتشفي أيضًا':'Explore other services'}</h2><nav class="all">${navLinks(lang)}</nav></div></section><section class="ctas"><div class="shell"><h2>${ar?'معًا نبدأ الخطوة المناسبة':'Start with a conversation'}</h2><p>${ar?'روان محمد — تخاطب وتنمية مهارات وتعديل سلوك. للاستفسارات عن الجلسات الحضورية والأونلاين، تواصلي مباشرة.':'Rewan Mohamed — speech, developmental skills and behavior support. Please get in touch to ask about available session formats.'}</p><a class="btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/201001659150?text=${encodeURIComponent(ar?`مرحبًا، أريد الاستفسار عن ${t.ar}`:`Hello, I'd like to ask about ${t.en}`)}">${ar?'تواصلي عبر واتساب':'Contact via WhatsApp'}</a></div></section></main><footer><div class="shell foot"><span>© 2026 ${ar?'روان محمد':'Rewan Mohamed'}</span><span>${ar?'الاسم بالإنجليزية: Rewan Mohamed':'الاسم بالعربية: روان محمد'}</span><a href="/">${ar?'الصفحة الرئيسية':'Home'}</a></div></footer></body></html>`;
}
for (const t of topics) for (const lang of ['ar','en']) {
  const directory=path.join(DIST,lang==='ar'?'':'en','services',t.slug);
  fs.mkdirSync(directory,{recursive:true});
  fs.writeFileSync(path.join(directory,'index.html'),page(t,lang),'utf8');
}
// Home page is Arabic-first. Canonical and hreflang are generated in build-static.mjs.
const homepage=path.join(DIST,'index.html');
let html=fs.readFileSync(homepage,'utf8');
if(origin && !html.includes('<link rel="canonical"')){html=html.replace('</head>',`<link rel="canonical" href="${origin}/"/><link rel="alternate" hreflang="ar" href="${origin}/"/><link rel="alternate" hreflang="en" href="${origin}/en/"/><link rel="alternate" hreflang="x-default" href="${origin}/"/></head>`);}
// The page already contains a keywords tag; do not duplicate metadata.
fs.writeFileSync(homepage,html);
fs.writeFileSync(path.join(DIST,'robots.txt'),`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
if (origin) {
  const routes=['/','/en/'].concat(topics.flatMap(t=>[`/services/${t.slug}/`,`/en/services/${t.slug}/`]));
  const now=new Date().toISOString().slice(0,10);
  fs.writeFileSync(path.join(DIST,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${esc(fullUrl(route))}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${route==='/'?'1.0':'0.7'}</priority></url>`).join('')}</urlset>`);
} else {
  fs.writeFileSync(path.join(DIST,'SITEMAP_SETUP.txt'), 'Set SITE_URL=https://your-own-deployed-domain in Vercel Environment Variables and rebuild to automatically create sitemap.xml and canonical URLs.');
}
console.log(`SEO pages built: ${topics.length*2}; SITE_URL: ${origin||'(not set - sitemap deferred)'}`);
