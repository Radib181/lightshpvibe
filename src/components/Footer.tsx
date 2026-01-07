import { Lamp, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Lamp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-serif">LuminaLights</span>
            </Link>
            <p className="text-muted-foreground">
              Crafting elegant lighting solutions since 2010. Illuminate your world with our premium collection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                Cart
              </Link>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                About Us
              </span>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Categories</h3>
            <nav className="flex flex-col gap-3">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Modern</span>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Vintage</span>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Luxury</span>
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Industrial</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <span>hello@luminalights.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>123 Light Street, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LuminaLights. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
