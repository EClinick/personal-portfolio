import { Routes, Route } from 'react-router-dom';
import Portfolio from './app/Portfolio';
import About from './app/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;