import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, ArrowUpRight, Coins, Landmark } from 'lucide-react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    cropType: 'Tomato', landAcres: 2, yieldPerAcre: 8, marketPrice: 2480,
    laborCost: 15000, fertilizerCost: 8000, pesticideCost: 3000,
    seedCost: 4000, irrigationCost: 2000, transportCost: 5000,
  });

  const [res, setRes] = useState({ rev: 0, inv: 0, profit: 0, roi: 0 });

  useEffect(() => {
    const revenue = inputs.landAcres * inputs.yieldPerAcre * inputs.marketPrice;
    const investment = (inputs.laborCost + inputs.fertilizerCost + inputs.pesticideCost + inputs.seedCost + inputs.irrigationCost + inputs.transportCost) * inputs.landAcres;
    setRes({
      rev: revenue,
      inv: investment,
      profit: revenue - investment,
      roi: investment > 0 ? ((revenue - investment) / investment) * 100 : 0
    });
  }, [inputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: name === 'cropType' ? value : parseFloat(value) || 0 }));
  };

  return (
    <div className="roi-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header Panel */}
      <div className="agent-card" style={{ '--card-accent': 'var(--accent-cyan)' }}>
        <div className="agent-card-header" style={{ marginBottom: 0 }}>
          <div className="agent-card-title-group">
            <div className="agent-card-icon" style={{ background: 'var(--accent-cyan-glow)', color: 'var(--accent-cyan)' }}>
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="agent-card-title">Investment & ROI Calculator</h3>
              <p className="agent-card-subtitle">Projected financial health for {inputs.cropType} cultivation</p>
            </div>
          </div>
          <div className="status-badge status-badge--verified">
            <div className="badge-dot"></div> Live Analysis
          </div>
        </div>
      </div>

      <div className="panel-grid">
        {/* Input Panel */}
        <div className="agent-card">
          <h3 className="sidebar-section-label" style={{ paddingLeft: 0 }}>Farm Parameters</h3>
          <div className="agent-card-body">
            <div className="metric-row">
              <div style={{ flex: 1 }}>
                <label className="progress-bar-label">Crop Type</label>
                <select 
                  name="cropType" 
                  value={inputs.cropType} 
                  onChange={handleChange}
                  className="location-input" 
                  style={{ marginTop: '8px' }}
                >
                  <option>Tomato</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label className="progress-bar-label">Land Area (Acres)</label>
                <input 
                  type="number" 
                  name="landAcres" 
                  value={inputs.landAcres} 
                  onChange={handleChange}
                  className="location-input" 
                  style={{ marginTop: '8px' }}
                />
              </div>
            </div>

            <h3 className="sidebar-section-label" style={{ paddingLeft: 0, marginTop: '10px' }}>Cost Breakdown (₹/Acre)</h3>
            <div className="panel-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 0 }}>
              {['Labor', 'Fertilizer', 'Seeds', 'Transport'].map((field) => (
                <div key={field} className="metric-badge">
                  <span className="metric-badge-label">{field}</span>
                  <input 
                    type="number" 
                    name={`${field.toLowerCase()}Cost`}
                    value={inputs[`${field.toLowerCase()}Cost`]}
                    onChange={handleChange}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem', width: '100%', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="agent-card" style={{ '--card-accent': 'var(--accent-green)' }}>
          <h3 className="sidebar-section-label" style={{ paddingLeft: 0 }}>Profitability Forecast</h3>
          <div className="agent-card-body">
            
            <div className="recommendation-section" style={{ background: 'var(--accent-green-glow)', borderColor: 'var(--accent-green)' }}>
              <div className="recommendation-section-title" style={{ color: 'var(--accent-green)' }}>
                <TrendingUp size={18} /> Net Expected Profit
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.04em' }}>
                ₹{(res.profit / 100000).toFixed(2)}L
              </div>
              <div className="status-badge status-badge--low" style={{ marginTop: '8px' }}>
                <ArrowUpRight size={14} /> {res.roi.toFixed(1)}% Return on Investment
              </div>
            </div>

            <div className="field-row">
              <span className="field-label">Gross Revenue</span>
              <span className="field-value" style={{ color: 'var(--accent-cyan)' }}>₹{(res.rev / 100000).toFixed(2)}L</span>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill progress-bar-fill--blue" 
                  style={{ width: `${Math.min(res.roi, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="field-row">
              <span className="field-label">Total Investment</span>
              <span className="field-value" style={{ color: 'var(--accent-red)' }}>₹{(res.inv / 1000).toFixed(1)}K</span>
            </div>

            <div className="advisory-box">
              <div className="advisory-title">Economic Advisory</div>
              <p>Based on current market prices (₹{inputs.marketPrice}/qtl), your {inputs.cropType} cultivation shows {res.roi > 20 ? 'strong' : 'moderate'} viability.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ROICalculator;