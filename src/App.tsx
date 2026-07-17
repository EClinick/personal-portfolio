import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogList from './app/BlogList';
import BlogPost from './app/BlogPost';
import Footer from './components/Footer';
import Menu from './components/Menu';
import MinimalView from './components/MinimalView';

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MinimalView />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
