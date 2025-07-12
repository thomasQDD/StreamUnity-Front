'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/layout/Header';
import { Bot, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
// import { User as UserType } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

export function AuthPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot' | 'verify'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const [verificationCode, setVerificationCode] = useState('');

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const showAlert = (type: Alert['type'], message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateEmail(formData.email)) {
      showAlert('error', 'Veuillez entrer une adresse email valide');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      showAlert('error', 'Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      showAlert('success', 'Connexion réussie !');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      showAlert('error', error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.name || formData.name.trim().length < 2) {
      showAlert('error', 'Le nom doit contenir au moins 2 caractères');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      showAlert('error', 'Veuillez entrer une adresse email valide');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      showAlert('error', 'Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert('error', 'Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      showAlert('success', 'Compte créé avec succès !');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      showAlert('error', error instanceof Error ? error.message : 'Erreur lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateEmail(formData.email)) {
      showAlert('error', 'Veuillez entrer une adresse email valide');
      setIsLoading(false);
      return;
    }

    try {
      // Simulation d'envoi d'email de récupération
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert('success', 'Email de récupération envoyé ! Vérifiez votre boîte de réception.');
    } catch {
      showAlert('error', 'Erreur lors de l&apos;envoi de l&apos;email. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!verificationCode || verificationCode.length !== 6) {
      showAlert('error', 'Veuillez entrer un code de vérification à 6 chiffres');
      setIsLoading(false);
      return;
    }

    try {
      // Simulation de vérification de compte
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert('success', 'Compte vérifié avec succès ! Vous pouvez maintenant vous connecter.');
      setActiveTab('signin');
    } catch {
      showAlert('error', 'Code de vérification invalide. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header variant="auth" showBackButton />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {alert && (
            <Alert className={`mb-6 ${
              alert.type === 'success' ? 'border-green-600 bg-green-600/10' : 
              alert.type === 'error' ? 'border-red-600 bg-red-600/10' : 
              'border-blue-600 bg-blue-600/10'
            }`}>
              {alert.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className={`h-4 w-4 ${alert.type === 'error' ? 'text-red-400' : 'text-blue-400'}`} />
              )}
              <AlertDescription className={
                alert.type === 'success' ? 'text-green-300' : 
                alert.type === 'error' ? 'text-red-300' : 'text-blue-300'
              }>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-600/20 rounded-full w-fit">
                <Bot className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-white text-2xl">Bienvenue sur StreamUnity</CardTitle>
              <CardDescription className="text-gray-300">
                Gérez votre compte pour accéder à toutes les fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600">
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600">
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Connexion */}
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSignin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-white">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </form>
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('forgot')}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                </TabsContent>

                {/* Inscription */}
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-white">Nom d&apos;utilisateur</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Votre nom"
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-white">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Création...' : 'Créer un compte'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Mot de passe oublié */}
                <TabsContent value="forgot" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white text-lg font-semibold">Mot de passe oublié</h3>
                    <p className="text-gray-400 text-sm">Entrez votre email pour recevoir un lien de récupération</p>
                  </div>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Envoi...' : 'Envoyer le lien'}
                    </Button>
                  </form>
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                </TabsContent>

                {/* Vérification */}
                <TabsContent value="verify" className="space-y-4 mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white text-lg font-semibold">Vérification du compte</h3>
                    <p className="text-gray-400 text-sm">Entrez le code à 6 chiffres reçu par email</p>
                  </div>
                  <form onSubmit={handleVerification} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verify-code" className="text-white">Code de vérification</Label>
                      <Input
                        id="verify-code"
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                        className="text-center bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400 text-2xl tracking-widest"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Vérification...' : 'Vérifier'}
                    </Button>
                  </form>
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}