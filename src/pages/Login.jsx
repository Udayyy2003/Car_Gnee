import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login, getUserRole, getUserData } from '../lib/authService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { role, user, setUserData, setRole } = useAuth();

  useEffect(() => {
    if (user) {
      if (role === 'admin') {
        navigate('/dashboard/admin');
      } else if (role === 'client') {
        navigate('/dashboard/client');
      }
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await login(formData.email, formData.password);
      const userRole = await getUserRole(userCredential.uid);
      const userData = await getUserData(userCredential.uid);
      setRole(userRole);
      setUserData(userData);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/dashboard/admin');
      } else if (userRole === 'client') {
        navigate('/dashboard/client');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Link to="/" className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3">
              <img src="/logo/logo.png" alt="Car Gnee Logo" className="w-16 h-16 object-contain" />
            </div>
          </Link>
          <CardTitle className="text-3xl font-bold text-[#2d8b3f]">Welcome Back</CardTitle>
          <CardDescription>Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#2d8b3f] hover:bg-[#236b31]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#2d8b3f] font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
