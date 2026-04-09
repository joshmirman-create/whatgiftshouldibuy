import os

TEMPLATE = open('/home/claude/gift-site/public/_template.html').read()

def make_page(slug, title, meta, schema_type, content):
    schema = f'{{"@context":"https://schema.org","@type":"{schema_type}","name":"{title}","description":"{meta}","url":"https://www.whatgiftshouldibuy.com/{slug}"}}'
    html = TEMPLATE.replace('PAGETITLE', title)
    html = html.replace('METADESC', meta)
    html = html.replace('SLUG', slug)
    html = html.replace('SCHEMA', schema)
    html = html.replace('CONTENT', content)
    path = f'/home/claude/gift-site/public/{slug}.html'
    with open(path, 'w') as f:
        f.write(html)
    print(f"✓ {slug}.html")

def hero(eyebrow, h1, desc, cta_label="/"):
    return f'''
<section class="hero"><div class="hero-inner">
  <div class="eyebrow">🎁 {eyebrow}</div>
  <h1>{h1}</h1>
  <p>{desc}</p>
  <div class="cta-group"><a href="/" class="cta-btn">🎁 Find the perfect gift</a></div>
  <div class="trust-row">
    <span class="trust-item">🎯 Hyper-specific results</span>
    <span class="trust-item">📚 Book included always</span>
    <span class="trust-item">💬 Easy to share</span>
  </div>
</div></section>'''

def faq(*pairs):
    items = ''.join(f'<div class="faq-item"><p class="faq-q">{q}</p><p class="faq-a">{a}</p></div>' for q,a in pairs)
    return f'<section class="bg-cream"><div class="section-inner"><h2>Frequently asked questions</h2><div style="margin-top:16px">{items}</div></div></section>'

def related(*links):
    items = ''.join(f'<a href="{h}" class="related-link">{e} {l}</a>' for e,l,h in links)
    return f'<section class="bg-white"><div class="section-inner"><h2>More gift ideas</h2><div class="related-links">{items}</div></div></section>'

# ── OCCASION PAGES ────────────────────────────────────────────────────────────

