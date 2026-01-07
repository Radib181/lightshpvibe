import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-transparent hover:border-primary/20">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">Out of Stock</Badge>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">{product.category}</Badge>
          
          {/* Quick Add Button - appears on hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              className="w-full gap-2"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Badge variant="outline" className="text-xs">
            {product.inStock ? 'In Stock' : 'Sold Out'}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
