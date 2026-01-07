import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-muted glow-amber">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-3xl">
                <Badge variant="secondary" className="text-lg px-6 py-2">Out of Stock</Badge>
              </div>
            )}
            <Badge className="absolute top-6 left-6 text-sm">{product.category}</Badge>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(124 reviews)</span>
              </div>
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-4xl font-bold text-primary mt-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground text-lg">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs mt-2 text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Shield className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs mt-2 text-muted-foreground">2-Year Warranty</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs mt-2 text-muted-foreground">30-Day Returns</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2 h-14 text-base glow-amber"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1 h-14 text-base"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
