import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  getSocieties,
  createSociety,
  updateSociety,
  deleteSociety
} from '../lib/firestoreService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Building2, Plus, Edit, Trash2, Users, Car, CreditCard, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { PWAInstallBanner } from '../components/PWAInstallBanner';

export default function AdminDashboard() {
  const [societies, setSocieties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSociety, setEditingSociety] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    loadSocieties();
  }, []);

  const loadSocieties = async () => {
    try {
      const data = await getSocieties();
      setSocieties(data);
    } catch (error) {
      toast.error('Failed to load societies');
    }
  };

  const handleCreateSociety = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSociety(formData);
      toast.success('Society created successfully!');
      setIsCreateDialogOpen(false);
      setFormData({ name: '', location: '' });
      loadSocieties();
    } catch (error) {
      toast.error('Failed to create society');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSociety = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSociety(editingSociety.id, formData);
      toast.success('Society updated successfully!');
      setIsEditDialogOpen(false);
      setEditingSociety(null);
      setFormData({ name: '', location: '' });
      loadSocieties();
    } catch (error) {
      toast.error('Failed to update society');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSociety = async (id) => {
    if (!confirm('Are you sure you want to delete this society?')) return;
    try {
      await deleteSociety(id);
      toast.success('Society deleted successfully!');
      loadSocieties();
    } catch (error) {
      toast.error('Failed to delete society');
    }
  };

  const openEditDialog = (society) => {
    setEditingSociety(society);
    setFormData({
      name: society.name || society.societyName,
      location: society.location
    });
    setIsEditDialogOpen(true);
  };

  const filteredSocieties = societies.filter(society => {
    const name = society.name || society.societyName || '';
    const location = society.location || '';
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || location.toLowerCase().includes(query);
  });

  // Mock stats for now
  const totalClients = societies.reduce((sum, s) => sum + (s.clientCount || 0), 0);
  const totalVehicles = societies.reduce((sum, s) => sum + (s.vehicleCount || 0), 0);
  const pendingPayments = societies.reduce((sum, s) => sum + (s.pendingPayments || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PWAInstallBanner />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage societies and clients</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={logout}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#2d8b3f] hover:bg-[#236b31]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Society
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Society</DialogTitle>
                  <DialogDescription>Add a new society to the system</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSociety} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Society Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter society name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Society'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Society</DialogTitle>
              <DialogDescription>Update society details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSociety} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Society Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter society name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Society'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Societies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{societies.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPayments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search societies by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSocieties.map((society) => (
            <Card key={society.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-[#2d8b3f]" />
                    </div>
                    <div>
                      <CardTitle>{society.name || society.societyName}</CardTitle>
                      <CardDescription>{society.location}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(society)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSociety(society.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-[#2d8b3f] hover:bg-[#236b31]"
                  onClick={() => navigate(`/dashboard/admin/society/${society.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSocieties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No societies found</h3>
            <p className="text-gray-500">Create your first society to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
