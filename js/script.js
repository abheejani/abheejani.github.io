document.addEventListener("DOMContentLoaded", function () {


  // ── Hamburger ──
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll fade-in ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(function (el) { observer.observe(el); });

  // ── Magic card trick ──
  const startBtn = document.getElementById('startButton');
  if (startBtn) startBtn.addEventListener('click', startGame);
});


// ── Magic Card Trick ──
var game = { deck: [], rounds: 0, maxRounds: 3, columns: [] };

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function startGame() {
  var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  var suits    = ["♥","♦","♠","♣"];
  var deck = [];
  suits.forEach(function(s) { numbers.forEach(function(n) { deck.push(n + ' ' + s); }); });
  deck = shuffle(deck);
  game.deck   = deck.slice(0, 21);
  game.rounds = 0;
  document.getElementById('instructions').innerText = 'Memorize one card, then click the column it appears in.';
  dealCards();
}

function dealCards() {
  game.rounds++;
  var cols = [[], [], []];
  game.deck.forEach(function(card, i) { cols[i % 3].push(card); });
  game.columns = cols;
  displayColumns();
}

function displayColumns() {
  var container = document.getElementById('columnsContainer');
  container.innerHTML = '';
  game.columns.forEach(function(col, i) {
    var div = document.createElement('div');
    div.className = 'column';
    var title = document.createElement('div');
    title.className = 'column-title';
    title.innerText = 'Column ' + (i + 1);
    div.appendChild(title);
    col.forEach(function(card) {
      var c = document.createElement('div');
      c.className = 'card';
      c.innerText = card;
      div.appendChild(c);
    });
    div.addEventListener('click', function() { columnSelected(i); });
    container.appendChild(div);
  });
  var instr = document.getElementById('instructions');
  if (game.rounds < game.maxRounds) {
    instr.innerText = 'Round ' + game.rounds + ' of ' + game.maxRounds + ': click the column with your card.';
  } else {
    instr.innerText = 'Last round — click your column.';
  }
}

function columnSelected(idx) {
  var c = game.columns;
  var newDeck;
  if      (idx === 0) newDeck = c[1].concat(c[0], c[2]);
  else if (idx === 1) newDeck = c[2].concat(c[1], c[0]);
  else                newDeck = c[1].concat(c[2], c[0]);
  game.deck = newDeck;
  if (game.rounds < game.maxRounds) {
    dealCards();
  } else {
    revealCard();
  }
}

function revealCard() {
  document.getElementById('columnsContainer').innerHTML = '';
  var instr = document.getElementById('instructions');
  instr.innerHTML = '🎉 Your card was <strong>' + game.deck[10] + '</strong>.';
  var again = document.createElement('button');
  again.className = 'btn-magic';
  again.innerText = 'Try Again';
  again.style.marginTop = '0.75rem';
  again.addEventListener('click', startGame);
  document.getElementById('columnsContainer').appendChild(again);
}