pages = [

('birthday-gift-ideas', 'Birthday Gift Ideas | What Gift Should I Buy?',
 'Find the perfect birthday gift. Tell us who it\'s for and one thing you know about them — we do the rest.',
 hero('Birthday gift ideas', 'Birthday Gifts They\'ll <em>Actually Love</em>',
      'Stop stressing about birthday gifts. Tell us who it\'s for, how old they are, and the one thing you know about them. We find something specific, thoughtful, and in your budget.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Birthday gifts for every person</h2>
  <p class="section-sub">The birthday gift finder works for anyone. The more you tell us, the more specific the result.</p>
  <div class="chip-grid">
    <a href="/gift-ideas-for-him" class="chip">👨 For him</a>
    <a href="/gift-ideas-for-her" class="chip">👩 For her</a>
    <a href="/gift-ideas-for-dad" class="chip">👨‍👧 For dad</a>
    <a href="/gift-ideas-for-mom" class="chip">👩‍👧 For mom</a>
    <a href="/gift-ideas-for-teens" class="chip">🎮 For teens</a>
    <a href="/gift-ideas-for-kids" class="chip">🧒 For kids</a>
    <a href="/gift-ideas-for-colleagues" class="chip">💼 For a colleague</a>
    <a href="/gift-ideas-for-grandparents" class="chip">👴 For grandparents</a>
  </div>
  <div class="card-grid">
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The boat guy</div><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">Marine Line Organizer + Dock Book</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">From "loves his boat" to a gift that proves you actually listened. Every boat person needs this and nobody thinks to buy it.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The tea lover</div><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">Heated Throw + Artisan Loose Leaf Set</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">"Always cold, loves tea" — two words that lead to one of the most appreciated gifts you can give.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The sourdough starter</div><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">Danish Dough Whisk + Bread Scoring Book</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">They just got into sourdough. They need proper tools and they do not know what they\'re missing yet.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their birthday gift →</a></div>
</div></section>''' +
 faq(('How do I find a birthday gift for someone I barely know?','Tell us the one thing you know about them — what they do, what they love, what they talk about constantly. Even "he really likes his truck" is enough for us to build a thoughtful, specific recommendation.'),
     ('What if I don\'t know their exact age?','Pick an approximate age range. The gift finder works fine with "30s" or "60+" — you don\'t need their birth certificate.'),
     ('Can I find last-minute birthday gifts?','Yes. All our recommendations link directly to Amazon for fast delivery. Filter by budget and we\'ll find something that arrives in time.')) +
 related(('🎅','Secret Santa','/secret-santa-gift-ideas'),('💑','Anniversary','/anniversary-gift-ideas'),('🏠','Housewarming','/housewarming-gift-ideas'),('🎓','Graduation','/graduation-gift-ideas'),('👨','For him','/gift-ideas-for-him'),('👩','For her','/gift-ideas-for-her'))),

('secret-santa-gift-ideas', 'Secret Santa Gift Ideas | What Gift Should I Buy?',
 'Find the perfect Secret Santa gift. Works when you barely know the person. Tell us one thing about them.',
 hero('Secret Santa sorted', 'Secret Santa Gifts for People <em>You Barely Know</em>',
      'You drew a name. You know almost nothing about them. This is exactly what the gift finder was built for. Tell us one thing — anything — and we\'ll turn it into a gift they\'ll actually like.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Secret Santa ideas by budget</h2>
  <p class="section-sub">Most Secret Santa exchanges have a budget. Pick yours and we'll find something that doesn't look cheap.</p>
  <div class="chip-grid">
    <a href="/" class="chip">💵 Under $25</a>
    <a href="/" class="chip">💵 $25-50</a>
    <a href="/" class="chip">💵 $50-75</a>
    <a href="/" class="chip">💵 $75-100</a>
  </div>
  <div class="card-grid">
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">The office coffee person</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Always at the coffee machine. Talks about roasts. A specialty coffee subscription or a single-origin sampler pack with a mug is a safe, elevated choice.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">The fitness person</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Talks about their workouts. Has strong opinions about protein. A foam roller set or a good training journal works for almost everyone in this category.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">The plant parent</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Has plants on their desk. Talks about them by name. A succulent propagation kit or a good houseplant care book hits exactly right.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find my Secret Santa gift →</a></div>
</div></section>''' +
 faq(('What if I literally know nothing about my Secret Santa person?','Pick their approximate age and gender, tap a few interest chips that seem plausible, and let the finder work. It\'s designed for exactly this situation.'),
     ('How do I find something that doesn\'t feel generic?','The free text field is your secret weapon. Type anything you\'ve observed about them — "always has a coffee," "mentions her dog constantly," "wears a lot of flannel." We turn observations into gifts.'),
     ('What\'s a good safe Secret Santa gift for a colleague?','Something consumable and enjoyable — specialty food, a candle, a good book, a nice drink kit. Our finder leans away from generic and toward specific every time.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('🐘','White Elephant','/white-elephant-gift-ideas'),('💼','For colleagues','/gift-ideas-for-colleagues'),('🏠','Housewarming','/housewarming-gift-ideas'))),

('white-elephant-gift-ideas', 'White Elephant Gift Ideas | What Gift Should I Buy?',
 'Find a White Elephant gift that actually gets picked. Funny, useful, or wildly specific — we have all of it.',
 hero('White Elephant wins', 'White Elephant Gifts That <em>Actually Get Stolen</em>',
      'The goal: bring something everyone wants. The finder works for any budget — from the $20 exchange that runs forever to the $75 one that gets competitive.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What makes a great White Elephant gift</h2>
  <p class="section-sub">The best White Elephant gifts are either immediately useful to everyone, genuinely funny, or so specific and interesting that people fight over them.</p>
  <div class="card-grid">
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">🏆 The steal magnet</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Something everyone secretly wants but wouldn\'t buy themselves. A nice whiskey decanter set, a quality cheese board, a heated blanket. Premium but universal.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">😂 The crowd pleaser</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Genuinely funny without being useless. A hilariously specific book, a novelty kitchen item that actually works, a game that gets played that night.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">✨ The wild card</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Something nobody expected and everyone suddenly wants. The gift finder is good at finding these — unusual but immediately understandable.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find my White Elephant gift →</a></div>
</div></section>''' +
 faq(('What budget should I bring for White Elephant?','Match whatever limit the host set. If it\'s a $20-25 limit, pick Under $25. We find options that look much better than the price suggests.'),
     ('Should a White Elephant gift be funny or useful?','Both if possible. A gift that makes people laugh and then realize they actually want it is the ideal White Elephant. We aim for that.')) +
 related(('🎅','Secret Santa','/secret-santa-gift-ideas'),('🎂','Birthdays','/birthday-gift-ideas'),('💼','For colleagues','/gift-ideas-for-colleagues'))),

('anniversary-gift-ideas', 'Anniversary Gift Ideas | What Gift Should I Buy?',
 'Find the perfect anniversary gift. Tell us about them and how long you\'ve been together. We do the rest.',
 hero('Anniversary gifts', 'Anniversary Gifts That <em>Feel Personal</em>',
      'An anniversary gift should say "I know you." Tell us what they love, what they\'re into right now, and your budget. We find something that actually reflects them — not a generic jewelry ad.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Anniversary gifts by year</h2>
  <p class="section-sub">The traditional lists exist, but the best anniversary gift is one that reflects who they actually are right now.</p>
  <div class="card-grid">
    <div class="card"><div class="pill gold" style="margin-bottom:10px">1st anniversary</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Paper is traditional. A custom illustrated portrait of where you met, a first edition of a book they love, or a beautiful journal for the next year together.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">5th anniversary</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Wood is traditional. A handcrafted wooden keepsake box, a personalized cutting board, or a beautiful piece of wooden art for your home.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">10th anniversary</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Aluminum or tin. A personalized star map of your wedding night, a custom map print of a place that matters, or a stunning coffee table book about somewhere you\'ve been together.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find the perfect anniversary gift →</a></div>
</div></section>''' +
 faq(('How do I find an anniversary gift that isn\'t generic?','Tell us what they\'re actually into right now — not what a generic "gifts for him" article suggests. "He just got really into homebrewing" beats "likes sports." The more specific, the better the result.'),
     ('What if we have different interests?','Pick the one who\'s receiving the gift and focus on what lights them up. The gift should be about them, not about the relationship.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('👨','For him','/gift-ideas-for-him'),('👩','For her','/gift-ideas-for-her'),('🏠','Housewarming','/housewarming-gift-ideas'))),

('housewarming-gift-ideas', 'Housewarming Gift Ideas | What Gift Should I Buy?',
 'Find the perfect housewarming gift. Something they\'ll actually use in their new home.',
 hero('Housewarming gifts', 'Housewarming Gifts They\'ll <em>Actually Use</em>',
      'A housewarming gift should feel like it belongs in their new space. Tell us what they\'re like and we\'ll find something that fits their home, not a random candle from a gift shop.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What makes a great housewarming gift</h2>
  <p class="section-sub">The best housewarming gifts are either beautiful, functional, or both. Avoid anything they might already own or have to return.</p>
  <div class="card-grid">
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">🍳 The kitchen person</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Always cooking, always hosting. A quality cast iron skillet, a beautiful cookbook, or a specialty ingredient set they wouldn\'t buy themselves.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">🌱 The plant person</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Their new home needs more green. A beautiful planter with a hard-to-kill plant, or a subscription that sends them a new plant each month.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">📚 The reader</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">A beautiful coffee table book about something they love, a Bookshop.org gift card so they can fill their new shelves, or a cozy reading lamp.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their housewarming gift →</a></div>
</div></section>''' +
 faq(('What should I spend on a housewarming gift?','$30-75 is the typical sweet spot for friends and family. For a close friend or family member buying a first home, $75-150 feels appropriate. For a colleague, $25-40.'),
     ('Is a plant a good housewarming gift?','Yes, but only if you know they like plants. The gift finder asks about their interests so we can tell you whether a plant fits this specific person.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('🎓','Graduation','/graduation-gift-ideas'),('👩','For her','/gift-ideas-for-her'),('👨','For him','/gift-ideas-for-him'))),

('graduation-gift-ideas', 'Graduation Gift Ideas | What Gift Should I Buy?',
 'Find the perfect graduation gift. High school, college, or grad school — we find something they\'ll actually use.',
 hero('Graduation gifts', 'Graduation Gifts for the <em>Next Chapter</em>',
      'Graduation is about what comes next. The best gift acknowledges where they\'re headed, not where they\'ve been. Tell us what they love and where they\'re going — we\'ll find something that fits.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Graduation gifts by stage</h2>
  <p class="section-sub">High school, college, and grad school graduates have completely different needs. The gift finder accounts for all of it.</p>
  <div class="card-grid">
    <div class="card"><div class="pill gold" style="margin-bottom:10px">High school grad</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Heading to college or starting work. Practical things they\'ll actually need — a good bag, a quality coffee maker for the dorm, or a book that actually prepares them for adult life.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">College grad</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Starting a career or continuing school. Something that elevates their professional life — a quality leather notebook, noise-canceling headphones, or a subscription to help them grow in their field.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">Grad school / professional</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">They worked extremely hard. A gift that treats them to something they wouldn\'t buy themselves — a beautiful piece for their new office, a celebratory experience, or something that marks this milestone.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their graduation gift →</a></div>
</div></section>''' +
 faq(('What\'s a good graduation gift that isn\'t cash?','Cash feels impersonal even though it\'s practical. A specific, thoughtful gift that acknowledges what they love is more memorable. The finder turns "she\'s going to be a nurse who loves true crime podcasts" into something real.'),
     ('How much should I spend on a graduation gift?','For a child or close family member: $50-200. For a friend: $30-75. For a colleague\'s child: $20-40.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('🏠','Housewarming','/housewarming-gift-ideas'),('🎮','For teens','/gift-ideas-for-teens'),('💼','For colleagues','/gift-ideas-for-colleagues'))),

('christmas-gift-ideas', 'Christmas Gift Ideas | What Gift Should I Buy?',
 'Find the perfect Christmas gift. Works for everyone on your list — even the ones you barely know what to get.',
 hero('Christmas gifts', 'Christmas Gifts for <em>Everyone on Your List</em>',
      'The gift finder works for every person on your Christmas list. Tell us about them one at a time and we\'ll find something specific and thoughtful for each one.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Christmas gifts for everyone</h2>
  <p class="section-sub">Run each person on your list through the finder. The more you tell us, the more specific the result.</p>
  <div class="chip-grid">
    <a href="/gift-ideas-for-dad" class="chip">👨‍👧 For dad</a>
    <a href="/gift-ideas-for-mom" class="chip">👩‍👧 For mom</a>
    <a href="/gift-ideas-for-him" class="chip">👨 For him</a>
    <a href="/gift-ideas-for-her" class="chip">👩 For her</a>
    <a href="/gift-ideas-for-teens" class="chip">🎮 For teens</a>
    <a href="/gift-ideas-for-kids" class="chip">🧒 For kids</a>
    <a href="/gift-ideas-for-grandparents" class="chip">👴 For grandparents</a>
    <a href="/gift-ideas-for-book-lovers" class="chip">📚 For book lovers</a>
  </div>
  <div style="background:#FFF8E7;border:1.5px solid #C9A84C;border-radius:16px;padding:24px;margin-top:8px;text-align:center">
    <p style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:16px;color:#1B2B4B;margin:0 0 10px">Not sure where to start?</p>
    <p style="font-size:13px;color:#4A5568;margin:0 0 16px;line-height:1.6">Tell us who it\'s for and the one thing you know about them. Even "she collects teapots" is enough to find something great.</p>
    <a href="/" class="cta-btn">🎁 Start the gift finder</a>
  </div>
</div></section>''' +
 faq(('When should I start Christmas shopping?','Ideally 3-4 weeks out for standard shipping. The finder takes seconds — the hard part is having the idea. Start that now even if you order later.'),
     ('What if I have no idea what to get someone?','Type the one thing you know — anything. Their job, a hobby you\'ve heard about, a place they love, something they mentioned once. We work with very little.')) +
 related(('🎅','Secret Santa','/secret-santa-gift-ideas'),('🐘','White Elephant','/white-elephant-gift-ideas'),('🎂','Birthdays','/birthday-gift-ideas'),('🎓','Graduation','/graduation-gift-ideas'))),

('gift-ideas-for-teachers', 'Gift Ideas for Teachers | What Gift Should I Buy?',
 'Find a teacher gift that isn\'t a mug or an apple. Something they\'ll actually use and remember.',
 hero('Teacher gift ideas', 'Teacher Gifts That <em>Aren\'t a Mug</em>',
      'Teachers get a lot of mugs. Find something that shows you actually thought about them — their subject, their style, what they love outside the classroom. Tell us anything and we\'ll take it from there.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What teachers actually want</h2>
  <p class="section-sub">The best teacher gifts are either genuinely useful, beautifully personal, or something they\'d never buy for themselves.</p>
  <div class="card-grid">
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">📚 The English teacher</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">A beautiful first edition, a subscription to a literary magazine, or a stunning annotated version of a book they teach. Reading-related and elevated.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">🔬 The science teacher</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">A beautiful science coffee table book, a quality microscope for their home curiosity, or something that connects their subject to their personal life.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">🎨 The art teacher</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Quality art supplies they wouldn\'t splurge on for themselves, a beautiful art history book, or a print from an artist they love.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find the perfect teacher gift →</a></div>
</div></section>''' +
 faq(('What\'s an appropriate budget for a teacher gift?','$15-40 is typical. For end-of-year or a teacher who made a real difference, $40-75 is completely appropriate.'),
     ('Can I get a gift for a teacher I barely know?','Yes. Tell us their subject and anything you\'ve heard them mention. "My son\'s math teacher who loves running" is enough to find something specific.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('🎅','Secret Santa','/secret-santa-gift-ideas'),('📚','For book lovers','/gift-ideas-for-book-lovers'))),

]

# ── RECIPIENT PAGES ───────────────────────────────────────────────────────────

recipient_pages = [

('gift-ideas-for-him', 'Gift Ideas for Him | What Gift Should I Buy?',
 'Find a gift for him that actually fits who he is. Tell us one thing and we find the rest.',
 hero('Gifts for him', 'Gifts for Him That <em>Actually Fit</em>',
      'Not "gifts for men" — gifts for this specific man. Tell us what he\'s into, what he talks about, what he just got into. One clue is enough to find something he\'ll genuinely love.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What kind of guy is he?</h2>
  <p class="section-sub">The gift finder works best when you pick a direction. Tap what fits and let us handle the rest.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🌊 Outdoors &amp; adventure</a>
    <a href="/" class="chip">🍳 Food &amp; cooking</a>
    <a href="/" class="chip">🎮 Gaming &amp; tech</a>
    <a href="/" class="chip">🍷 Beer, wine &amp; spirits</a>
    <a href="/" class="chip">💪 Fitness &amp; wellness</a>
    <a href="/" class="chip">⚽ Sports fan</a>
    <a href="/" class="chip">🎵 Music</a>
    <a href="/" class="chip">📚 Reading</a>
  </div>
  <div class="card-grid">
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The boat/fishing guy</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Something that connects to what he actually does on the water. Not a generic "fishing gift" — something specific to his rig, his style, what he actually needs.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The home chef</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">He watches cooking videos, has opinions about knives, and the kitchen is his domain. Quality tools or an ingredient he hasn\'t tried yet.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The new hobbyist</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Just got into sourdough, homebrewing, woodworking, or something else entirely. The perfect gift is something that helps him go deeper into his new thing.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find his gift →</a></div>
</div></section>''' +
 faq(('What\'s a good gift for a man who has everything?','Something consumable and elevated — a specialty food subscription, a quality bottle of something he loves, an experience. Or something hyper-specific to a hobby he\'s recently started.'),
     ('What are the most thoughtful gifts for him?','Gifts that show you listened. If he mentioned something once, find a gift connected to that thing. The finder is built specifically for this.')) +
 related(('👨‍👧','For dad','/gift-ideas-for-dad'),('👴','For grandpa','/gift-ideas-for-grandparents'),('💼','For a colleague','/gift-ideas-for-colleagues'),('🎂','Birthdays','/birthday-gift-ideas'))),

('gift-ideas-for-her', 'Gift Ideas for Her | What Gift Should I Buy?',
 'Find a gift for her that actually means something. Tell us what she loves and we\'ll find the perfect thing.',
 hero('Gifts for her', 'Gifts for Her That Show <em>You Were Paying Attention</em>',
      'Not a candle. Not a generic spa set. A gift that says you actually know her — what she loves, what she\'s into right now, what she\'d never buy for herself. Tell us one thing. We take it from there.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What is she into?</h2>
  <p class="section-sub">The more specific, the better the result. Tap whatever feels right and add anything in your own words.</p>
  <div class="chip-grid">
    <a href="/" class="chip">📚 Reading &amp; books</a>
    <a href="/" class="chip">🍳 Food &amp; cooking</a>
    <a href="/" class="chip">🌱 Home &amp; garden</a>
    <a href="/" class="chip">🎨 Creative &amp; crafty</a>
    <a href="/" class="chip">🧘 Wellness &amp; self-care</a>
    <a href="/" class="chip">✈️ Travel</a>
    <a href="/" class="chip">🎵 Music</a>
    <a href="/" class="chip">🐾 Pet obsessed</a>
  </div>
  <div class="card-grid">
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The book lover</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">She has opinions about bookmarks and knows what she means by "cozy read." A curated book subscription, a beautiful annotated edition, or a first edition of a book she loves.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">Always cold, loves tea</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Two words that lead to a whole gift direction. A cashmere throw, an artisan loose-leaf set, a beautiful teapot, or all three in a curated bundle.</p></div>
    <div class="card"><div class="pill gold" style="margin-bottom:10px">The new plant parent</div><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">Just got into plants, or has been into them for years. Either way there\'s something she doesn\'t have yet that she\'d love to discover.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find her gift →</a></div>
</div></section>''' +
 faq(('What\'s a meaningful gift for her that isn\'t jewelry?','Something that reflects who she actually is — a book subscription matching her taste, a quality tool for her hobby, or something connected to a trip she\'s taken or wants to take.'),
     ('How do I find a gift for a woman I don\'t know well?','Tell us her age range and any one thing you\'ve observed. "She mentions her dog a lot" or "always has coffee in her hand" is enough to work with.')) +
 related(('👩‍👧','For mom','/gift-ideas-for-mom'),('📚','For book lovers','/gift-ideas-for-book-lovers'),('🎂','Birthdays','/birthday-gift-ideas'),('💑','Anniversary','/anniversary-gift-ideas'))),

('gift-ideas-for-dad', 'Gift Ideas for Dad | What Gift Should I Buy?',
 'Find a gift for dad he\'ll actually use. Not a tie, not a mug. Something that fits who he really is.',
 hero('Gifts for dad', 'Dad Gifts He\'ll <em>Actually Use</em>',
      'Dad says he doesn\'t need anything. He\'s wrong. Find a gift connected to what he actually loves — the boat, the grill, the garden, the woodshop, the armchair detective novels. Tell us one thing.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What is dad into?</h2>
  <p class="section-sub">Every dad is different. Tap what fits and add anything in your own words for the most specific result.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🌊 Fishing &amp; boating</a>
    <a href="/" class="chip">🍖 Grilling &amp; BBQ</a>
    <a href="/" class="chip">🌱 Gardening</a>
    <a href="/" class="chip">🛠️ DIY &amp; tools</a>
    <a href="/" class="chip">📺 Sports fan</a>
    <a href="/" class="chip">📚 Reading</a>
    <a href="/" class="chip">🍷 Beer or whiskey</a>
    <a href="/" class="chip">☕ Coffee obsessed</a>
  </div>
  <div style="text-align:center;margin-top:20px"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find dad\'s gift →</a></div>
</div></section>''' +
 faq(('What do you get a dad who says he doesn\'t want anything?','Something consumable and excellent — a great bottle of his favorite spirit, a specialty coffee subscription, a high-quality grilling accessory. Or something connected to a hobby he\'s mentioned wanting to try.'),
     ('What\'s a good gift for a dad I barely know, like a friend\'s dad?','The one-thing approach works perfectly here. Even "he\'s really into his vegetable garden" or "he watches a lot of golf" is enough for a specific, thoughtful result.')) +
 related(('👨','For him','/gift-ideas-for-him'),('👴','For grandparents','/gift-ideas-for-grandparents'),('🎂','Birthdays','/birthday-gift-ideas'),('🎅','Secret Santa','/secret-santa-gift-ideas'))),

('gift-ideas-for-mom', 'Gift Ideas for Mom | What Gift Should I Buy?',
 'Find a gift for mom she\'ll actually love. Tell us what she\'s into and we\'ll find something meaningful.',
 hero('Gifts for mom', 'Gifts for Mom That <em>Aren\'t Flowers</em>',
      'Mom deserves something she actually wants. Tell us what she loves — her garden, her book club, her sourdough project, her grandkids. One detail leads to a gift that\'s actually about her.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What does mom love?</h2>
  <p class="section-sub">The gift finder works for any mom — your own, a friend\'s, your partner\'s. Tap what fits.</p>
  <div class="chip-grid">
    <a href="/" class="chip">📚 Reading &amp; book clubs</a>
    <a href="/" class="chip">🌱 Gardening</a>
    <a href="/" class="chip">🍳 Cooking &amp; baking</a>
    <a href="/" class="chip">🧘 Wellness &amp; self-care</a>
    <a href="/" class="chip">🎨 Arts &amp; crafts</a>
    <a href="/" class="chip">☕ Coffee or tea</a>
    <a href="/" class="chip">✈️ Travel</a>
    <a href="/" class="chip">🐾 Pet obsessed</a>
  </div>
  <div style="text-align:center;margin-top:20px"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find mom\'s gift →</a></div>
</div></section>''' +
 faq(('What\'s a meaningful gift for mom that isn\'t flowers?','Something that acknowledges what she actually loves. A beautiful book connected to her interests, a quality tool for her hobby, or something that gives her a moment to herself.'),
     ('What do I get for a mom who has everything?','Something consumable and elevated, or something hyper-personal. A specialty food subscription, a beautiful edition of a book she loves, or something connected to a recent obsession.')) +
 related(('👩','For her','/gift-ideas-for-her'),('👴','For grandparents','/gift-ideas-for-grandparents'),('🎂','Birthdays','/birthday-gift-ideas'),('💑','Anniversary','/anniversary-gift-ideas'))),

('gift-ideas-for-teens', 'Gift Ideas for Teens | What Gift Should I Buy?',
 'Find a gift for a teenager they\'ll actually like. Tech, gaming, fashion, music, or whatever they\'re into right now.',
 hero('Gifts for teens', 'Teen Gifts They\'ll <em>Actually Want</em>',
      'Teens are specific. Generic doesn\'t work. Tell us what they\'re actually into right now — the game, the show, the music, the obsession — and we find something that lands.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What are they into?</h2>
  <p class="section-sub">Teen interests change fast. Tell us what\'s happening right now, not what they were into last year.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🎮 Gaming</a>
    <a href="/" class="chip">🎵 Music</a>
    <a href="/" class="chip">🎨 Art &amp; design</a>
    <a href="/" class="chip">👟 Fashion &amp; streetwear</a>
    <a href="/" class="chip">📚 Reading &amp; manga</a>
    <a href="/" class="chip">⚽ Sports</a>
    <a href="/" class="chip">🍳 Cooking</a>
    <a href="/" class="chip">🎬 Film &amp; TV</a>
  </div>
  <div style="text-align:center;margin-top:20px"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their gift →</a></div>
</div></section>''' +
 faq(('How do I find a gift for a teen I barely know?','Tell us one thing — "obsessed with Minecraft," "really into drawing anime," "always has headphones in." That\'s enough to get a specific, non-embarrassing result.'),
     ('What\'s a good gift for a teen that isn\'t just cash?','Something connected to what they\'re into right now. A book or graphic novel in their favorite series, quality gear for their hobby, or something they\'d love but wouldn\'t buy themselves.')) +
 related(('🎓','Graduation','/graduation-gift-ideas'),('🎂','Birthdays','/birthday-gift-ideas'),('🎮','For him','/gift-ideas-for-him'),('📚','For book lovers','/gift-ideas-for-book-lovers'))),

('gift-ideas-for-kids', 'Gift Ideas for Kids | What Gift Should I Buy?',
 'Find the perfect gift for a kid. Tell us their age, what they love, and we\'ll find something they\'ll actually play with.',
 hero('Gifts for kids', 'Kid Gifts That <em>Actually Get Played With</em>',
      'The best kid gift is one that connects to what they\'re obsessed with right now. Tell us their age and their current thing — we find something specific. Works for grandparents, family friends, and anyone buying for a kid they barely know.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>Gifts by age group</h2>
  <p class="section-sub">What works for a 4 year old is completely different from what works for an 8 year old. The finder accounts for all of it.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🐣 Ages 2-4</a>
    <a href="/" class="chip">🌱 Ages 4-6</a>
    <a href="/" class="chip">⭐ Ages 6-9</a>
    <a href="/" class="chip">🚀 Ages 9-12</a>
    <a href="/" class="chip">🎮 Teens</a>
  </div>
  <div style="background:#FFF8E7;border:1.5px solid #C9A84C;border-radius:16px;padding:20px;margin-top:8px">
    <p style="font-family:\'Montserrat\',sans-serif;font-weight:800;color:#1B2B4B;margin:0 0 8px">Also check out our activity site</p>
    <p style="font-size:13px;color:#4A5568;margin:0 0 12px;line-height:1.5">For grandparents looking for gift AND activity ideas, whatshouldmykiddo.com is our sister site built specifically for kids activities and personalized gift ideas for children.</p>
    <a href="https://whatshouldmykiddo.com" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:#2D6A4F;color:#fff;border-radius:50px;padding:7px 16px;font-size:12px;font-weight:700;font-family:\'Montserrat\',sans-serif;text-decoration:none">Visit whatshouldmykiddo.com →</a>
  </div>
</div></section>''' +
 faq(('What\'s a good gift for a kid I don\'t know well?','Tell us their age and the one thing you know — "he loves dinosaurs," "she\'s into Bluey," "they\'re really into building things." Age plus one interest gives us enough to find something specific.'),
     ('What\'s a good gift for a kid from a grandparent?','Our sister site whatshouldmykiddo.com is built specifically for this — grandparents finding both activities and gifts for grandkids they might not see every day.')) +
 related(('🎂','Birthdays','/birthday-gift-ideas'),('🎓','Graduation','/graduation-gift-ideas'),('🎅','Secret Santa','/secret-santa-gift-ideas'),('🎮','For teens','/gift-ideas-for-teens'))),

('gift-ideas-for-colleagues', 'Gift Ideas for Colleagues | What Gift Should I Buy?',
 'Find a professional, thoughtful gift for a colleague. Works for bosses, team members, and people you barely know.',
 hero('Gifts for colleagues', 'Colleague Gifts That <em>Don\'t Overstep</em>',
      'Professional enough to give, personal enough to mean something. Tell us one thing about them — what they drink, what they do outside work, what they talk about at the office — and we find something that hits right.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What\'s the situation?</h2>
  <p class="section-sub">Colleague gifts have context. The finder accounts for relationship, occasion, and budget.</p>
  <div class="chip-grid">
    <a href="/secret-santa-gift-ideas" class="chip">🎅 Secret Santa</a>
    <a href="/gift-ideas-for-him" class="chip">👨 For a male colleague</a>
    <a href="/gift-ideas-for-her" class="chip">👩 For a female colleague</a>
    <a href="/gift-ideas-for-teachers" class="chip">🍎 For a teacher</a>
    <a href="/birthday-gift-ideas" class="chip">🎂 Birthday</a>
    <a href="/graduation-gift-ideas" class="chip">🎓 Going away / retiring</a>
  </div>
  <div style="text-align:center;margin-top:20px"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find the right colleague gift →</a></div>
</div></section>''' +
 faq(('What\'s an appropriate amount to spend on a colleague gift?','$15-40 for most situations. For a close colleague or significant occasion (retirement, promotion, farewell), $40-75 is appropriate. For a boss, $25-50.'),
     ('What\'s safe to give a colleague you barely know?','Something consumable and universally enjoyable — specialty food, a quality drink, a good book. The finder leans toward thoughtful over generic every time.')) +
 related(('🎅','Secret Santa','/secret-santa-gift-ideas'),('🐘','White Elephant','/white-elephant-gift-ideas'),('🎂','Birthdays','/birthday-gift-ideas'),('🍎','For teachers','/gift-ideas-for-teachers'))),

('gift-ideas-for-grandparents', 'Gift Ideas for Grandparents | What Gift Should I Buy?',
 'Find a meaningful gift for grandma or grandpa. Something they\'ll actually use and love.',
 hero('Gifts for grandparents', 'Gifts for Grandparents That <em>Mean Something</em>',
      'Grandparents are hard to buy for because they say they don\'t need anything. Find something connected to what they actually love — the garden, the grandkids, the history books, the fishing trips.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What are they into?</h2>
  <p class="section-sub">Every grandparent is different. Tell us about this one specifically.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🌱 Gardening</a>
    <a href="/" class="chip">📚 Reading</a>
    <a href="/" class="chip">🌊 Fishing or boating</a>
    <a href="/" class="chip">🍳 Cooking &amp; baking</a>
    <a href="/" class="chip">🧶 Crafts &amp; knitting</a>
    <a href="/" class="chip">🏡 Home &amp; comfort</a>
    <a href="/" class="chip">📷 Family memories</a>
    <a href="/" class="chip">☕ Coffee or tea</a>
  </div>
  <div style="text-align:center;margin-top:20px"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their gift →</a></div>
</div></section>''' +
 faq(('What do you get grandparents who say they don\'t need anything?','Something connected to what they actually love — their hobby, their comfort, their grandkids. Or something consumable and excellent they wouldn\'t buy for themselves.'),
     ('What\'s a good gift from grandkids to grandparents?','Something personal and family-connected — a photo book, a custom family portrait, a book about a place they love, or something that connects to a shared memory.')) +
 related(('👨','For him','/gift-ideas-for-him'),('👩','For her','/gift-ideas-for-her'),('👨‍👧','For dad','/gift-ideas-for-dad'),('👩‍👧','For mom','/gift-ideas-for-mom'))),

('gift-ideas-for-book-lovers', 'Gift Ideas for Book Lovers | What Gift Should I Buy?',
 'Find the perfect gift for a book lover. Beyond the obvious — find something they don\'t already have.',
 hero('Gifts for book lovers', 'Gifts for the Reader Who <em>Has Every Book</em>',
      'They\'ve read everything. Their shelves are full. But there\'s always something they don\'t have yet — tell us what they read and we\'ll find it.'),
 '''<section class="bg-white"><div class="section-inner">
  <h2>What do they read?</h2>
  <p class="section-sub">Genre matters. A thriller reader and a literary fiction reader want completely different things.</p>
  <div class="chip-grid">
    <a href="/" class="chip">🔪 Thrillers &amp; crime</a>
    <a href="/" class="chip">✨ Fantasy &amp; sci-fi</a>
    <a href="/" class="chip">💕 Romance</a>
    <a href="/" class="chip">📖 Literary fiction</a>
    <a href="/" class="chip">🌍 Non-fiction</a>
    <a href="/" class="chip">🎨 Graphic novels</a>
    <a href="/" class="chip">📜 History &amp; biography</a>
    <a href="/" class="chip">🧠 Self-improvement</a>
  </div>
  <div class="card-grid">
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">Beyond the book</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">A beautiful first edition, a signed copy, a limited annotated edition, a book subscription matched to their taste, or a Bookshop.org gift card so they choose.</p></div>
    <div class="card"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;color:#1B2B4B;margin:0 0 6px">The reading experience</h3><p style="font-size:13px;color:#4A5568;margin:0;line-height:1.5">A beautiful reading lamp, a quality Kindle, a personalized library stamp, or a handmade bookmark. Things that make reading better.</p></div>
  </div>
  <div style="text-align:center"><a href="/" class="cta-btn" style="font-size:15px;padding:12px 28px">🎁 Find their book lover gift →</a></div>
</div></section>''' +
 faq(('What if they already have the book I was going to get?','Tell us their favorite genre and author and let the finder suggest something they probably haven\'t read yet. We always include a book recommendation with every gift.'),
     ('Is a Bookshop.org gift card a cop-out?','It\'s thoughtful if you pair it with a personal note about why you thought of them. The finder can help you find a specific book to recommend alongside it.')) +
 related(('📚','For her','/gift-ideas-for-her'),('🎂','Birthdays','/birthday-gift-ideas'),('🎅','Secret Santa','/secret-santa-gift-ideas'),('💑','Anniversary','/anniversary-gift-ideas'))),

]

all_pages = pages + recipient_pages
for slug, title, meta, content_parts, *rest in all_pages:
    if rest:
        content = content_parts + ''.join(rest)
    else:
        content = content_parts
    make_page(slug, title, meta, 'WebPage', content)

print(f"\n✅ Built {len(all_pages)} pages")
