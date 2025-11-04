// --- reveal sections on scroll ---
const sections = document.querySelectorAll('.section');
function reveal() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top;
    if (top < trigger) s.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
reveal();

// --- back to top button ---
const btn = document.createElement('button');
btn.id = 'backToTop';
btn.innerText = '⬆';
Object.assign(btn.style, {
  position:'fixed', right:'26px', bottom:'26px',
  width:'46px', height:'46px', borderRadius:'50%',
  border:'none', background:'#00e5ff', color:'#041017',
  fontSize:'18px', cursor:'pointer', display:'none', zIndex:1200,
  boxShadow:'0 8px 30px rgba(0,229,255,0.12)'
});
document.body.appendChild(btn);
window.addEventListener('scroll', ()=> {
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
btn.onclick = ()=> window.scrollTo({top:0, behavior:'smooth'});

// --- PLOTLY CHARTS DATA (مأخوذة من البوستر / مبسطة) ---

// 1) Accuracy vs Number of Cases (line)
const casesX = [100,500,1000,5000,10000,20000];
const accY =   [78, 80, 83, 86, 88, 90];

const accTrace = {
  x: casesX,
  y: accY,
  mode: 'lines+markers',
  name: 'Accuracy',
  line: {color:'#00e5ff', width:3},
  marker:{size:8, color:'#00bcd4'}
};
const accLayout = {
  title: 'Accuracy vs Number of Input Cases',
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(255,255,255,0.02)',
  font:{color:'#e6eef0'},
  xaxis:{title:'Number of cases'},
  yaxis:{title:'Accuracy (%)', range:[70,95]}
};
Plotly.newPlot('chart-accuracy', [accTrace], accLayout, {responsive:true});

// 2) Comparison with previous studies (bar)
const compTrace = {
  x:['Study A','Study B','Proposed'],
  y:[82,86,90],
  type:'bar',
  marker:{color:['#6ec8e0','#4fc3f7','#00e5ff']},
  text:[82,86,90],
  textposition:'auto'
};
const compLayout = {
  title:'Comparison with Previous Research (Accuracy %)',
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(255,255,255,0.02)',
  font:{color:'#e6eef0'},
  yaxis:{range:[70,95]}
};
Plotly.newPlot('chart-comparison', [compTrace], compLayout, {responsive:true});

// 3) Pie: ECG segment impact
const pieTrace = {
  labels:['QRS Complex','P-wave','T-wave'],
  values:[60,25,15],
  type:'pie',
  marker:{colors:['#00e5ff','#6ec8e0','#7ad6e3']},
  textinfo:'label+percent'
};
const pieLayout = {
  title:'ECG Segment Impact on Decision',
  paper_bgcolor:'rgba(0,0,0,0)',
  font:{color:'#e6eef0'},
};
Plotly.newPlot('chart-pie', [pieTrace], pieLayout, {responsive:true});

// 4) ST-elevation vs Blood Flow (line/ scatter)
const flowX = [1,2,3,4,5];
const stY   = [3.0, 1.25, -0.25, -1.5, -2.5]; // تقريب من البوستر: مع زيادة التدفق ينخفض الST
const stTrace = {
  x: flowX,
  y: stY,
  mode:'lines+markers',
  line:{color:'#00bcd4', width:3},
  marker:{size:7}
};
const stLayout = {
  title:'Relationship between Blood Flow (mL/s) and ST Elevation (mV)',
  xaxis:{title:'Blood flow (mL/s)'},
  yaxis:{title:'ST elevation (mV)'},
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(255,255,255,0.02)',
  font:{color:'#e6eef0'},
};
Plotly.newPlot('chart-st', [stTrace], stLayout, {responsive:true});

// optional: make charts reflow on resize
window.addEventListener('resize', ()=> {
  ['chart-accuracy','chart-comparison','chart-pie','chart-st'].forEach(id=>{
    Plotly.Plots.resize(document.getElementById(id));
  });
});
