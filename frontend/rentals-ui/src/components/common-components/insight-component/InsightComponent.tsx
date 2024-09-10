import React from 'react';
import './InsightsComponent.scss';

function InsightComponent() {
  return (
    <div className="insights-container">
      <div className="insights-text">
        <h2>Insights and Performance Metrics</h2>
      </div>
      <div className="insights-metrics">
        <div className="metric-box">
          <h3>5000+</h3>
          <p>Total Listings in the System</p>
        </div>
        <div className="metric-box">
          <h3>1000+</h3>
          <p>Active Listings</p>
        </div>
        <div className="metric-box">
          <h3>30+</h3>
          <p>Articles in the Blog</p>
        </div>
      </div>
    </div>
  );
}

export default InsightComponent;
