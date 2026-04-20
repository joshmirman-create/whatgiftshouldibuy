import React, { useState } from 'react'

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  navy:'#1B2B4B', navyDark:'#0D1B2A', navyMid:'#2C4270', navyLight:'#E8ECF4',
  gold:'#C9A84C', goldLight:'#FFF8E7', goldBright:'#E8B84B',
  cream:'#FAFAF7', white:'#FFFFFF', charcoal:'#1A1F2E',
  gray:'#4A5568', grayLight:'#718096', grayPale:'#F7F8FA', border:'#E2E4E9',
  shadow:'0 2px 16px rgba(27,43,75,0.10)', r:'16px', rSm:'10px',
}
const F = "'Montserrat','Trebuchet MS',system-ui,sans-serif"
const F2 = "'DM Sans','Trebuchet MS',system-ui,sans-serif"

// Gift illustration library — maps AI category to local image
// Add new images to /public/images/gifts/ as they are created
const GIFT_IMAGES = {
  'lego-building': '/images/gifts/lego-building.png',
  'art-supplies': '/images/gifts/art-supplies.png',
  'science-stem': '/images/gifts/science-stem.png',
  'outdoor-sports': '/images/gifts/outdoor-sports.png',
  'books-reading': '/images/gifts/books-reading.png',
  'board-games-puzzles': '/images/gifts/board-games-puzzles.png',
  'music-instruments': '/images/gifts/music-instruments.png',
  'pretend-play-dolls': '/images/gifts/pretend-play-dolls.png',
  'tech-gadgets': '/images/gifts/tech-gadgets.png',
  'collectibles-figures': '/images/gifts/collectibles-figures.png',
  'fashion-accessories': '/images/gifts/fashion-accessories.png',
  'cooking-baking': '/images/gifts/cooking-baking.png',
  'animals-nature': '/images/gifts/animals-nature.png',
  'creative-writing-journal': '/images/gifts/creative-writing-journal.png',
  'retro-vintage-gaming': '/images/gifts/retro-vintage-gaming.png',
  'sports-equipment': '/images/gifts/sports-equipment.png',
  'bath-spa-wellness': '/images/gifts/bath-spa-wellness.png',
  'garden-plants': '/images/gifts/garden-plants.png',
  'pets-animals': '/images/gifts/pets-animals.png',
  'travel-adventure': '/images/gifts/travel-adventure.png',
  'cars-vehicles': '/images/gifts/cars-vehicles.png',
  'space-astronomy': '/images/gifts/space-astronomy.png',
  'dinosaurs-fossils': '/images/gifts/dinosaurs-fossils.png',
  'superheroes-comics': '/images/gifts/superheroes-comics.png',
  'princess-fairy': '/images/gifts/princess-fairy.png',
  'construction-tools': '/images/gifts/construction-tools.png',
  'dance-performance': '/images/gifts/dance-performance.png',
  'yoga-mindfulness': '/images/gifts/yoga-mindfulness.png',
  'photography-art': '/images/gifts/photography-art.png',
  'magic-tricks': '/images/gifts/magic-tricks.png',
  'coding-robotics': '/images/gifts/coding-robotics.png',
  'slime-sensory': '/images/gifts/slime-sensory.png',
  'candles-home': '/images/gifts/candles-home.png',
  'jewelry-making': '/images/gifts/jewelry-making.png',
  'fitness-exercise': '/images/gifts/fitness-exercise.png',
  'camping-outdoors': '/images/gifts/camping-outdoors.png',
  'ocean-beach': '/images/gifts/ocean-beach.png',
  'theater-drama': '/images/gifts/theater-drama.png',
  'mystery-detective': '/images/gifts/mystery-detective.png',
  'fantasy-dragons': '/images/gifts/fantasy-dragons.png',
  'history-culture': '/images/gifts/history-culture.png',
  'math-logic': '/images/gifts/math-logic.png',
  'languages-culture': '/images/gifts/languages-culture.png',
  'charity-giving': '/images/gifts/charity-giving.png',
  'experience-tickets': '/images/gifts/experience-tickets.png',
  'subscription-box': '/images/gifts/subscription-box.png',
  'handmade-craft': '/images/gifts/handmade-craft.png',
  'food-snacks': '/images/gifts/food-snacks.png',
  'plants-terrarium': '/images/gifts/plants-terrarium.png',
  'card-games': '/images/gifts/card-games.png',
}
const getGiftImage = (category) => GIFT_IMAGES[category] || null

const AMZN = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=zenmonkeystud-20`
const BOOKSHOP = (t) => `https://bookshop.org/search?keywords=${encodeURIComponent(t)}&affiliate=122560`
const BAM = (t) => `https://www.booksamillion.com/search?query=${encodeURIComponent(t)}&id=101712536-11173806`

