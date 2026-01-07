import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { products as initialProducts, Product } from '@/data/products';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', image: '', inStock: true });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      inStock: product.inStock
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmAdd = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
      features: [],
      inStock: formData.inStock
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({ title: 'Product Added', description: `${newProduct.name} has been added.` });
    resetForm();
  };

  const confirmEdit = () => {
    if (!selectedProduct) return;
    setProducts(products.map(p =>
      p.id === selectedProduct.id
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image,
            inStock: formData.inStock
          }
        : p
    ));
    setIsEditDialogOpen(false);
    toast({ title: 'Product Updated', description: `${formData.name} has been updated.` });
  };

  const confirmDelete = () => {
    if (!selectedProduct) return;
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setIsDeleteDialogOpen(false);
    toast({ title: 'Product Deleted', description: `${selectedProduct.name} has been deleted.` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products ({filteredProducts.length})</CardTitle>
            <CardDescription>View and manage all products in your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="py-3 px-2 font-medium">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <Badge variant={product.inStock ? 'default' : 'secondary'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={() => { setIsAddDialogOpen(false); setIsEditDialogOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAddDialogOpen ? 'Add New Product' : 'Edit Product'}</DialogTitle>
            <DialogDescription>Fill in the product details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); setIsEditDialogOpen(false); }}>Cancel</Button>
            <Button onClick={isAddDialogOpen ? confirmAdd : confirmEdit}>
              {isAddDialogOpen ? 'Add Product' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
