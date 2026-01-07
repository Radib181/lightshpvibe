import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const { orderId, formData, items, total } = orderData;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order ID */}
          <div className="mt-6 inline-block px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Order ID: </span>
            <span className="font-mono font-semibold">{orderId}</span>
          </div>

          {/* Order Details Card */}
          <Card className="mt-8 p-6 text-left">
            <h2 className="font-semibold text-lg mb-4">Order Details</h2>
            
            {/* Delivery Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}{formData.postalCode && `, ${formData.postalCode}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">Cash on Delivery (COD)</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Items */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Items Ordered ({items.length})</h3>
              </div>
              <div className="space-y-3">
                {items.map((item: any) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Paid</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg">
                Return to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <p className="text-sm text-muted-foreground mt-8">
            If you have any questions about your order, please contact us at{' '}
            <a href="mailto:hello@luminalights.com" className="text-primary hover:underline">
              hello@luminalights.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
