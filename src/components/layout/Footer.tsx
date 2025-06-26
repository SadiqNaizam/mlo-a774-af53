import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} StorePulse. All Rights Reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Help Center
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;