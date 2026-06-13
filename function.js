/* ── Stars ── */
const starCon = document.getElementById('stars');
for(let i=0;i<200;i++){
  const el=document.createElement('div');
  el.className='s';
  const sz=Math.random()*1.8+.4;
  el.style.cssText=`
    left:${Math.random()*100}%;
    top:${Math.random()*100}%;
    width:${sz}px;height:${sz}px;
    opacity:${Math.random()*.7+.1};
    animation:twinkle ${Math.random()*4+3}s ease-in-out infinite alternate;
    animation-delay:${Math.random()*5}s;
  `;
  starCon.appendChild(el);
}
const st=document.createElement('style');
st.textContent='@keyframes twinkle{from{opacity:.05}to{opacity:.75}}';
document.head.appendChild(st);

/* ── Slideshow ── */
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.dot');
let current=0,auto;
function goSlide(n){
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current=n;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  resetAuto();
}
function nextSlide(){goSlide((current+1)%slides.length)}
function resetAuto(){clearInterval(auto);auto=setInterval(nextSlide,5000)}
resetAuto();

/* ── Music Player ── */
const musicBtn=document.getElementById('musicBtn');
const musicPanel=document.getElementById('musicPanel');
const playBtn=document.getElementById('playBtn');
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
const volSlider=document.getElementById('volSlider');
const trackName=document.getElementById('trackName');
const audioEl=document.getElementById('audioEl');
const progressFill=document.getElementById('progressFill');
const progressBar=document.getElementById('progressBar');

/* 
  === CARA GANTI LAGU ===
  Tambahkan file musik ke folder yang sama dengan HTML ini,
  lalu edit array "playlist" di bawah.
  Format: { title: "Nama Lagu", src: "nama-file.mp3" }
  Bisa juga pakai URL lengkap: src: "https://..."
*/
const playlist=[
  {title:"Step Your Feet - Chase Your Dream Lofi Version", src:"Music/Step Your Feet - Chase Your Dream Lofi Version.mp3"},
  {title:"Halcyon: Chase Your Dream Opening Song", src:"Music/HCYD Opening song fan made 2.mp3"},
  {title:"Menggapai Mentari Credit Scene", src:"Music/HCD Credit Song.mp3"},
];
let trackIdx=0,playing=false;

function loadTrack(idx){
  const t=playlist[idx];
  trackName.textContent=t.title;
  if(t.src){
    audioEl.src=t.src;
    audioEl.volume=parseFloat(volSlider.value);
  }
}
let fadeInterval;

function fadeVolume(target, callback){

    clearInterval(fadeInterval);

    fadeInterval = setInterval(() => {

        if(target > audioEl.volume){
            audioEl.volume = Math.min(audioEl.volume + 0.05, target);
        } else {
            audioEl.volume = Math.max(audioEl.volume - 0.05, target);
        }

        if(audioEl.volume === target){
            clearInterval(fadeInterval);
            if(callback) callback();
        }

    }, 50);
}

function togglePlay(){

    if(!playlist[trackIdx].src){
        trackName.textContent='⚠ Tambahkan file audio dulu!';
        return;
    }

    if(playing){

        // FADE OUT lalu pause
        fadeVolume(0, () => {
            audioEl.pause();
        });

        playBtn.textContent='▶';
        musicBtn.classList.remove('playing');
        musicBtn.textContent='🎵';
        playing=false;

    } else {

        audioEl.play().then(() => {

            audioEl.volume = 0;
            fadeVolume(parseFloat(volSlider.value));

        }).catch(()=>{});

        playBtn.textContent='⏸';
        musicBtn.classList.add('playing');
        musicBtn.textContent='🎶';
        playing=true;
    }
}

function prevTrack(){

    fadeVolume(0, () => {
        trackIdx=(trackIdx-1+playlist.length)%playlist.length;
        loadTrack(trackIdx);
        audioEl.play().catch(()=>{});
        fadeVolume(parseFloat(volSlider.value));
    });

}
function nextTrack(){

    fadeVolume(0, () => {
        trackIdx=(trackIdx+1)%playlist.length;
        loadTrack(trackIdx);
        audioEl.play().catch(()=>{});
        fadeVolume(parseFloat(volSlider.value));
    });

}

playBtn.addEventListener('click',togglePlay);
musicBtn.addEventListener('click',()=>{
  musicPanel.classList.toggle('show');
});
prevBtn.addEventListener('click',prevTrack);
nextBtn.addEventListener('click',nextTrack);
volSlider.addEventListener('input',()=>{audioEl.volume=parseFloat(volSlider.value)});

audioEl.addEventListener('timeupdate',()=>{
  if(audioEl.duration){
    progressFill.style.width=(audioEl.currentTime/audioEl.duration*100)+'%';
  }
});
audioEl.addEventListener('ended',nextTrack);

progressBar.addEventListener('click',(e)=>{
  if(!audioEl.duration)return;
  const r=progressBar.getBoundingClientRect();
  const pct=(e.clientX-r.left)/r.width;
  audioEl.currentTime=pct*audioEl.duration;
});

loadTrack(0);

