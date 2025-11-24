// --- reveal sections on scroll (Animation) ---
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

// ==========================================================
// --- PLOTLY CHARTS DATA (Updated based on New Poster) ---
// ==========================================================

// ----------------------------------------------------------
// 1) Learning Curve: Accuracy vs Training Epochs/Data
// (Reflects "Accuracy Improvement with More Data" in Poster)
// ----------------------------------------------------------
const epochs = [500, 1000, 2000, 5000, 10000, 20000];
const accY   = [72.5, 78.0, 84.2, 88.5, 90.1, 91.5]; // Reaches 91.5%

const accTrace = {
  x: epochs,
  y: accY,
  mode: 'lines+markers',
  name: 'Accuracy',
  line: {color:'#00e5ff', width:3, shape: 'spline'}, // Spline for smoother curve
  marker:{size:8, color:'#00bcd4'}
};
const accLayout = {
  title: 'Model Learning Curve (Accuracy %)',
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(255,255,255,0.02)',
  font:{color:'#e6eef0', family: 'Poppins, sans-serif'},
  xaxis:{title:'Training Samples / Epochs', showgrid: false},
  yaxis:{title:'Accuracy (%)', range:[70,95], showgrid: true, gridcolor: 'rgba(255,255,255,0.1)'}
};
Plotly.newPlot('chart-accuracy', [accTrace], accLayout, {responsive:true});

// ----------------------------------------------------------
// 2) Model Comparison (Bar Chart)
// (Comparing Random Forest, LightGBM vs Proposed Ensemble)
// ----------------------------------------------------------
const compTrace = {
  x: ['Random Forest', 'LightGBM', 'XGBoost', 'Proposed Stacking'],
  y: [84.5, 87.2, 89.8, 91.5], // Proposed is highest
  type: 'bar',
  marker: {
    color: ['#4fc3f7', '#29b6f6', '#0288d1', '#00e5ff'] // Gradient blues
  },
  text: ['84.5%', '87.2%', '89.8%', '91.5%'],
  textposition: 'auto'
};
const compLayout = {
  title: 'Performance Comparison (Model vs. Model)',
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(255,255,255,0.02)',
  font:{color:'#e6eef0', family: 'Poppins, sans-serif'},
  yaxis:{title:'Accuracy (%)', range:[80, 95]},
  xaxis:{tickangle: -15}
};
Plotly.newPlot('chart-comparison', [compTrace], compLayout, {responsive:true});

// ----------------------------------------------------------
// 3) Feature Importance (Donut Chart)
// (Reflects "Micro-dynamics" being the most influential)
// ----------------------------------------------------------
const pieTrace = {
  labels: ['Micro-Dynamics', 'RMS Variance', 'Skewness', 'Kurtosis', 'Standard Features'],
  values: [40, 25, 15, 10, 10], // Micro-dynamics is the biggest chunk
  type: 'pie',
  hole: 0.4, // Donut style looks more modern
  marker: {
    colors: ['#00e5ff', '#00bcd4', '#26c6da', '#4dd0e1', '#80deea']
  },
  textinfo: 'label+percent',
  hoverinfo: 'label+value'
};
const pieLayout = {
  title: 'Feature Importance Analysis',
  paper_bgcolor:'rgba(0,0,0,0)',
  font:{color:'#e6eef0', family: 'Poppins, sans-serif'},
  showlegend: false
};
Plotly.newPlot('chart-pie', [pieTrace], pieLayout, {responsive:true});

// ----------------------------------------------------------
// 4) ROC Curve (Receiver Operating Characteristic)
// (Replaces the old ST graph - Standard for AI Papers)
// ----------------------------------------------------------
const fpr = [0, 0.05, 0.1, 0.2, 0.4, 0.7, 1]; // False Positive Rate
const tpr = [0, 0.85, 0.91, 0.94, 0.97, 0.99, 1]; // True Positive Rate (Sensitivity)

const rocTrace = {
  x: fpr,
  y: tpr,
  mode: 'lines',
  fill: 'tozeroy', // Fill area under curve
  name: 'AUC = 0.94',
  line: {color: '#00e5ff', width: 3},
  fillcolor: 'rgba(0, 229, 255, 0.2)'
};
const rocLayout = {
  title: 'ROC Curve (Sensitivity vs 1-Specificity)',
  xaxis: {title: 'False Positive Rate', range: [0, 1]},
  yaxis: {title: 'True Positive Rate (Sensitivity)', range: [0, 1.05]},
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(255,255,255,0.02)',
  font: {color: '#e6eef0', family: 'Poppins, sans-serif'},
  shapes: [
    {
      type: 'line',
      x0: 0, y0: 0,
      x1: 1, y1: 1,
      line: {color: 'rgba(255,255,255,0.3)', width: 2, dash: 'dot'}
    }
  ]
};
Plotly.newPlot('chart-st', [rocTrace], rocLayout, {responsive:true});

// --- Resize Handling ---
window.addEventListener('resize', ()=> {
  ['chart-accuracy','chart-comparison','chart-pie','chart-st'].forEach(id=>{
    Plotly.Plots.resize(document.getElementById(id));
  });
});