// ── AI PROMPT ─────────────────────────────────────────────────────────────────
const GIFT_PROMPT = `You are an expert gift concierge. Someone needs a gift recommendation. They may know very little about the recipient — even just one detail like "loves his boat" or "she's always cold" is enough for you to work with.

Your job: recommend the single most specific, thoughtful, non-generic gift that fits what you know.

RULES:
1. Never recommend gift cards, cash, or "experiences in general." Be specific.
2. If they gave you a specific clue (like "loves his boat"), start your recommendation from that clue and build outward. Make it feel like you actually listened.
3. The price_range must be a range within their budget, not higher.
4. Always include a book recommendation — any format works: novel, graphic novel, coffee table book, field guide, humor book, memoir, activity book, magazine subscription. Match it to their interests.
5. Alternatives should span different directions — not all versions of the same thing.
6. One alternative should always be a book or reading-related gift.
7. The tagline should feel personal to their specific situation, not generic.
8. reflect_back: write a short phrase starting with "Based on the [clue]..." that confirms you understood their specific input. If no specific clue was given, use "Based on what you told us..."

Respond with ONLY valid JSON. No text before or after:
{"gift_name":"Very specific product name","tagline":"Personal to their situation","reflect_back":"Based on the [specific thing]...","why_theyll_love_it":"2-3 sentences specific to what you know about them","price_range":"$X-Y","image_category":"one of: lego-building, art-supplies, science-stem, outdoor-sports, books-reading, board-games-puzzles, music-instruments, pretend-play-dolls, tech-gadgets, collectibles-figures, fashion-accessories, cooking-baking, animals-nature, creative-writing-journal, retro-vintage-gaming, sports-equipment, bath-spa-wellness, garden-plants, pets-animals, travel-adventure, cars-vehicles, space-astronomy, dinosaurs-fossils, superheroes-comics, princess-fairy, construction-tools, dance-performance, yoga-mindfulness, photography-art, magic-tricks, coding-robotics, slime-sensory, candles-home, jewelry-making, fitness-exercise, camping-outdoors, ocean-beach, theater-drama, mystery-detective, fantasy-dragons, history-culture, math-logic, languages-culture, charity-giving, experience-tickets, subscription-box, handmade-craft, food-snacks, plants-terrarium, card-games","amazon_search":"very specific Amazon search term — include brand name, model name, and key descriptor so the first result is the exact product. E.g. 'Thames Kosmos Chemistry C3000 kit' not just 'chemistry kit'","what_people_say":"2-3 sentence summary of what buyers report. Genuine tone, not fake quote.","occasion_note":"one sentence on why this fits the occasion if relevant","book":{"title":"Real book title","author":"Real author","why":"why this fits them specifically","type":"novel / graphic novel / field guide / coffee table book / etc"},"alternatives":[{"name":"Specific alt","reason":"why this direction","search":"amazon search"},{"name":"Specific alt","reason":"why this direction","search":"amazon search"},{"name":"Specific alt","reason":"why this direction","search":"amazon search"},{"name":"Book or reading gift","reason":"for the reader in them","search":"amazon search"}]}`

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, href, target, variant='primary', size='md', style:s={} }) => {
  const base = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, borderRadius:50, fontFamily:F, fontWeight:800, cursor:'pointer', textDecoration:'none', border:'none', transition:'all .15s' }
  const sizes = { sm:{fontSize:12,padding:'7px 16px'}, md:{fontSize:14,padding:'11px 22px'}, lg:{fontSize:16,padding:'14px 28px'} }
  const variants = {
    primary:{background:T.navy,color:'#fff'},
    gold:{background:T.gold,color:T.navyDark},
    outline:{background:'transparent',color:T.navy,border:`2px solid ${T.navy}`},
    ghostGold:{background:'transparent',color:T.gold,border:`2px solid ${T.gold}`},
    gray:{background:T.grayPale,color:T.gray,border:`1.5px solid ${T.border}`},
  }
  const style = {...base,...sizes[size],...variants[variant],...s}
  return href
    ? <a href={href} target={target} rel="noopener" style={style}>{children}</a>
    : <button onClick={onClick} style={style}>{children}</button>
}

const Card = ({ children, style:s={} }) => (
  <div style={{background:T.white,borderRadius:T.r,boxShadow:T.shadow,border:`1px solid ${T.border}`,...s}}>{children}</div>
)

const Pill = ({ children, bg, color }) => (
  <span style={{display:'inline-flex',alignItems:'center',background:bg,color,borderRadius:50,padding:'3px 10px',fontSize:11,fontWeight:700,fontFamily:F,whiteSpace:'nowrap'}}>{children}</span>
)

const SLabel = ({ children, color=T.gray }) => (
  <div style={{fontSize:10,fontWeight:800,letterSpacing:1.5,color,textTransform:'uppercase',marginBottom:8,fontFamily:F}}>{children}</div>
)

const Chip = ({ label, emoji, selected, onClick, wide }) => (
  <button onClick={onClick} style={{
    display:'flex', alignItems:'center', gap:6, padding: wide ? '10px 16px' : '8px 14px',
    borderRadius:50, border:`2px solid ${selected?T.gold:T.border}`,
    background: selected ? T.goldLight : T.white,
    color: selected ? T.navyDark : T.gray,
    fontFamily:F, fontWeight:700, fontSize:13, cursor:'pointer',
    transition:'all .15s', whiteSpace:'nowrap'
  }}>
    {emoji && <span>{emoji}</span>}{label}
  </button>
)

const AdUnit = ({ style:s={} }) => (
  <div style={{background:T.grayPale,border:`1px dashed ${T.border}`,borderRadius:T.rSm,padding:'16px',textAlign:'center',color:T.grayLight,fontSize:11,fontFamily:F,...s}}>ADVERTISEMENT</div>
)

// ── SITE HEADER ───────────────────────────────────────────────────────────────
function SiteHeader({ onHome }) {
  return (
    <>
      <header style={{background:T.white,borderBottom:`1.5px solid ${T.border}`,position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(27,43,75,0.07)'}}>
        <style>{`
          .gNav{display:none}
          @media(min-width:600px){.gNav{display:block}}
          .gBottomNav button,.gBottomNav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:none;border:none;cursor:pointer;font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;padding:8px 4px;text-decoration:none;line-height:1.2;color:#718096}
          @media(max-width:599px){body{padding-bottom:68px}}
          @media(max-width:599px){.gHeader{flex-direction:column;align-items:flex-start;height:auto;padding:10px 16px;gap:6px}}
          @media(max-width:599px){.gHeaderNav{width:100%;justify-content:flex-start}}
        `}</style>
        <div className="gHeader" style={{maxWidth:1200,margin:'0 auto',padding:'0 16px',display:'flex',alignItems:'center',justifyContent:'space-between',height:52}}>
          <button onClick={onHome} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:7,flexShrink:0}}>
            <span style={{fontSize:18}}>🎁</span>
            <span style={{fontSize:13,fontWeight:900,color:T.navy,fontFamily:F,whiteSpace:'nowrap'}}>
              <span style={{color:T.gold}}>what gift</span> should i buy?
            </span>
          </button>
          <nav className="gHeaderNav" style={{display:'flex',gap:2,alignItems:'center',flexShrink:0}}>
            <a href="/browse" className="gNav" style={{background:'none',border:'none',padding:'6px 10px',fontSize:13,fontWeight:700,color:T.gray,fontFamily:F,whiteSpace:'nowrap',textDecoration:'none'}}>Browse</a>
            <Btn size="sm" variant="gold" onClick={onHome} style={{marginLeft:6,whiteSpace:'nowrap'}}>🎁 Find a gift</Btn>
          </nav>
        </div>
      </header>
      <nav className="gBottomNav" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:T.white,borderTop:`1.5px solid ${T.border}`,boxShadow:'0 -2px 12px rgba(27,43,75,0.10)',display:'flex',paddingBottom:'env(safe-area-inset-bottom)'}}>
        <a href="/browse"><span style={{fontSize:20}}>🗂️</span>Browse</a>
        <button onClick={onHome} style={{color:T.gold,fontWeight:900}}><span style={{fontSize:20}}>🎁</span>Find a gift</button>
      </nav>
    </>
  )
}

