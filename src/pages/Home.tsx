import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(2, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                New Collection 2024
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Light Up Your
                <span className="block text-gradient">World</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our exquisite collection of handcrafted table lamps designed to transform any space into a warm, inviting sanctuary.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="gap-2 text-base px-8 glow-amber">
                    Shop Collection
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="text-base px-8">
                    Explore Designs
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">4.9/5</strong> from 2,000+ reviews
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden glow-amber">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=900&fit=crop"
                  alt="Elegant table lamp"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders $100+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background border">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background border">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">2-Year Warranty</h3>
                <p className="text-sm text-muted-foreground">Full coverage included</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background border">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Expert assistance always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Featured Collection</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Handpicked For You</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our most beloved designs, crafted with care and built to illuminate your moments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Illuminate Every Moment</h2>
            <p className="mt-6 text-lg opacity-90">
              Create the perfect ambiance with our premium table lamps. Each piece is designed to bring warmth and elegance to your space.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="mt-8">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-4">Top Rated</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Best Sellers</h2>
              <p className="text-muted-foreground mt-4">Customer favorites that never go out of style.</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-3xl p-8 md:p-16 text-center border">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Newsletter</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Subscribe for exclusive offers, new arrivals, and interior design tips.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
