import { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4">Our Collection</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Premium Table Lamps</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our carefully curated selection of table lamps, each designed to bring warmth and elegance to your space.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Products
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory && ` in ${selectedCategory}`}
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
            <Button onClick={() => setSelectedCategory(null)} variant="outline" className="mt-4">
              View All Products
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