function SiteFooter() {
  return (
    <footer style={{background:T.navyDark,padding:'20px',marginTop:40}}>
      <div style={{maxWidth:1000,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
        <div style={{fontSize:13,color:'rgba(255,255,255,.5)',fontFamily:F}}>🎁 whatgiftshouldibuy.com</div>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          {[['Birthday','/birthday-gift-ideas'],['Christmas','/christmas-gift-ideas'],['For boyfriend','/gift-ideas-for-boyfriend'],['For girlfriend','/gift-ideas-for-girlfriend'],['For him','/gift-ideas-for-him'],['For her','/gift-ideas-for-her'],['Under $50','/gift-ideas-under-50'],['Browse all','/browse']].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:12,color:'rgba(255,255,255,.4)',textDecoration:'none',fontFamily:F}}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1000,margin:'8px auto 0',display:'flex',gap:16}}>
        <a href="/about" style={{fontSize:11,color:'rgba(255,255,255,.35)',fontFamily:F,textDecoration:'none'}}>About</a>
        <a href="/privacy" style={{fontSize:11,color:'rgba(255,255,255,.35)',fontFamily:F,textDecoration:'none'}}>Privacy Policy</a>
      </div>
    </footer>
  )
}

// ── QUIZ STEPS ────────────────────────────────────────────────────────────────
const RELATIONSHIPS = [
  {v:'partner',l:'Partner',e:'💑'},{v:'friend',l:'Friend',e:'🤝'},
  {v:'mom',l:'Mom',e:'👩'},{v:'dad',l:'Dad',e:'👨'},
  {v:'sibling',l:'Sibling',e:'👫'},{v:'grandparent',l:'Grandparent',e:'👴'},
  {v:'colleague',l:'Colleague',e:'💼'},{v:'teacher',l:'Teacher',e:'🍎'},
  {v:'child',l:'Child',e:'🧒'},{v:'teen',l:'Teen',e:'🎮'},
  {v:'boss',l:'Boss',e:'👔'},{v:'neighbor',l:'Neighbor',e:'🏠'},
  {v:'barely-know',l:"Someone I barely know",e:'🤷'},
]

const AGE_RANGES = [
  {v:'under-10',l:'Under 10'},{v:'10-17',l:'10 to 17'},
  {v:'18-30',l:'18 to 30'},{v:'30-45',l:'30 to 45'},
  {v:'45-60',l:'45 to 60'},{v:'60+',l:'60 and over'},
  {v:'unknown',l:"Not sure"},
]

const INTERESTS = [
  {v:'outdoors',l:'Outdoors & adventure',e:'🌊'},
  {v:'gaming',l:'Gaming & tech',e:'🎮'},
  {v:'cooking',l:'Food & cooking',e:'🍳'},
  {v:'reading',l:'Reading & learning',e:'📚'},
  {v:'creative',l:'Creative & crafty',e:'🎨'},
  {v:'fitness',l:'Fitness & wellness',e:'💪'},
  {v:'music',l:'Music & concerts',e:'🎵'},
  {v:'home',l:'Home & garden',e:'🌱'},
  {v:'travel',l:'Travel & experiences',e:'✈️'},
  {v:'pets',l:'Pet obsessed',e:'🐾'},
  {v:'drinks',l:'Wine, beer & spirits',e:'🍷'},
  {v:'selfcare',l:'Calm & self-care',e:'🧘'},
  {v:'humor',l:'Humor & novelty',e:'😂'},
  {v:'sports',l:'Sports fan',e:'⚽'},
  {v:'newparent',l:'New parent',e:'👶'},
  {v:'cars',l:'Cars & motors',e:'🚗'},
  {v:'fashion',l:'Style & fashion',e:'👗'},
  {v:'science',l:'Science & space',e:'🔬'},
]

const BUDGETS = [
  {v:'under-25',l:'Under $25',e:'💵'},
  {v:'25-50',l:'$25 to $50',e:'💰'},
  {v:'50-100',l:'$50 to $100',e:'💳'},
  {v:'100-200',l:'$100 to $200',e:'✨'},
  {v:'200+',l:'$200 and up',e:'🌟'},
]

const OCCASIONS = [
  {v:'birthday',l:'Birthday',e:'🎂'},
  {v:'christmas',l:'Christmas / Holiday',e:'🎄'},
  {v:'anniversary',l:'Anniversary',e:'💝'},
  {v:'just-because',l:'Just because',e:'💜'},
  {v:'secret-santa',l:'Secret Santa',e:'🎅'},
  {v:'white-elephant',l:'White Elephant',e:'🐘'},
  {v:'wedding',l:'Wedding / Engagement',e:'💍'},
  {v:'housewarming',l:'Housewarming',e:'🏠'},
  {v:'graduation',l:'Graduation',e:'🎓'},
  {v:'thank-you',l:'Thank you',e:'🙏'},
  {v:'teacher',l:'Teacher gift',e:'🍎'},
  {v:'congrats',l:'Congratulations',e:'🎉'},
]

