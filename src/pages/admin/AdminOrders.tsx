import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Delivered';
  date: string;
}

// Demo orders data
const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0101',
    address: '123 Main St, New York, NY 10001',
    items: [
      { name: 'Nordic Minimalist Lamp', quantity: 1, price: 89.99 },
      { name: 'Smart Touch Lamp', quantity: 1, price: 149.99 }
    ],
    total: 239.98,
    status: 'Delivered',
    date: '2024-01-05'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555-0102',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    items: [
      { name: 'Vintage Edison Desk Light', quantity: 1, price: 129.99 }
    ],
    total: 129.99,
    status: 'Processing',
    date: '2024-01-06'
  },
  {
    id: 'ORD-003',
    customer: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1 555-0103',
    address: '789 Pine Rd, Chicago, IL 60601',
    items: [
      { name: 'Crystal Elegance Lamp', quantity: 1, price: 199.99 },
      { name: 'Bamboo Natural Light', quantity: 1, price: 69.99 }
    ],
    total: 269.98,
    status: 'Pending',
    date: '2024-01-07'
  },
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: 'Status Updated',
      description: `Order ${orderId} status changed to ${newStatus}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>Manage and track all customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 px-2 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-medium">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                        >
                          <SelectTrigger className={`w-32 h-8 ${getStatusColor(order.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{order.date}</td>
                      <td className="py-3 px-2">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Order placed on {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrder.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{selectedOrder.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
