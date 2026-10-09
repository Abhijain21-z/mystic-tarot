(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const cards = [
    ['The Star','Renewal','A softer horizon is already forming. Let hope be practical: choose the next small thing that brings you back to yourself.'],
    ['The Moon','Intuition','Not every shadow is a warning. Stay curious about what you cannot yet name, and trust the pattern beneath the noise.'],
    ['The Sun','Vitality','Your energy wants to be spent on what feels unmistakably alive. Say yes without needing to explain the warmth.'],
    ['The Hermit','Perspective','A useful answer is waiting away from the crowd. Give yourself an evening without input and let your own voice return.'],
    ['The Empress','Abundance','Make something tangible from the feeling. Nourishment, beauty, and patience are not indulgences; they are your current work.'],
    ['Justice','Clarity','The honest choice may be quieter than the convenient one. Name what is true, then let your action match it.'],
    ['The Fool','Beginning','You do not need a map for the first step. Bring your curiosity and leave room for a different route.'],
    ['Strength','Courage','Gentleness is not hesitation. Meet the difficult thing with a steady hand and less force than you think you need.'],
    ['The Wheel','Change','A cycle is turning whether you rush it or not. Release the need to control the timing and watch for the opening.'],
    ['The World','Completion','Something has gathered enough meaning to be finished. Mark the ending; it makes the next threshold easier to recognise.']
  ];
  let selected = [], deck = [], reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const freeKey = 'arcana-free-readings', profileKey = 'arcana-profile';
  const getFree = () => Number(localStorage.getItem(freeKey) ?? 2);
  const updateFree = () => { const count = getFree(); $('#free-count').textContent = count ? `${count} free reading${count === 1 ? '' : 's'}` : 'Free readings used'; };
  const shuffle = (items) => [...items].sort(() => Math.random() - .5);
  const setStage = (stage) => { ['ritual-stage','selection-stage','reveal-stage'].forEach(id => $('#' + id).classList.toggle('hidden', id !== stage)); };
  function buildChoices() {
    deck = shuffle(cards); selected = []; $('#selection-count').textContent = '0 / 5 selected';
    const grid = $('#card-grid'); grid.innerHTML = '';
    deck.slice(0, 10).forEach((card, i) => {
      const button = document.createElement('button'); button.className = 'choice-card'; button.type = 'button'; button.setAttribute('aria-label', `Face-down card ${i + 1}`);
      button.addEventListener('click', () => {
        const index = selected.indexOf(i);
        if (index >= 0) selected.splice(index, 1); else if (selected.length < 5) selected.push(i);
        button.classList.toggle('selected', selected.includes(i)); button.setAttribute('aria-pressed', selected.includes(i));
        $('#selection-count').textContent = `${selected.length} / 5 selected`;
        const reveal = $('#reveal-button'); reveal.disabled = selected.length !== 5; reveal.classList.toggle('disabled', selected.length !== 5);
      }); grid.append(button);
    });
  }
  function reveal() {
    const spread = selected.map(index => deck[index]); const grid = $('#revealed-grid'); grid.innerHTML = '';
    spread.forEach((card, i) => { const item = document.createElement('article'); item.className = 'revealed-card'; item.innerHTML = `<div class="flip-inner"><div class="flip-front"><b>${String(i + 1).padStart(2,'0')}</b><strong>✦</strong><small>ARCANA / POSITION ${i + 1}</small></div><div class="flip-back"><b>${String(i + 1).padStart(2,'0')} / ${['PAST','PRESENT','TENSION','GUIDANCE','NEXT'][i]}</b><strong>${card[0]}</strong><p>${card[2]}</p></div></div>`; grid.append(item); });
    setStage('reveal-stage'); if (!reduced) $$('.flip-inner').forEach((el, i) => setTimeout(() => { el.style.transform = 'rotateY(0deg)'; }, 220 + i * 180)); else $$('.flip-inner').forEach(el => el.style.transform = 'rotateY(0deg)');
    const free = getFree(); if (free > 0) localStorage.setItem(freeKey, free - 1); updateFree(); $('#reveal-stage').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  $('#spin-button').addEventListener('click', () => { if (getFree() < 1) { openModal('token-modal'); return; } const button = $('#spin-button'); button.disabled = true; $('#stage-eyebrow').textContent = 'SHUFFLING THE UNKNOWN'; $('#stage-title').innerHTML = 'Let the question<br>find its shape.'; $('#stage-description').textContent = 'The deck is listening. When you are ready, choose what calls to you.'; button.innerHTML = 'Deck ready <span>✓</span>'; setTimeout(() => { buildChoices(); setStage('selection-stage'); }, reduced ? 50 : 1200); });
  $('#reveal-button').addEventListener('click', reveal);
  $('#new-reading-button').addEventListener('click', () => { $('#spin-button').disabled = false; $('#spin-button').innerHTML = 'Spin the deck <span>↻</span>'; $('#stage-eyebrow').textContent = 'THE DECK IS RESTING'; $('#stage-title').innerHTML = 'What would you<br>like to ask?'; $('#stage-description').textContent = 'Take one breath. Put your question into words, or keep it quietly yours.'; setStage('ritual-stage'); $('#reading').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); });
  const backdrop = $('#modal-backdrop'); const openModal = (id) => { backdrop.classList.remove('hidden'); $$('.modal', backdrop).forEach(modal => modal.classList.toggle('hidden', modal.id !== id)); $(id + ' input')?.focus(); }; const closeModal = () => backdrop.classList.add('hidden');
  $$('.profile-trigger').forEach(btn => btn.addEventListener('click', () => openModal('profile-modal'))); $('#token-button').addEventListener('click', () => openModal('token-modal')); $$('.price-option').forEach(btn => btn.addEventListener('click', () => openModal('token-modal'))); $$('.modal-close').forEach(btn => btn.addEventListener('click', closeModal)); backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); }); document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  $('#profile-form').addEventListener('submit', e => { e.preventDefault(); const form = new FormData(e.currentTarget); localStorage.setItem(profileKey, JSON.stringify(Object.fromEntries(form))); closeModal(); $('.profile-trigger').textContent = `Hi, ${form.get('name')}`; }); $('#demo-checkout').addEventListener('click', () => { $('#demo-checkout').innerHTML = 'Demo checkout ready <span>✓</span>'; setTimeout(closeModal, 900); });
  const saved = JSON.parse(localStorage.getItem(profileKey) || 'null'); if (saved?.name) $('.profile-trigger').textContent = `Hi, ${saved.name}`; updateFree();
})();