// ── QUIZ VIEW ──────────────────────────────────────────────────────────────────
function QuizView({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    relationship:'', age:'', interests:[], clue:'', budget:'', occasion:''
  })

  const totalSteps = 5
  const pct = ((step + 1) / totalSteps) * 100

  const canNext = () => {
    if (step === 0) return !!answers.relationship
    if (step === 1) return !!answers.age
    if (step === 2) return answers.interests.length > 0 || answers.clue.trim().length > 2
    if (step === 3) return !!answers.budget
    if (step === 4) return !!answers.occasion
    return true
  }

  const toggleInterest = (v) => {
    setAnswers(a => ({
      ...a,
      interests: a.interests.includes(v)
        ? a.interests.filter(i => i !== v)
        : a.interests.length < 3 ? [...a.interests, v] : a.interests
    }))
  }

  const nextLabel = () => {
    if (step === 4) return '🎁 Find their gift'
    if (step === 0 && answers.relationship) {
      const r = RELATIONSHIPS.find(r => r.v === answers.relationship)
      return r ? `Shopping for ${r.l.toLowerCase()} →` : 'Next →'
    }
    if (step === 3 && answers.budget) {
      const b = BUDGETS.find(b => b.v === answers.budget)
      return b ? `${b.l} works →` : 'Next →'
    }
    return 'Next →'
  }

  const optCard = (selected) => ({
    display:'flex', alignItems:'center', gap:10, padding:'14px 18px',
    borderRadius:14, border:`2px solid ${selected ? T.gold : T.border}`,
    background: selected ? T.goldLight : T.white,
    color: selected ? T.navyDark : T.charcoal,
    fontFamily:F, fontWeight:700, fontSize:14, cursor:'pointer',
    transition:'all .15s', textAlign:'left', width:'100%'
  })

  const chipStyle = (selected) => ({
    display:'flex', alignItems:'center', gap:6, padding:'10px 16px',
    borderRadius:50, border:`2px solid ${selected ? T.gold : T.border}`,
    background: selected ? T.goldLight : T.white,
    color: selected ? T.navyDark : T.gray,
    fontFamily:F, fontWeight:700, fontSize:13, cursor:'pointer',
    transition:'all .15s', whiteSpace:'nowrap'
  })

  return (
    <div style={{minHeight:'100vh', background:T.cream}}>
      <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.qfu{animation:fadeUp .25s ease}"}</style>
      <div style={{background:T.navyLight, height:4, position:'sticky', top:52, zIndex:99}}>
        <div style={{background:`linear-gradient(90deg,${T.navy},${T.gold})`, height:'100%', width:`${pct}%`, transition:'width .4s ease'}}/>
      </div>
      <div style={{maxWidth:600, margin:'0 auto', padding:'40px 20px 60px'}}>
        <div className="qfu" key={step}>

          {step === 0 && (
            <>
              <h2 style={{fontSize:'clamp(22px,5vw,30px)', fontWeight:900, color:T.navy, margin:'0 0 8px', fontFamily:F, lineHeight:1.2}}>Who's the lucky person?</h2>
              <p style={{fontSize:14, color:T.gray, margin:'0 0 24px', fontFamily:F2}}>Pick the closest match.</p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {RELATIONSHIPS.map(r => (
                  <button key={r.v} onClick={()=>setAnswers(a=>({...a,relationship:r.v}))} style={optCard(answers.relationship===r.v)}>
                    <span style={{fontSize:20}}>{r.e}</span>{r.l}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 style={{fontSize:'clamp(22px,5vw,30px)', fontWeight:900, color:T.navy, margin:'0 0 8px', fontFamily:F, lineHeight:1.2}}>How old are they, roughly?</h2>
              <p style={{fontSize:14, color:T.gray, margin:'0 0 24px', fontFamily:F2}}>Ballpark is totally fine.</p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {AGE_RANGES.map(a => (
                  <button key={a.v} onClick={()=>setAnswers(x=>({...x,age:a.v}))} style={optCard(answers.age===a.v)}>
                    {a.l}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{fontSize:'clamp(22px,5vw,30px)', fontWeight:900, color:T.navy, margin:'0 0 8px', fontFamily:F, lineHeight:1.2}}>What do you know about them?</h2>
              <p style={{fontSize:14, color:T.gray, margin:'0 0 16px', fontFamily:F2}}>Type the one thing you know, or tap what fits below. Either works.</p>
              <div style={{marginBottom:20}}>
                <label style={{fontSize:13, fontWeight:700, color:T.navy, display:'block', marginBottom:8, fontFamily:F}}>
                  The one thing you know <span style={{fontWeight:400, color:T.grayLight}}>(totally optional)</span>
                </label>
                <textarea
                  value={answers.clue}
                  onChange={e=>setAnswers(a=>({...a,clue:e.target.value}))}
                  placeholder={"He loves his boat · She's always cold · Just got into sourdough · Huge Taylor Swift fan"}
                  style={{width:'100%', border:`2px solid ${T.border}`, borderRadius:12, padding:'12px 14px', fontSize:13, fontFamily:F2, resize:'vertical', minHeight:72, color:T.charcoal, background:T.white, outline:'none', boxSizing:'border-box', lineHeight:1.6}}
                  onFocus={e=>e.target.style.borderColor=T.gold}
                  onBlur={e=>e.target.style.borderColor=T.border}
                />
              </div>
              <div style={{borderTop:`1px solid ${T.border}`, paddingTop:16, marginBottom:8}}>
                <label style={{fontSize:12, fontWeight:700, color:T.grayLight, display:'block', marginBottom:10, fontFamily:F, textTransform:'uppercase', letterSpacing:'0.5px'}}>Or tap what fits</label>
                <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                  {INTERESTS.map(i => (
                    <button key={i.v} onClick={()=>toggleInterest(i.v)} style={chipStyle(answers.interests.includes(i.v))}>
                      <span>{i.e}</span>{i.l}
                    </button>
                  ))}
                </div>
              </div>
              {answers.interests.length > 0 && <p style={{fontSize:11, color:T.grayLight, margin:'8px 0 0', fontFamily:F}}>{answers.interests.length}/3 selected</p>}
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{fontSize:'clamp(22px,5vw,30px)', fontWeight:900, color:T.navy, margin:'0 0 8px', fontFamily:F, lineHeight:1.2}}>What are you thinking to spend?</h2>
              <p style={{fontSize:14, color:T.gray, margin:'0 0 24px', fontFamily:F2}}>We will find the best option right in that range.</p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {BUDGETS.map(b => (
                  <button key={b.v} onClick={()=>setAnswers(a=>({...a,budget:b.v}))} style={optCard(answers.budget===b.v)}>
                    <span style={{fontSize:20}}>{b.e}</span>{b.l}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{fontSize:'clamp(22px,5vw,30px)', fontWeight:900, color:T.navy, margin:'0 0 8px', fontFamily:F, lineHeight:1.2}}>What's the occasion?</h2>
              <p style={{fontSize:14, color:T.gray, margin:'0 0 24px', fontFamily:F2}}>This shapes how we frame the recommendation.</p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {OCCASIONS.map(o => (
                  <button key={o.v} onClick={()=>setAnswers(a=>({...a,occasion:o.v}))} style={optCard(answers.occasion===o.v)}>
                    <span style={{fontSize:20}}>{o.e}</span>{o.l}
                  </button>
                ))}
              </div>
            </>
          )}

          <div style={{display:'flex', gap:10, marginTop:32}}>
            {step > 0 && <Btn variant="gray" onClick={()=>setStep(s=>s-1)} style={{flexShrink:0}}>← Back</Btn>}
            <Btn
              style={{flex:1, opacity:canNext()?1:0.35, background:step===totalSteps-1?T.gold:T.navy, color:step===totalSteps-1?T.navyDark:'#fff', fontSize:15, padding:'13px 22px'}}
              onClick={()=>{ if(!canNext()) return; if(step < totalSteps-1) setStep(s=>s+1); else onComplete(answers) }}
            >
              {nextLabel()}
            </Btn>
          </div>
          <p style={{fontSize:11, color:T.grayLight, textAlign:'center', marginTop:10, fontFamily:F2}}>Free to use · No account needed</p>
        </div>
      </div>
    </div>
  )
}


// ── LOAD STAGES ───────────────────────────────────────────────────────────────
const LOAD_STAGES = [
  {label:'Reading your answers...',pct:15},
  {label:'Thinking through their interests...',pct:32},
  {label:'Finding something specific...',pct:52},
  {label:'Checking the details...',pct:72},
  {label:'Adding a book recommendation...',pct:88},
  {label:'Almost ready!',pct:97},
]

// ── LOADING VIEW ───────────────────────────────────────────────────────────────
function LoadingView({ stage, clue }) {
  const s = LOAD_STAGES[Math.min(stage, LOAD_STAGES.length-1)]
  return (
    <div style={{minHeight:'100vh',background:T.cream,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:480,width:'100%',padding:'40px 24px',textAlign:'center'}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:T.navyLight,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:28}}>🎁</div>
        <h2 style={{fontSize:22,fontWeight:900,color:T.navy,margin:'0 0 6px',fontFamily:F}}>Finding the perfect gift...</h2>
        <p style={{color:T.gray,fontSize:14,margin:'0 0 28px',minHeight:20,fontFamily:F2}}>{s.label}</p>
        <div style={{background:T.navyLight,borderRadius:50,height:10,overflow:'hidden',marginBottom:10}}>
          <div style={{background:`linear-gradient(90deg,${T.navy},${T.gold})`,height:'100%',width:`${s.pct}%`,borderRadius:50,transition:'width .8s ease'}}/>
        </div>
        <p style={{fontSize:11,color:T.grayLight,marginBottom:28,fontFamily:F2}}>{s.pct}% complete</p>
        {clue?.trim() && (
          <Card style={{padding:'14px 18px',textAlign:'left',background:T.goldLight,border:'none',boxShadow:'none'}}>
            <SLabel color={T.gold}>WORKING WITH YOUR CLUE</SLabel>
            <p style={{margin:0,fontSize:13,color:T.gray,lineHeight:1.6,fontFamily:F2}}>"{clue.trim()}"</p>
          </Card>
        )}
      </div>
    </div>
  )
}

// ── ERROR VIEW ────────────────────────────────────────────────────────────────
function ErrorView({ msg, onRetry, onBack }) {
  return (
    <div style={{maxWidth:500,margin:'0 auto',padding:'60px 24px',textAlign:'center'}}>
      <div style={{fontSize:48,marginBottom:14}}>😬</div>
      <h2 style={{fontSize:20,fontWeight:900,color:T.navy,margin:'0 0 8px',fontFamily:F}}>Something went wrong</h2>
      <p style={{fontSize:14,color:T.gray,margin:'0 0 24px',lineHeight:1.6,fontFamily:F2}}>{msg || 'The request timed out or hit an error. Usually fixes itself on retry.'}</p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
        <Btn variant="gold" onClick={onRetry}>↺ Try again</Btn>
        <Btn variant="gray" onClick={onBack}>← Edit answers</Btn>
      </div>
    </div>
  )
}

// ── RESULT VIEW ────────────────────────────────────────────────────────────────
function ResultView({ gift, answers, onNew }) {
  const [copied, setCopied] = useState(false)
  const [productImage, setProductImage] = useState(null)
  const [productUrl, setProductUrl] = useState(null)

  const [altImages, setAltImages] = React.useState({})

  React.useEffect(() => {
    if (!gift?.amazon_search) return
    fetch('/api/amazon-image', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ keywords: gift.amazon_search })
    })
    .then(r => r.json())
    .then(d => {
      if (d.image_url) setProductImage(d.image_url)
      if (d.product_url) setProductUrl(d.product_url)
    })
    .catch(() => {})
  }, [gift?.amazon_search])

  React.useEffect(() => {
    if (!gift?.alternatives?.length) return
    gift.alternatives.forEach((alt, i) => {
      if (!alt.search) return
      fetch('/api/amazon-image', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ keywords: alt.search })
      })
      .then(r => r.json())
      .then(d => {
        if (d.image_url) setAltImages(prev => ({...prev, [i]: { image_url: d.image_url, product_url: d.product_url }}))
      })
      .catch(() => {})
    })
  }, [gift?.alternatives])
  const recipientLabel = RELATIONSHIPS.find(r=>r.v===answers.relationship)?.l || 'them'
  const occasionLabel = OCCASIONS.find(o=>o.v===answers.occasion)?.l || ''
  const shareUrl = window.location.href
  const shareText = `🎁 Gift idea for ${recipientLabel}${occasionLabel?' ('+occasionLabel+')':''}:\n\n${gift.gift_name} (${gift.price_range})\n${gift.tagline}\n\nSee the full result + more ideas: ${shareUrl}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const smsUrl = `sms:?body=${encodeURIComponent(shareText)}`
  const copyIt = () => { navigator.clipboard.writeText(shareText).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000) }) }

  return (
    <div style={{minHeight:'100vh',background:T.cream}}>
      <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}.fu{animation:fadeUp .4s ease forwards}"}</style>

      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${T.navyDark},${T.navy})`,padding:'36px 20px 32px',textAlign:'center',borderBottom:`3px solid ${T.gold}`}}>
        <div style={{maxWidth:640,margin:'0 auto'}}>
          {gift.reflect_back && (
            <div style={{background:'rgba(201,168,76,.15)',border:'1px solid rgba(201,168,76,.35)',borderRadius:12,padding:'12px 18px',marginBottom:20,textAlign:'left'}}>
              <div style={{fontSize:10,fontWeight:800,color:T.gold,letterSpacing:1.2,marginBottom:4,fontFamily:F}}>WE HEARD YOU</div>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:'#fff',fontFamily:F,lineHeight:1.4}}>✓ {gift.reflect_back}</p>
            </div>
          )}
          <h1 style={{fontSize:'clamp(22px,5vw,36px)',fontWeight:900,color:'#fff',margin:'0 0 10px',lineHeight:1.2,fontFamily:F}}>{gift.gift_name}</h1>
          <p style={{color:'rgba(255,255,255,.85)',fontSize:15,margin:'0 0 14px',lineHeight:1.5,fontFamily:F2}}>{gift.tagline}</p>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            <Pill bg='rgba(255,255,255,.15)' color='#fff'>{gift.price_range}</Pill>
            {occasionLabel && <Pill bg='rgba(201,168,76,.2)' color={T.goldBright}>{occasionLabel}</Pill>}
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:'0 auto',padding:'24px 16px'}} className="fu">

        {/* Main gift card */}
        <Card style={{padding:'22px',marginBottom:14}}>
          {productImage && (
            <div style={{textAlign:'center',marginBottom:16}}>
              <img
                src={productImage}
                alt={gift.gift_name}
                style={{maxWidth:200,maxHeight:200,objectFit:'contain',borderRadius:10,boxShadow:'0 2px 12px rgba(0,0,0,.12)'}}
              />
            </div>
          )}
          <SLabel color={T.navy}>WHY THEY'LL LOVE IT</SLabel>
          <p style={{margin:'0 0 12px',fontSize:14,color:T.charcoal,lineHeight:1.7,fontFamily:F2}}>{gift.why_theyll_love_it}</p>
          {gift.occasion_note && <p style={{margin:'0 0 12px',fontSize:12,color:T.grayLight,fontStyle:'italic',fontFamily:F2}}>{gift.occasion_note}</p>}
          {gift.what_people_say && (
            <div style={{background:T.navyLight,borderRadius:T.rSm,padding:'12px 14px',marginBottom:14}}>
              <SLabel color={T.navyMid}>WHAT BUYERS SAY</SLabel>
              <p style={{margin:0,fontSize:13,color:T.navy,lineHeight:1.6,fontFamily:F2}}>{gift.what_people_say}</p>
            </div>
          )}
          <Btn href={productUrl || AMZN(gift.amazon_search)} target="_blank" style={{background:'#FF9900',color:T.navyDark,display:'block',textAlign:'center',borderRadius:10,fontSize:15,padding:'13px 22px'}}>🛒 Find on Amazon →</Btn>
        </Card>

        {/* Book recommendation */}
        {gift.book && (
          <Card style={{padding:'18px 20px',marginBottom:14,borderLeft:`4px solid ${T.gold}`}}>
            <SLabel color={T.gold}>📚 A BOOK THEY'LL LOVE TOO</SLabel>
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <img
                src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(gift.book.title)}-M.jpg`}
                alt={gift.book.title}
                onError={e=>{e.target.style.display='none'}}
                style={{width:52,height:72,objectFit:'cover',borderRadius:6,flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,.15)'}}
              />
              <div style={{flex:1}}>
                {gift.book.type && <div style={{fontSize:10,fontWeight:800,color:T.gold,letterSpacing:.5,marginBottom:3,fontFamily:F,textTransform:'uppercase'}}>{gift.book.type}</div>}
                <div style={{fontSize:14,fontWeight:800,color:T.navy,marginBottom:2,fontFamily:F,lineHeight:1.3}}>{gift.book.title}</div>
                {gift.book.author && <div style={{fontSize:11,color:T.grayLight,marginBottom:5,fontFamily:F2}}>by {gift.book.author}</div>}
                <div style={{fontSize:12,color:T.gray,lineHeight:1.5,fontStyle:'italic',marginBottom:10,fontFamily:F2}}>{gift.book.why}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  <Btn size="sm" href={AMZN(`${gift.book.title} book`)} target="_blank" style={{background:'#FF9900',color:T.navyDark,fontSize:11}}>Amazon</Btn>
                  <Btn size="sm" href={BOOKSHOP(gift.book.title)} target="_blank" style={{background:T.navyDark,fontSize:11}}>Bookshop.org</Btn>
                  <Btn size="sm" href={BAM(gift.book.title)} target="_blank" style={{background:'#CC0000',fontSize:11}}>Books-A-Million</Btn>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Alternatives - visual card grid */}
        {gift.alternatives?.length > 0 && (
          <Card style={{padding:'18px 20px',marginBottom:14}}>
            <SLabel color={T.navy}>MORE IDEAS</SLabel>
            <p style={{margin:'0 0 14px',fontSize:12,color:T.gray,fontFamily:F2}}>Not quite right? These go in a different direction.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:10}}>
              {gift.alternatives.map((alt,i) => (
                <a key={i} href={altImages[i]?.product_url || AMZN(alt.search)} target="_blank" rel="noopener"
                  style={{background:T.navyLight,borderRadius:12,padding:'14px',textDecoration:'none',display:'block',border:`1.5px solid ${T.border}`,transition:'all .15s'}}>
                  {altImages[i]?.image_url
                    ? <img src={altImages[i].image_url} alt={alt.name} style={{width:'100%',height:100,objectFit:'contain',borderRadius:8,marginBottom:8,background:'#fff'}} onError={e=>e.target.style.display='none'}/>
                    : <div style={{fontSize:22,marginBottom:8}}>🎁</div>
                  }
                  <div style={{fontSize:13,fontWeight:800,color:T.navy,marginBottom:4,fontFamily:F,lineHeight:1.3}}>{alt.name}</div>
                  <div style={{fontSize:11,color:T.gray,lineHeight:1.4,marginBottom:8,fontFamily:F2}}>{alt.reason}</div>
                  <div style={{fontSize:11,fontWeight:700,color:T.gold,fontFamily:F}}>See on Amazon →</div>
                </a>
              ))}
            </div>
          </Card>
        )}

        {/* Share */}
        <Card style={{padding:'16px 18px',marginBottom:14}}>
          <SLabel color={T.navy}>SEND THIS IDEA</SLabel>
          <p style={{margin:'0 0 12px',fontSize:12,color:T.gray,fontFamily:F2}}>Share with a co-buyer, or send straight to the group chat.</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <a href={waUrl} target="_blank" rel="noopener" style={{display:'flex',alignItems:'center',gap:5,background:'#25D366',color:'#fff',borderRadius:50,padding:'7px 14px',textDecoration:'none',fontSize:12,fontWeight:700,fontFamily:F}}>💬 WhatsApp</a>
            <a href={smsUrl} style={{display:'flex',alignItems:'center',gap:5,background:T.navyDark,color:'#fff',borderRadius:50,padding:'7px 14px',textDecoration:'none',fontSize:12,fontWeight:700,fontFamily:F}}>📱 Text</a>
            <button onClick={copyIt} style={{display:'flex',alignItems:'center',gap:5,background:copied?'#F0FAF4':T.grayPale,color:copied?'#2D6A4F':T.gray,border:`1.5px solid ${copied?'#2D6A4F':T.border}`,borderRadius:50,padding:'7px 14px',fontSize:12,fontWeight:700,fontFamily:F,cursor:'pointer'}}>{copied?'✓ Copied!':'📋 Copy'}</button>
          </div>
        </Card>

        <div style={{background:'#F0FAF4',border:'1.5px solid #D8F3DC',borderRadius:12,padding:'14px 18px',marginBottom:14,textAlign:'center'}}>
          <p style={{margin:'0 0 8px',fontSize:13,fontWeight:700,color:'#2D6A4F',fontFamily:F}}>Need an activity to do with this gift?</p>
          <a href="https://whatshouldmykiddo.com" target="_blank" rel="noopener" style={{background:'#2D6A4F',color:'#fff',borderRadius:50,padding:'8px 18px',fontSize:12,fontWeight:800,fontFamily:F,textDecoration:'none',display:'inline-block'}}>✨ Try whatshouldmykiddo.com →</a>
        </div>
        <AdUnit style={{marginBottom:14}}/>

        <div style={{display:'flex',gap:10}}>
          <Btn style={{flex:1,background:T.gold,color:T.navyDark}} onClick={onNew}>🎁 Find another gift</Btn>
          <Btn variant="outline" href="/browse">Browse all ideas</Btn>
        </div>
        <div style={{marginTop:16,display:'flex',flexWrap:'wrap',gap:8}}>
          {[['💕 For boyfriend','/gift-ideas-for-boyfriend'],['💝 For girlfriend','/gift-ideas-for-girlfriend'],['💍 For husband','/gift-ideas-for-husband'],['👸 For wife','/gift-ideas-for-wife'],['🎂 Birthday','/birthday-gift-ideas'],['🎄 Christmas','/christmas-gift-ideas'],['👨 For dad','/gift-ideas-for-dad'],['👩 For mom','/gift-ideas-for-mom']].map(([l,h])=>(
            <a key={l} href={h} style={{background:T.navyLight,color:T.navy,borderRadius:50,padding:'6px 12px',fontSize:11,fontWeight:700,fontFamily:F,textDecoration:'none'}}>{l}</a>
          ))}
        </div>
      </div>
      <SiteFooter/>
    </div>
  )
}

// ── HOMEPAGE ──────────────────────────────────────────────────────────────────
function HomePage({ onStart }) {
  const SAMPLE = [
    {who:"For a colleague",clue:'"He loves his boat"',result:'Personalized dock line organizer with marine-grade rope',budget:'$40-60'},
    {who:"For mom",clue:'"Always cold, loves tea"',result:'Cashmere-blend heated throw blanket + artisan loose leaf sampler',budget:'$65-85'},
    {who:"Secret Santa",clue:'"She\'s really into true crime"',result:'True crime subscription box — cold case files and puzzles',budget:'$30-45'},
    {who:"Teen nephew",clue:'"Obsessed with Minecraft"',result:'Custom Minecraft pixel art portrait + official companion book',budget:'$35-55'},
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{background:`linear-gradient(160deg,${T.navyDark} 0%,${T.navy} 60%,${T.navyMid} 100%)`,padding:'64px 20px 72px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 20% 50%, rgba(201,168,76,.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,.06) 0%, transparent 50%)'}}/>
        <div style={{maxWidth:680,margin:'0 auto',position:'relative'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(201,168,76,.15)',border:'1px solid rgba(201,168,76,.3)',borderRadius:50,padding:'6px 16px',marginBottom:24}}>
            <span style={{fontSize:12}}>✨</span>
            <span style={{fontSize:12,fontWeight:700,color:T.goldBright,fontFamily:F}}>You help us, and we'll find the perfect gift.</span>
          </div>
          <h1 style={{fontSize:'clamp(28px,6vw,56px)',fontWeight:900,color:'#fff',margin:'0 0 16px',lineHeight:1.1,fontFamily:F}}>
            You know one thing<br/>about them.
            <span style={{color:T.goldBright}}> That's enough.</span>
          </h1>
          <p style={{fontSize:'clamp(15px,2vw,18px)',color:'rgba(255,255,255,.75)',margin:'0 0 36px',lineHeight:1.6,maxWidth:500,marginLeft:'auto',marginRight:'auto',fontFamily:F2}}>
            Tell us who it's for and the one thing you know — "loves his boat," "always cold," "just got into sourdough." We'll find something they'll actually love.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'center'}}>
            <Btn size="lg" variant="gold" onClick={onStart} style={{fontSize:18,padding:'16px 36px'}}>🎁 Find the perfect gift</Btn>
            <span style={{fontSize:12,color:'rgba(255,255,255,.4)',fontFamily:F2}}>Free · No account needed · Results in seconds</span>
          </div>
          <div style={{display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap',marginTop:32}}>
            {[['🎯','Hyper-specific results'],['📚','Book included always'],['💬','Share with co-buyers']].map(([e,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,.6)',fontFamily:F2}}><span>{e}</span>{l}</div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{padding:'60px 20px',background:T.white}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(22px,4vw,32px)',fontWeight:900,color:T.navy,margin:'0 0 8px',fontFamily:F}}>How it works</h2>
          <p style={{fontSize:14,color:T.gray,margin:'0 0 36px',fontFamily:F2}}>Five quick questions. One specific, thoughtful gift recommendation.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20}}>
            {[
              {n:'1',title:'Tell us who',desc:'Who is the gift for and how old they are. Even "not sure" works.'},
              {n:'2',title:'Share what you know',desc:'Tap interest chips or type the one thing you know about them. "Loves his boat" is plenty.'},
              {n:'3',title:'Set your budget',desc:'We find the best gift in your price range — not close to it, within it.'},
              {n:'4',title:'Get a real answer',desc:'A specific, non-generic recommendation plus a book pick and alternatives.'},
            ].map(s=>(
              <div key={s.n} style={{background:T.cream,borderRadius:T.r,padding:'24px 20px',textAlign:'left',border:`1px solid ${T.border}`}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:T.navy,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,fontFamily:F,marginBottom:12}}>{s.n}</div>
                <div style={{fontSize:15,fontWeight:800,color:T.navy,marginBottom:6,fontFamily:F}}>{s.title}</div>
                <div style={{fontSize:13,color:T.gray,lineHeight:1.6,fontFamily:F2}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example results */}
      <section style={{padding:'60px 20px',background:T.cream}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:32}}>
            <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:900,color:T.navy,margin:'0 0 8px',fontFamily:F}}>The kind of results we give</h2>
            <p style={{fontSize:14,color:T.gray,margin:0,fontFamily:F2}}>Specific, thoughtful, and actually based on what you told us.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14}}>
            {SAMPLE.map((s,i)=>(
              <Card key={i} style={{padding:20}}>
                <div style={{fontSize:11,fontWeight:800,color:T.navyMid,marginBottom:4,fontFamily:F}}>{s.who.toUpperCase()}</div>
                <div style={{fontSize:13,color:T.gold,fontWeight:700,fontFamily:F2,marginBottom:8,fontStyle:'italic'}}>{s.clue}</div>
                <div style={{fontSize:14,fontWeight:800,color:T.navy,marginBottom:4,fontFamily:F,lineHeight:1.3}}>{s.result}</div>
                <div style={{fontSize:12,color:T.grayLight,fontFamily:F2}}>{s.budget}</div>
              </Card>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:24}}>
            <Btn size="lg" variant="gold" onClick={onStart}>Find a gift like this →</Btn>
          </div>
        </div>
      </section>

      {/* Browse by occasion */}
      <section style={{padding:'60px 20px',background:T.white}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(20px,4vw,28px)',fontWeight:900,color:T.navy,margin:'0 0 6px',fontFamily:F}}>Browse by occasion</h2>
          <p style={{fontSize:13,color:T.gray,margin:'0 0 20px',fontFamily:F2}}>Or let the finder build something completely personal.</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            {[
              ['🎂','Birthday gifts','/birthday-gift-ideas'],
              ['🎄','Christmas gifts','/christmas-gift-ideas'],
              ['💝','Anniversary','/anniversary-gift-ideas'],
              ['🎅','Secret Santa','/secret-santa-gift-ideas'],
              ['🏠','Housewarming','/housewarming-gift-ideas'],
              ['🎓','Graduation','/graduation-gift-ideas'],
              ['🌸','Mother\'s Day','/mothers-day-gift-ideas'],
              ['👨','Father\'s Day','/fathers-day-gift-ideas'],
              ['🍎','Teacher gifts','/gift-ideas-for-teachers'],
              ['🐘','White Elephant','/white-elephant-gift-ideas'],
            ].map(([e,l,h])=>(
              <a key={l} href={h} style={{display:'flex',alignItems:'center',gap:6,background:T.navyLight,border:`1.5px solid ${T.border}`,borderRadius:50,padding:'7px 14px',textDecoration:'none',fontSize:13,fontWeight:700,color:T.navy,fontFamily:F,whiteSpace:'nowrap'}}>{e} {l}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by recipient */}
      <section style={{padding:'60px 20px',background:T.cream}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(20px,4vw,28px)',fontWeight:900,color:T.navy,margin:'0 0 6px',fontFamily:F}}>Browse by recipient</h2>
          <p style={{fontSize:13,color:T.gray,margin:'0 0 20px',fontFamily:F2}}>Curated starting points for common gift situations.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12}}>
            {[
              ['💑','Gifts for him','/gift-ideas-for-him'],
              ['👩','Gifts for her','/gift-ideas-for-her'],
              ['💕','For boyfriend','/gift-ideas-for-boyfriend'],
              ['💝','For girlfriend','/gift-ideas-for-girlfriend'],
              ['💍','For husband','/gift-ideas-for-husband'],
              ['👸','For wife','/gift-ideas-for-wife'],
              ['👨','Gifts for dad','/gift-ideas-for-dad'],
              ['👩‍👧','Gifts for mom','/gift-ideas-for-mom'],
              ['🎮','Gifts for teens','/gift-ideas-for-teens'],
              ['🧒','Gifts for kids','/gift-ideas-for-kids'],
              ['💼','For colleagues','/gift-ideas-for-colleagues'],
              ['👴','For grandparents','/gift-ideas-for-grandparents'],
              ['📚','For book lovers','/gift-ideas-for-book-lovers'],
              ['🍳','For foodies','/gift-ideas-for-foodies'],
            ].map(([e,l,h])=>(
              <a key={l} href={h} style={{background:T.white,border:`1.5px solid ${T.border}`,borderRadius:T.r,padding:'16px',textDecoration:'none',display:'block',transition:'all .15s'}}>
                <div style={{fontSize:24,marginBottom:8}}>{e}</div>
                <div style={{fontSize:13,fontWeight:800,color:T.navy,fontFamily:F,lineHeight:1.3}}>{l}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'60px 20px',background:`linear-gradient(135deg,${T.navyDark},${T.navy})`,textAlign:'center'}}>
        <div style={{maxWidth:560,margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(22px,4vw,34px)',fontWeight:900,color:'#fff',margin:'0 0 12px',fontFamily:F}}>Stop guessing. Start gifting.</h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,.7)',margin:'0 0 28px',lineHeight:1.6,fontFamily:F2}}>Tell us the one thing you know about them and we'll take it from there.</p>
          <Btn size="lg" variant="gold" onClick={onStart} style={{fontSize:17,padding:'15px 32px'}}>🎁 Find the perfect gift</Btn>
        </div>
      </section>

      <SiteFooter/>
    </div>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState('home') // home | quiz | loading | result | error
  const [gift, setGift] = useState(null)
  const [answers, setAnswers] = useState(null)
  const [error, setError] = useState('')
  const [loadStage, setLoadStage] = useState(0)
  const timerRef = React.useRef(null)

  React.useEffect(() => {
    if (window.location.hash.startsWith('#result?')) {
      const params = new URLSearchParams(window.location.hash.slice(8))
      const a = {
        relationship: params.get('rel') || '',
        age: params.get('age') || '',
        interests: (params.get('interests') || '').split(',').filter(Boolean),
        clue: params.get('clue') || '',
        budget: params.get('budget') || '',
        occasion: params.get('occasion') || '',
      }
      if (a.relationship && a.budget) {
        setTimeout(() => generate(a), 100)
      }
    }
  }, [])

  const startLoadAnim = () => {
    setLoadStage(0); let i = 0
    timerRef.current = setInterval(() => { i++; if(i < LOAD_STAGES.length) setLoadStage(i); else clearInterval(timerRef.current) }, 1800)
  }

  const buildPrompt = (a) => {
    const rel = RELATIONSHIPS.find(r=>r.v===a.relationship)?.l || a.relationship
    const age = AGE_RANGES.find(r=>r.v===a.age)?.l || a.age
    const budget = BUDGETS.find(b=>b.v===a.budget)?.l || a.budget
    const occasion = OCCASIONS.find(o=>o.v===a.occasion)?.l || a.occasion
    const interests = a.interests.map(i => INTERESTS.find(x=>x.v===i)?.l).filter(Boolean).join(', ')
    let msg = `Gift for: ${rel}, age ${age}\nBudget: ${budget}\nOccasion: ${occasion}`
    if (interests) msg += `\nInterests: ${interests}`
    if (a.clue?.trim()) msg += `\nSpecific clue: "${a.clue.trim()}"`
    return msg
  }

  const generate = async (a) => {
    setAnswers(a)
    setStage('loading')
    setError('')
    startLoadAnim()
    try {
      const res = await fetch('/api/gift', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1800,
          system: GIFT_PROMPT,
          messages:[{role:'user',content:buildPrompt(a)}]
        })
      })
      const data = await res.json()
      const text = data.content?.find(b=>b.type==='text')?.text || ''
      const clean = text.replace(/```json|```/g,'').trim()
      const parsed = JSON.parse(clean)
      clearInterval(timerRef.current)
      setGift(parsed)
      setStage('result')
      // Push shareable URL
      const p = new URLSearchParams({
        rel: a.relationship, age: a.age, budget: a.budget, occasion: a.occasion,
        ...(a.interests?.length ? {interests: a.interests.join(',')} : {}),
        ...(a.clue?.trim() ? {clue: a.clue.trim()} : {})
      })
      if (history.pushState) history.pushState(null, '', `#result?${p.toString()}`)
    } catch(e) {
      clearInterval(timerRef.current)
      setError(e.message || 'Something went wrong. Please try again.')
      setStage('error')
    }
  }

  const reset = () => { setStage('home'); setGift(null); setAnswers(null); setError(''); if(history.pushState) history.pushState(null,'',location.pathname) }

  return (
    <>
      <SiteHeader onHome={reset}/>
      {stage === 'home' && <HomePage onStart={()=>setStage('quiz')}/>}
      {stage === 'quiz' && <QuizView onComplete={generate}/>}
      {stage === 'loading' && <LoadingView stage={loadStage} clue={answers?.clue}/>}
      {stage === 'result' && gift && <ResultView gift={gift} answers={answers} onNew={reset}/>}
      {stage === 'error' && <ErrorView msg={error} onRetry={()=>generate(answers)} onBack={()=>setStage('quiz')}/>}
    </>
  )
}
