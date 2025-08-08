import { Routes, Route } from 'react-router-dom';
import Portfolio from './app/Portfolio';
import About from './app/About';
import OS from './app/OS';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/os" element={<OS />} />
    </Routes>
  );
}

export default App;