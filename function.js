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
  {title:"Halcyon: Chase Your Dream Opening Remix Song", src:"Music/HCYD Opening song fan made 2.mp3"},
  {title:"Atmospheric Theme 3", src:""},
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
function togglePlay(){
  if(!playlist[trackIdx].src){
    trackName.textContent='⚠ Tambahkan file audio dulu!';
    return;
  }
  if(playing){
    audioEl.pause();
    playBtn.textContent='▶';
    musicBtn.classList.remove('playing');
    musicBtn.textContent='🎵';
    playing=false;
  } else {
    audioEl.play().catch(()=>{});
    playBtn.textContent='⏸';
    musicBtn.classList.add('playing');
    musicBtn.textContent='🎶';
    playing=true;
  }
}
function prevTrack(){
  trackIdx=(trackIdx-1+playlist.length)%playlist.length;
  loadTrack(trackIdx);
  if(playing){audioEl.play().catch(()=>{})}
}
function nextTrack(){
  trackIdx=(trackIdx+1)%playlist.length;
  loadTrack(trackIdx);
  if(playing){audioEl.play().catch(()=>{})}
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