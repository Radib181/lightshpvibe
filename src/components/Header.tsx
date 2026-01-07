import { Link } from 'react-router-dom';
import { ShoppingCart, Lamp, Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const Header = () => {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Lamp className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">LuminaLights</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
