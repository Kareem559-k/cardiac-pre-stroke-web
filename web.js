// --- Reveal Animation ---
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

// --- Charts Configuration (PLOTLY) ---

const commonLayout = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(255,255,255,0.03)',
  font: { family: 'Poppins', color: '#e0e0e0' },
  margin: { t: 40, b: 40, l: 40, r: 20 }
};

// 1. Accuracy Curve
Plotly.newPlot('chart-accuracy', [{
  x: [500, 1000, 5000, 10000, 20000],
  y: [72, 79, 85, 89, 91.5],
  type: 'scatter',
  mode: 'lines+markers',
  line: { color: '#00e5ff', width: 3, shape: 'spline' },
  name: 'Accuracy'
}], {
  ...commonLayout,
  title: 'Accuracy Improvement with Data',
  yaxis: { title: 'Accuracy (%)', range: [70, 95] }
}, {responsive: true});

// 2. Model Comparison (Bar Chart)
Plotly.newPlot('chart-comparison', [{
  x: ['LightGBM', 'XGBoost', 'Random Forest', 'Stacking (Ours)'],
  y: [87, 89, 85, 91.5],
  type: 'bar',
  marker: { color: ['#4fc3f7', '#29b6f6', '#0288d1', '#00e5ff'] }
}], {
  ...commonLayout,
  title: 'Model Comparison',
  yaxis: { range: [80, 95] }
}, {responsive: true});

// 3. Feature Importance (Pie Chart)
Plotly.newPlot('chart-pie', [{
  labels: ['Micro-Dynamics', 'RMS', 'Variance', 'Skewness', 'Kurtosis'],
  values: [35, 20, 15, 15, 15],
  type: 'pie',
  hole: 0.4,
  marker: { colors: ['#00e5ff', '#00bcd4', '#26c6da', '#4dd0e1', '#80deea'] }
}], {
  ...commonLayout,
  title: 'Feature Importance'
}, {responsive: true});

// 4. ROC Curve
Plotly.newPlot('chart-roc', [{
  x: [0, 0.1, 0.2, 0.5, 0.8, 1],
  y: [0, 0.85, 0.91, 0.95, 0.98, 1],
  type: 'scatter',
  mode: 'lines',
  fill: 'tozeroy',
  line: { color: '#00e5ff' },
  name: 'AUC'
}], {
  ...commonLayout,
  title: 'ROC Curve (AUC = 0.94)',
  xaxis: { title: 'False Positive Rate' },
  yaxis: { title: 'True Positive Rate' }
}, {responsive: true});