/* ── Language Button ── */
languageBtn.addEventListener("click",()=>{

    languageDropdown.classList.toggle("show");

});

document.addEventListener("click",(e)=>{

    if(
        !languageBtn.contains(e.target) &&
        !languageDropdown.contains(e.target)
    ){
        languageDropdown.classList.remove("show");
    }

});

/* ── UI Sound System ── */

const sHover = document.getElementById("sHover");
const sClick = document.getElementById("sClick");

let soundEnabled = true;

/* helper biar gak overlap rusak */
function playSound(sound){

    if(!soundEnabled) return;

    sound.currentTime = 0;
    sound.volume = 0.5;

    sound.play().catch(()=>{});
}

const hoverTargets = document.querySelectorAll(
    "button, .btn, a.btn, .uni-card, .comm-card, .language-btn, .ctrl-btn, .nav-links a"
);

hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        playSound(sHover);
    });
});

const clickTargets = document.querySelectorAll(
    "nav, button, .btn, a.btn, .language-dropdown div"
);

clickTargets.forEach(el => {
    el.addEventListener("click", () => {
        playSound(sClick);
    });
});

function toggleSound(){
    soundEnabled = !soundEnabled;
}

/* ── Translation System ── */

const translations = {

    id: {

        heroEyebrow: "Cerita Melampaui Realita",

        heroSub:
        "Menciptakan serial roleplay, cerita original, game, dan dunia yang tak terlupakan.",

        exploreBtn: "Jelajahi Universe",
        communityBtn: "Gabung Komunitas",

        navUniverses: "Universe",
        navTimeline: "Timeline",
        navTeam: "Tim",
        navCommunity: "Komunitas",

        ourUniverses: "Universe Kami",
        timeline: "Timeline",
        ourTeam: "Tim Kami",
        community: "Komunitas"
    },

    en: {

        heroEyebrow: "Stories Beyond Reality",

        heroSub:
        "Creating immersive roleplay series, original stories, games, and unforgettable worlds.",

        exploreBtn: "Explore Universe",
        communityBtn: "Join Community",

        navUniverses: "Universes",
        navTimeline: "Timeline",
        navTeam: "Team",
        navCommunity: "Community",

        ourUniverses: "Our Universes",
        timeline: "Timeline",
        ourTeam: "Our Team",
        community: "Community"
    },

    jp: {

        heroEyebrow: "現実を超えた物語",

        heroSub:
        "没入感のあるロールプレイシリーズ、オリジナルストーリー、ゲーム、そして忘れられない世界を創造します。",

        exploreBtn: "ユニバースを見る",
        communityBtn: "コミュニティに参加",

        navUniverses: "ユニバース",
        navTimeline: "タイムライン",
        navTeam: "チーム",
        navCommunity: "コミュニティ",

        ourUniverses: "私たちの世界",
        timeline: "タイムライン",
        ourTeam: "チーム",
        community: "コミュニティ"
    },
    zh: {

    heroEyebrow: "超越现实的故事",

    heroSub:
    "打造沉浸式角色扮演系列、原创故事、游戏以及令人难忘的世界。",

    exploreBtn: "探索宇宙",
    communityBtn: "加入社区",

    navUniverses: "宇宙",
    navTimeline: "时间线",
    navTeam: "团队",
    navCommunity: "社区",

    ourUniverses: "我们的宇宙",
    timeline: "时间线",
    ourTeam: "我们的团队",
    community: "社区"

}

};

function changeLanguage(lang){

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-translate]")
    .forEach(el=>{
        const key = el.dataset.translate;
        if(translations[lang][key]){
            el.textContent = translations[lang][key];
        }
    });

    const names = {
        id:"🇮🇩",
        en:"🇺🇸",
        jp:"🇯🇵",
        zh:"🇨🇳"
    };

    languageBtn.textContent = "🌐 " + names[lang];

    updateLangHighlight(lang);

    // ── HIGHLIGHT EFFECT ──
    languageBtn.classList.add("active-lang","pulse");

    setTimeout(()=>{
        languageBtn.classList.remove("pulse");
    },600);
    

    // remove active from others (optional clean state)
}

function updateLangHighlight(lang){

    languageBtn.classList.remove(
        "active-lang"
    );

    void languageBtn.offsetWidth; // reset animation trick

    languageBtn.classList.add("active-lang");

}

function detectLanguage(){

    const lang =
    navigator.language.toLowerCase();

    if(lang.startsWith("id"))
        return "id";

    if(lang.startsWith("ja"))
        return "jp";

    return "en";
}

const pt = document.getElementById("pageTransition");
const ptText = document.getElementById("ptText");

const loadingTexts = [
    "Initializing world...",
    "Loading universes...",
    "Syncing timeline...",
    "Preparing story engine...",
    "Welcome to Halcyon..."
];

let i = 0;

const textInterval = setInterval(() => {

    i++;

    if(i < loadingTexts.length){
        ptText.textContent = loadingTexts[i];
    }

}, 500);

window.addEventListener("load", () => {

    setTimeout(() => {

        clearInterval(textInterval);

        ptText.textContent = "Ready.";

        setTimeout(() => {
            pt.classList.add("hide");
        }, 600);

    }, 2200);
});
