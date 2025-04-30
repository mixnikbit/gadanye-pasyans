document.addEventListener('DOMContentLoaded', () => {
  let cards = [], cardMeanings = {}, comboMeanings = {};
  Promise.all([
    fetch('data/cards.json').then(r => r.json()),
    fetch('data/combinations.json').then(r => r.json())
  ]).then(([c, combos]) => {
    cards = Object.keys(c);
    cardMeanings = c;
    comboMeanings = combos;
  }).catch(err => console.error('JSON error:', err));

  const container = document.getElementById('card-container');
  document.getElementById('btn-single').addEventListener('click', () => {
    if (!cards.length) return;
    const card = cards[Math.floor(Math.random()*cards.length)];
    container.innerHTML = `<img src="images/${card}" alt="${card}"><p><strong>${card.replace('.png','')}</strong>: ${cardMeanings[card]}</p>`;
  });
  document.getElementById('btn-pair').addEventListener('click', () => {
    if (cards.length<2) return;
    let i=Math.floor(Math.random()*cards.length), j;
    do{j=Math.floor(Math.random()*cards.length);}while(j===i);
    const a=cards[i], b=cards[j];
    const key=`${a} + ${b}`, rev=`${b} + ${a}`;
    container.innerHTML = `<img src="images/${a}" alt="${a}"><img src="images/${b}" alt="${b}"><p><strong>${a.replace('.png','')} + ${b.replace('.png','')}</strong>: ${comboMeanings[key]||comboMeanings[rev]||''}</p>`;
  });
});
