'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, Users, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Client-side redirect for unauthorized users
  if (typeof window !== 'undefined' && !user) {
    router.push('/auth');
    return null;
  }

  // Show loading or minimal content during SSR
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header variant="dashboard" user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Gérez votre streaming multi-plateforme</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              <Settings className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="chat-settings" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="moderation" className="data-[state=active]:bg-purple-600">
              <Shield className="h-4 w-4 mr-2" />
              Modération
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Plateformes connectées</CardTitle>
                  <CardDescription className="text-gray-300">
                    Vos comptes de streaming
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">0/5</div>
                  <p className="text-gray-400 text-sm mt-2">Connectez vos plateformes pour commencer</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Messages aujourd&apos;hui</CardTitle>
                  <CardDescription className="text-gray-300">
                    Chat unifié
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">0</div>
                  <p className="text-gray-400 text-sm mt-2">Aucun message reçu</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Modération</CardTitle>
                  <CardDescription className="text-gray-300">
                    Messages filtrés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">0</div>
                  <p className="text-gray-400 text-sm mt-2">Aucune action requise</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Informations du profil</CardTitle>
                <CardDescription className="text-gray-300">
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white font-medium">Nom: {user.name}</p>
                </div>
                <div>
                  <p className="text-white font-medium">Email: {user.email}</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Modifier le profil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat-settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Paramètres du chat</CardTitle>
                <CardDescription className="text-gray-300">
                  Configurez votre overlay de chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Configuration du chat à venir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Outils de modération</CardTitle>
                <CardDescription className="text-gray-300">
                  Gérez la modération de votre chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Outils de modération à venir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}