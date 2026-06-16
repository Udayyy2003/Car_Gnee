import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSociety,
  getSocietyClients,
  createSocietyClient,
  updateSocietyClient,
  deleteSocietyClient,
  getClientVehicles,
  createClientVehicle,
  updateClientVehicle,
  deleteClientVehicle,
  getClientPayments,
  createClientPayment,
  updateClientPayment,
  deleteClientPayment,
  getClientCleaningLogs,
  createClientCleaningLog,
  updateClientCleaningLog,
  deleteClientCleaningLog,
  updateSociety
} from '../lib/firestoreService';
import { createClientAccount } from '../lib/authService';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, Plus, Edit, Trash2, User, Car, CreditCard, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Function to extract Google Sheet ID from URL
const extractSheetId = (url) => {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Function to read Google Sheet as CSV (public sheets only)
const readGoogleSheet = async (sheetId, sheetName) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url);
  const csvText = await response.text();

  // Parse CSV
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h =>
    h
      .replace(/"/g, '')
      .replace(/\r/g, '')
      .trim()
  );
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v =>
      v
        .replace(/"/g, '')
        .replace(/\r/g, '')
        .trim()
    );
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  console.log('HEADERS:', headers);
  console.log('FIRST ROW:', data[0]);

  return data;
};

export default function SocietyDetails() {
  const { id: societyId } = useParams();
  const navigate = useNavigate();
  const [society, setSociety] = useState(null);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('vehicles');

  // Dialog states
  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] = useState(false);
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false);
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const [isEditVehicleDialogOpen, setIsEditVehicleDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [isEditPaymentDialogOpen, setIsEditPaymentDialogOpen] = useState(false);
  const [isAddCleaningLogDialogOpen, setIsAddCleaningLogDialogOpen] = useState(false);
  const [isEditCleaningLogDialogOpen, setIsEditCleaningLogDialogOpen] = useState(false);
  const [isConnectSheetDialogOpen, setIsConnectSheetDialogOpen] = useState(false);
  const [isSyncSummaryDialogOpen, setIsSyncSummaryDialogOpen] = useState(false);

  // Form states
  const [clientFormData, setClientFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleType: '',
    modelName: '',
    numberPlate: '',
    planType: '',
    amount: '',
    startDate: '',
    nextPaymentDate: ''
  });
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    status: 'pending',
    paidDate: ''
  });
  const [cleaningLogFormData, setCleaningLogFormData] = useState({
    date: '',
    insideCleaning: false,
    outsideCleaning: false
  });
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [syncSummary, setSyncSummary] = useState(null);

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (societyId) {
      loadSociety();
      loadClients();
    }
  }, [societyId]);

  const loadSociety = async () => {
    try {
      const data = await getSociety(societyId);
      setSociety(data);
      if (data?.googleSheetUrl) {
        setGoogleSheetUrl(data.googleSheetUrl);
      }
    } catch (error) {
      toast.error('Failed to load society');
    }
  };

  const loadClients = async () => {
    try {
      const data = await getSocietyClients(societyId);
      setClients(data);
    } catch (error) {
      toast.error('Failed to load clients');
    }
  };

  const loadClientData = async (client) => {
    setSelectedClient({ ...client, vehicles: [], payments: [], cleaningLogs: [] });
    try {
      const [vehicles, payments, cleaningLogs] = await Promise.all([
        getClientVehicles(societyId, client.id),
        getClientPayments(societyId, client.id),
        getClientCleaningLogs(societyId, client.id)
      ]);
      setSelectedClient({ ...client, vehicles, payments, cleaningLogs });
    } catch (error) {
      toast.error('Failed to load client data');
    }
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createClientAccount(
        societyId,
        clientFormData.fullName,
        clientFormData.email,
        clientFormData.password,
        clientFormData.phone,
        clientFormData.address
      );

      toast.success('Client created successfully!');
      setIsCreateClientDialogOpen(false);
      setClientFormData({ fullName: '', email: '', password: '', phone: '', address: '' });
      loadClients();
    } catch (error) {
      console.error('CREATE CLIENT ERROR:', error);
      toast.error(error.message || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSocietyClient(societyId, editingItem.id, clientFormData);
      toast.success('Client updated successfully!');
      setIsEditClientDialogOpen(false);
      setEditingItem(null);
      setClientFormData({ fullName: '', email: '', phone: '', address: '' });
      loadClients();
      if (selectedClient && selectedClient.id === editingItem.id) {
        loadClientData({ ...selectedClient, ...clientFormData });
      }
    } catch (error) {
      toast.error('Failed to update client');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      await deleteSocietyClient(societyId, clientId);
      toast.success('Client deleted successfully!');
      loadClients();
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
      }
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newVehicleAmount = parseFloat(vehicleFormData.amount);
      await createClientVehicle(societyId, selectedClient.id, {
        ...vehicleFormData,
        amount: newVehicleAmount
      });

      toast.success('Vehicle added successfully!');
      setIsAddVehicleDialogOpen(false);
      setVehicleFormData({
        vehicleType: '', modelName: '', numberPlate: '',
        planType: '', amount: '', startDate: '', nextPaymentDate: ''
      });
      loadClientData(selectedClient);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleEditVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newVehicleAmount = parseFloat(vehicleFormData.amount);
      await updateClientVehicle(societyId, selectedClient.id, editingItem.id, {
        ...vehicleFormData,
        amount: newVehicleAmount
      });

      toast.success('Vehicle updated successfully!');
      setIsEditVehicleDialogOpen(false);
      setEditingItem(null);
      setVehicleFormData({
        vehicleType: '', modelName: '', numberPlate: '',
        planType: '', amount: '', startDate: '', nextPaymentDate: ''
      });
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await deleteClientVehicle(societyId, selectedClient.id, vehicleId);
      toast.success('Vehicle deleted successfully!');
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to delete vehicle');
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createClientPayment(societyId, selectedClient.id, {
        ...paymentFormData,
        amount: parseFloat(paymentFormData.amount)
      });
      toast.success('Payment added successfully!');
      setIsAddPaymentDialogOpen(false);
      setPaymentFormData({ amount: '', status: 'pending', paidDate: '' });
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to add payment');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClientPayment(societyId, selectedClient.id, editingItem.id, {
        ...paymentFormData,
        amount: parseFloat(paymentFormData.amount)
      });
      toast.success('Payment updated successfully!');
      setIsEditPaymentDialogOpen(false);
      setEditingItem(null);
      setPaymentFormData({ amount: '', status: 'pending', paidDate: '' });
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to update payment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!confirm('Are you sure you want to delete this payment?')) return;
    try {
      await deleteClientPayment(societyId, selectedClient.id, paymentId);
      toast.success('Payment deleted successfully!');
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to delete payment');
    }
  };

  const handleAddCleaningLog = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createClientCleaningLog(societyId, selectedClient.id, cleaningLogFormData);
      toast.success('Cleaning log added successfully!');
      setIsAddCleaningLogDialogOpen(false);
      setCleaningLogFormData({ date: '', insideCleaning: false, outsideCleaning: false });
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to add cleaning log');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCleaningLog = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClientCleaningLog(societyId, selectedClient.id, editingItem.id, cleaningLogFormData);
      toast.success('Cleaning log updated successfully!');
      setIsEditCleaningLogDialogOpen(false);
      setEditingItem(null);
      setCleaningLogFormData({ date: '', insideCleaning: false, outsideCleaning: false });
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to update cleaning log');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCleaningLog = async (logId) => {
    if (!confirm('Are you sure you want to delete this cleaning log?')) return;
    try {
      await deleteClientCleaningLog(societyId, selectedClient.id, logId);
      toast.success('Cleaning log deleted successfully!');
      loadClientData(selectedClient);
    } catch (error) {
      toast.error('Failed to delete cleaning log');
    }
  };

  const handleConnectSheet = async () => {
    const sheetId = extractSheetId(googleSheetUrl);
    if (!sheetId) {
      toast.error('Invalid Google Sheet URL');
      return;
    }

    try {
      await updateSociety(societyId, {
        googleSheetUrl,
        googleSheetId: sheetId
      });
      toast.success('Google Sheet connected successfully!');
      setIsConnectSheetDialogOpen(false);
      loadSociety();
    } catch (error) {
      toast.error('Failed to connect Google Sheet');
    }
  };

  const handleSyncNow = async () => {
    if (!society?.googleSheetId) {
      toast.error('Please connect a Google Sheet first');
      return;
    }

    setLoading(true);
    const summary = {
      clientsCreated: 0,
      clientsUpdated: 0,
      vehiclesAdded: 0,
      vehiclesSkipped: 0,
      warnings: []
    };

    try {
      // Read Clients and Vehicles sheets
      const [clientsData, vehiclesData] = await Promise.all([
        readGoogleSheet(society.googleSheetId, 'Clients'),
        readGoogleSheet(society.googleSheetId, 'Vehicles')
      ]);

      // Get current clients
      const currentClients = await getSocietyClients(societyId);
      const emailToClient = {};
      currentClients.forEach(client => {
        emailToClient[client.email] = client;
      });

      // Process clients
      for (const row of clientsData) {
        console.log('CLIENT ROW RAW:', row);
        Object.keys(row).forEach(key => {
          console.log(
            'KEY:',
            JSON.stringify(key),
            'LENGTH:',
            key.length,
            'CHARS:',
            [...key].map(c => c.charCodeAt(0))
          );
        });
        console.log('FULL ROW JSON:', JSON.stringify(row));

        console.log('FULLNAME PROPERTY EXISTS:', row.hasOwnProperty('fullName'));
        console.log('ADDRESS PROPERTY EXISTS:', row.hasOwnProperty('address'));

        console.log('FULLNAME TYPE:', typeof row.fullName);
        console.log('ADDRESS TYPE:', typeof row.address);

        const fullName = row['fullName'];
        const email = row['email'];
        const password = row['password'];
        const phone = row['phone'];
        const address = row['address'];

        console.log('AFTER BRACKET ACCESS', {
          fullName,
          email,
          password,
          phone,
          address
        });
        console.log('VALIDATION CHECK:', {
          missingFullName: !fullName,
          missingEmail: !email,
          missingPassword: !password,
          missingPhone: !phone,
          missingAddress: !address
        });
        if (!fullName || !email || !password || !phone || !address) {
          summary.warnings.push(`Client row missing required fields: ${JSON.stringify(row)}`);
          continue;
        }

        if (emailToClient[email]) {
          // Update existing client
          await updateSocietyClient(societyId, emailToClient[email].id, {
            fullName,
            phone,
            address
          });
          summary.clientsUpdated++;
        } else {
          // Create new client
          await createClientAccount(societyId, fullName, email, password, phone, address);
          summary.clientsCreated++;
        }
      }

      // Refresh clients to get latest data for vehicles
      const updatedClients = await getSocietyClients(societyId);
      const updatedEmailToClient = {};
      updatedClients.forEach(client => {
        updatedEmailToClient[client.email] = client;
      });

      // Process vehicles
      for (const row of vehiclesData) {
        const { clientEmail, vehicleType, modelName, numberPlate, planType, amount } = row;
        if (!clientEmail || !vehicleType || !modelName || !numberPlate || !planType || !amount) {
          summary.warnings.push(`Vehicle row missing required fields: ${JSON.stringify(row)}`);
          continue;
        }

        // Find client
        const client = updatedEmailToClient[clientEmail];
        if (!client) {
          summary.warnings.push(`Vehicle skipped: Client with email ${clientEmail} not found`);
          summary.vehiclesSkipped++;
          continue;
        }

        // Check existing vehicles
        const existingVehicles = await getClientVehicles(societyId, client.id);
        const numberPlateExists = existingVehicles.some(v => v.numberPlate === numberPlate);

        if (numberPlateExists) {
          summary.warnings.push(`Vehicle skipped: Number plate ${numberPlate} already exists for client ${clientEmail}`);
          summary.vehiclesSkipped++;
          continue;
        }

        // Create vehicle
        await createClientVehicle(societyId, client.id, {
          vehicleType,
          modelName,
          numberPlate,
          planType,
          amount: parseFloat(amount),
          startDate: '',
          nextPaymentDate: ''
        });
        summary.vehiclesAdded++;
      }

      setSyncSummary(summary);
      setIsSyncSummaryDialogOpen(true);
      await loadClients();

      if (selectedClient) {
        const updatedClient = updatedClients.find(c => c.id === selectedClient.id);
        if (updatedClient) {
          await loadClientData(updatedClient);
        }
      }

    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync Google Sheet');
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const name = client.fullName || '';
    const phone = client.phone || '';
    const email = client.email || '';
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || phone.includes(query) || email.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {society?.name || society?.societyName || 'Society Details'}
            </h1>
            <p className="text-gray-600">{society?.address || society?.location}</p>
            {society?.googleSheetUrl && (
              <a
                href={society.googleSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Connected Sheet
              </a>
            )}
          </div>
        </div>

        {!selectedClient ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
              <Button variant="secondary" onClick={() => setIsConnectSheetDialogOpen(true)}>
                Connect Google Sheet
              </Button>
              <Button
                variant="secondary"
                onClick={handleSyncNow}
                disabled={loading || !society?.googleSheetId}
              >
                Sync Now
              </Button>
              <Dialog open={isCreateClientDialogOpen} onOpenChange={setIsCreateClientDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2d8b3f] hover:bg-[#236b31]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Client</DialogTitle>
                    <DialogDescription>Add a new client to the society</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateClient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={clientFormData.fullName}
                          onChange={(e) => setClientFormData({ ...clientFormData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={clientFormData.email}
                          onChange={(e) => setClientFormData({ ...clientFormData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={clientFormData.password}
                          onChange={(e) => setClientFormData({ ...clientFormData, password: e.target.value })}
                          placeholder="At least 6 characters"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={clientFormData.phone}
                          onChange={(e) => setClientFormData({ ...clientFormData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={clientFormData.address}
                          onChange={(e) => setClientFormData({ ...clientFormData, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Client'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Input
              type="search"
              placeholder="Search clients by name, phone or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <Card
                  key={client.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => loadClientData(client)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>{client.fullName}</CardTitle>
                        <CardDescription>{client.phone}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(client);
                          setClientFormData({
                            fullName: client.fullName,
                            email: client.email,
                            phone: client.phone,
                            address: client.address
                          });
                          setIsEditClientDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClient(client.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No clients found</h3>
                <p className="text-gray-500">Create your first client to get started</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" onClick={() => setSelectedClient(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Clients
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedClient.fullName}</h2>
                <p className="text-gray-600">{selectedClient.email} • {selectedClient.phone}</p>
              </div>
            </div>

            <Tabs defaultValue="vehicles" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="vehicles" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Vehicles
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="cleaning" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Cleaning Logs
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Details
                </TabsTrigger>
              </TabsList>

              {/* Vehicles Tab */}
              <TabsContent value="vehicles" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Vehicles</h3>
                  <Dialog open={isAddVehicleDialogOpen} onOpenChange={setIsAddVehicleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#2d8b3f] hover:bg-[#236b31]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add Vehicle</DialogTitle>
                        <DialogDescription>Add a new vehicle for this client</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddVehicle} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Vehicle Type</Label>
                            <Select
                              value={vehicleFormData.vehicleType}
                              onValueChange={(value) => setVehicleFormData({ ...vehicleFormData, vehicleType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="car">Car</SelectItem>
                                <SelectItem value="bike">Bike</SelectItem>
                                <SelectItem value="scooter">Scooter</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Model Name</Label>
                            <Input
                              value={vehicleFormData.modelName}
                              onChange={(e) => setVehicleFormData({ ...vehicleFormData, modelName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Number Plate</Label>
                            <Input
                              value={vehicleFormData.numberPlate}
                              onChange={(e) => setVehicleFormData({ ...vehicleFormData, numberPlate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Plan Type</Label>
                            <Select
                              value={vehicleFormData.planType}
                              onValueChange={(value) => setVehicleFormData({ ...vehicleFormData, planType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15 Days">15 Days</SelectItem>
                                <SelectItem value="30 Days">30 Days</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Amount (₹)</Label>
                            <Input
                              type="number"
                              value={vehicleFormData.amount}
                              onChange={(e) => setVehicleFormData({ ...vehicleFormData, amount: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={vehicleFormData.startDate}
                              onChange={(e) => setVehicleFormData({ ...vehicleFormData, startDate: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Vehicle'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClient.vehicles?.map((vehicle) => (
                    <Card key={vehicle.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{vehicle.modelName}</CardTitle>
                            <CardDescription>{vehicle.numberPlate} • {vehicle.vehicleType}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingItem(vehicle);
                                setVehicleFormData({ ...vehicle });
                                setIsEditVehicleDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><strong>Plan:</strong> {vehicle.planType}</p>
                          <p><strong>Amount:</strong> ₹{vehicle.amount}</p>
                          <p><strong>Start Date:</strong> {vehicle.startDate}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Payments</h3>
                  <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#2d8b3f] hover:bg-[#236b31]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment</DialogTitle>
                        <DialogDescription>Add a new payment record</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPayment} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Amount (₹)</Label>
                          <Input
                            type="number"
                            value={paymentFormData.amount}
                            onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select
                            value={paymentFormData.status}
                            onValueChange={(value) => setPaymentFormData({ ...paymentFormData, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Paid Date</Label>
                          <Input
                            type="date"
                            value={paymentFormData.paidDate}
                            onChange={(e) => setPaymentFormData({ ...paymentFormData, paidDate: e.target.value })}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Payment'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {selectedClient.payments?.map((payment) => (
                    <Card key={payment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">₹{payment.amount}</CardTitle>
                            <CardDescription>
                              {payment.paidDate || 'No date'}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {payment.status}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingItem(payment);
                                setPaymentFormData({ ...payment });
                                setIsEditPaymentDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePayment(payment.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Cleaning Logs Tab */}
              <TabsContent value="cleaning" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Cleaning Logs</h3>
                  <Dialog open={isAddCleaningLogDialogOpen} onOpenChange={setIsAddCleaningLogDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#2d8b3f] hover:bg-[#236b31]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Cleaning Log
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Cleaning Log</DialogTitle>
                        <DialogDescription>Record a cleaning session</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCleaningLog} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={cleaningLogFormData.date}
                            onChange={(e) => setCleaningLogFormData({ ...cleaningLogFormData, date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="inside"
                              checked={cleaningLogFormData.insideCleaning}
                              onCheckedChange={(checked) => setCleaningLogFormData({ ...cleaningLogFormData, insideCleaning: checked })}
                            />
                            <Label htmlFor="inside">Inside Cleaning</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="outside"
                              checked={cleaningLogFormData.outsideCleaning}
                              onCheckedChange={(checked) => setCleaningLogFormData({ ...cleaningLogFormData, outsideCleaning: checked })}
                            />
                            <Label htmlFor="outside">Outside Cleaning</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Log'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {selectedClient.cleaningLogs?.map((log) => (
                    <Card key={log.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">{log.date}</CardTitle>
                            <CardDescription>
                              {(log.insideCleaning && 'Inside') + (log.insideCleaning && log.outsideCleaning ? ' • ' : '') + (log.outsideCleaning && 'Outside') || 'No cleaning recorded'}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingItem(log);
                                setCleaningLogFormData({ ...log });
                                setIsEditCleaningLogDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCleaningLog(log.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Client Details Tab */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <p className="text-gray-700">{selectedClient.fullName}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-gray-700">{selectedClient.email}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="text-gray-700">{selectedClient.phone}</p>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <p className="text-gray-700">{selectedClient.address}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Edit Client Dialog */}
        <Dialog open={isEditClientDialogOpen} onOpenChange={setIsEditClientDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditClient} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={clientFormData.fullName}
                  onChange={(e) => setClientFormData({ ...clientFormData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={clientFormData.email}
                  onChange={(e) => setClientFormData({ ...clientFormData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={clientFormData.phone}
                  onChange={(e) => setClientFormData({ ...clientFormData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={clientFormData.address}
                  onChange={(e) => setClientFormData({ ...clientFormData, address: e.target.value })}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Client'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Vehicle Dialog */}
        <Dialog open={isEditVehicleDialogOpen} onOpenChange={setIsEditVehicleDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Vehicle</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select
                    value={vehicleFormData.vehicleType}
                    onValueChange={(value) => setVehicleFormData({ ...vehicleFormData, vehicleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="scooter">Scooter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Model Name</Label>
                  <Input
                    value={vehicleFormData.modelName}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, modelName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number Plate</Label>
                  <Input
                    value={vehicleFormData.numberPlate}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, numberPlate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plan Type</Label>
                  <Select
                    value={vehicleFormData.planType}
                    onValueChange={(value) => setVehicleFormData({ ...vehicleFormData, planType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 Days">15 Days</SelectItem>
                      <SelectItem value="30 Days">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    value={vehicleFormData.amount}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={vehicleFormData.startDate}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, startDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Vehicle'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Payment Dialog */}
        <Dialog open={isEditPaymentDialogOpen} onOpenChange={setIsEditPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditPayment} className="space-y-4">
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={paymentFormData.amount}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={paymentFormData.status}
                  onValueChange={(value) => setPaymentFormData({ ...paymentFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Paid Date</Label>
                <Input
                  type="date"
                  value={paymentFormData.paidDate}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, paidDate: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Payment'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Cleaning Log Dialog */}
        <Dialog open={isEditCleaningLogDialogOpen} onOpenChange={setIsEditCleaningLogDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Cleaning Log</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditCleaningLog} className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={cleaningLogFormData.date}
                  onChange={(e) => setCleaningLogFormData({ ...cleaningLogFormData, date: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-inside"
                    checked={cleaningLogFormData.insideCleaning}
                    onCheckedChange={(checked) => setCleaningLogFormData({ ...cleaningLogFormData, insideCleaning: checked })}
                  />
                  <Label htmlFor="edit-inside">Inside Cleaning</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-outside"
                    checked={cleaningLogFormData.outsideCleaning}
                    onCheckedChange={(checked) => setCleaningLogFormData({ ...cleaningLogFormData, outsideCleaning: checked })}
                  />
                  <Label htmlFor="edit-outside">Outside Cleaning</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#2d8b3f] hover:bg-[#236b31]" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Log'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Connect Google Sheet Dialog */}
        <Dialog open={isConnectSheetDialogOpen} onOpenChange={setIsConnectSheetDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Google Sheet</DialogTitle>
              <DialogDescription>Add your Google Sheet URL</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Google Sheet URL</Label>
                <Input
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsConnectSheetDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConnectSheet} disabled={!googleSheetUrl}>
                Connect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sync Summary Modal */}
        <Dialog open={isSyncSummaryDialogOpen} onOpenChange={setIsSyncSummaryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sync Summary</DialogTitle>
            </DialogHeader>
            {syncSummary && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Clients Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{syncSummary.clientsCreated}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Clients Updated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{syncSummary.clientsUpdated}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Vehicles Added</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{syncSummary.vehiclesAdded}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Vehicles Skipped</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{syncSummary.vehiclesSkipped}</p>
                    </CardContent>
                  </Card>
                </div>

                {syncSummary.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Warnings</h4>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {syncSummary.warnings.map((warning, idx) => (
                        <p key={idx} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                          {warning}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsSyncSummaryDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
