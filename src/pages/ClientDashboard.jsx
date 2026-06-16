import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getSocietyClient,
  getClientVehicles,
  getClientPayments,
  getClientCleaningLogsByMonth
} from '../lib/firestoreService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User, Car, CreditCard, Calendar, LogOut } from 'lucide-react';
import { PWAInstallBanner } from '../components/PWAInstallBanner';

export default function ClientDashboard() {
  const { userData, logout } = useAuth();
  const [clientData, setClientData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [cleaningLogs, setCleaningLogs] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (userData?.societyId && userData?.clientId) {
      loadClientData();
    }
  }, [userData, currentMonth, currentYear]);

  const loadClientData = async () => {
    try {
      const client = await getSocietyClient(
        userData.societyId,
        userData.clientId
      );

      console.log("CLIENT RESULT:", client);

      const vehiclesData = await getClientVehicles(
        userData.societyId,
        userData.clientId
      );

      console.log("VEHICLES RESULT:", vehiclesData);

      const paymentsData = await getClientPayments(
        userData.societyId,
        userData.clientId
      );

      console.log("PAYMENTS RESULT:", paymentsData);

      const logsData = await getClientCleaningLogsByMonth(
        userData.societyId,
        userData.clientId,
        currentYear,
        currentMonth
      );

      console.log("LOGS RESULT:", logsData);
      setClientData(client);
      console.log("CLIENT:", client);
      setVehicles(vehiclesData);
      console.log("VEHICLES:", vehiclesData);
      setPayments(paymentsData);
      console.log("PAYMENTS:", paymentsData);
      setCleaningLogs(logsData);
      console.log("LOGS:", logsData);
    } catch (error) {
      console.error('Error loading client data:', error);
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalAmount = totalPaid + totalPending;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayLog = cleaningLogs.find(log => log.date === dateStr);
      let bgColor = 'bg-gray-100';
      if (dayLog) {
        if (dayLog.insideCleaning && dayLog.outsideCleaning) {
          bgColor = 'bg-green-200';
        } else if (dayLog.insideCleaning) {
          bgColor = 'bg-yellow-200';
        } else if (dayLog.outsideCleaning) {
          bgColor = 'bg-blue-200';
        }
      }

      calendarDays.push(
        <div key={day} className={`aspect-square flex items-center justify-center rounded-lg ${bgColor}`}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };
  console.log("USER DATA:", userData);
  console.log("CLIENT ID:", userData?.clientId);
  console.log("SOCIETY ID:", userData?.societyId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <PWAInstallBanner />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {clientData?.fullName || 'User'}!</h1>
            <p className="text-gray-600">Here's your dashboard overview</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm font-medium">Personal Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{clientData?.email}</p>
              <p className="text-sm text-gray-600">{clientData?.phone}</p>
              <p className="text-sm text-gray-600">{clientData?.address}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm font-medium">Vehicles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{vehicles.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{totalPaid}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{totalPending}</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            {vehicles.length === 0 ? (
              <p className="text-gray-500">No vehicles added yet.</p>
            ) : (
              <div className="space-y-3">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{vehicle.modelName}</p>
                      <p className="text-sm text-gray-600">{vehicle.numberPlate} • {vehicle.planType}</p>
                    </div>
                    <p className="font-semibold">₹{vehicle.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cleaning Calendar */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Cleaning Calendar - {monthNames[currentMonth]} {currentYear}</CardTitle>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>Inside Cleaning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 rounded"></div>
                <span>Outside Cleaning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span>Both Cleaned</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
