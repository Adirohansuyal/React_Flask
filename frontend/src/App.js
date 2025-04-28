import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [sepalLength, setSepalLength] = useState(5.0);
  const [sepalWidth, setSepalWidth] = useState(3.0);
  const [petalLength, setPetalLength] = useState(1.5);
  const [petalWidth, setPetalWidth] = useState(0.2);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState('');

  const handlePredict = async () => {
    const featuresArray = [sepalLength, sepalWidth, petalLength, petalWidth];

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: featuresArray
      });
      setPrediction(response.data.prediction);
      setToast('Prediction successful! 🎯');
    } catch (error) {
      console.error('Error making prediction:', error);
      setToast('Prediction failed. Try again ❌');
    } finally {
      setLoading(false);
      setTimeout(() => setToast(''), 3000); // Toast disappears after 3s
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const bgStyle = darkMode 
    ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
    : 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';

  const cardBg = darkMode ? '#2c2c2c' : '#ffffff';
  const textColor = darkMode ? '#f1f1f1' : '#333';
  const buttonColor = darkMode ? '#4dd0e1' : '#ff6f61';

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: bgStyle, 
      fontFamily: 'Poppins, sans-serif',
      padding: '20px',
      transition: '0.5s'
    }}>
      <div style={{ 
        background: cardBg, 
        padding: '30px 20px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        width: '100%', 
        maxWidth: '400px', 
        textAlign: 'center',
        color: textColor,
        position: 'relative'
      }}>
        {/* Dark mode toggle */}
        <button 
          onClick={toggleDarkMode}
          style={{
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            background: 'none', 
            border: 'none', 
            fontSize: '20px',
            cursor: 'pointer',
            color: textColor
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>🌸 Iris Predictor</h1>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>Sepal Length (cm):</label>
          <input
            type="number"
            step="0.1"
            value={sepalLength}
            onChange={(e) => setSepalLength(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>Sepal Width (cm):</label>
          <input
            type="number"
            step="0.1"
            value={sepalWidth}
            onChange={(e) => setSepalWidth(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>Petal Length (cm):</label>
          <input
            type="number"
            step="0.1"
            value={petalLength}
            onChange={(e) => setPetalLength(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label>Petal Width (cm):</label>
          <input
            type="number"
            step="0.1"
            value={petalWidth}
            onChange={(e) => setPetalWidth(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <button 
          onClick={handlePredict} 
          style={{ 
            ...buttonStyle, 
            background: buttonColor 
          }}
          onMouseOver={(e) => e.target.style.background = '#ff7f50'}
          onMouseOut={(e) => e.target.style.background = buttonColor}
        >
          🔮 Predict
        </button>

        {loading && <p style={{ marginTop: '20px', fontSize: '18px' }}>⏳ Loading...</p>}

        {prediction && !loading && (
          <div style={{ marginTop: '30px' }}>
            <h2>Prediction Result:</h2>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: darkMode ? '#4dd0e1' : '#0077b6' }}>
              {prediction}
            </p>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            opacity: '0.9',
            transition: '0.3s'
          }}>
            {toast}
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '14px',
  marginBottom: '10px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  marginTop: '10px',
  color: '#fff',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '100%',
  transition: '0.3s all'
};

export default App;
