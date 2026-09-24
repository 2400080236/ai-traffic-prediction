import { Link, useLocation } from 'react-router-dom';
import { Route } from 'lucide-react';
import { PageContainer } from './PageContainer';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'Model', path: '/model' },
    { name: 'MLOps', path: '/mlops' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#2A2F36]">
      <PageContainer>
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <Route className="h-6 w-6 text-[#F5B942]" />
            <span className="text-xl tracking-wide">
              <span className="font-light text-gray-200">Traffic</span>
              <span className="font-bold text-[#F5B942]">AI</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F5B942] rounded-t-md" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12161B] border border-[#2A2F36]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300">System Online</span>
          </div>
        </div>
      </PageContainer>
    </nav>
  );
};

export default Navbar;
