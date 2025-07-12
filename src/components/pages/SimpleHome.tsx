'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export function SimpleHome() {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
      title: "Chat Mutualisé",
      description: "Centralisez tous vos chats de streaming en un seul endroit"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "Multi-Plateforme",
      description: "Twitch, YouTube Live, TikTok, Facebook Gaming, Kick"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "Modération Avancée",
      description: "Outils de modération puissants pour gérer votre communauté"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Overlay Personnalisable",
      description: "Intégrez facilement le chat dans votre stream"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header variant="home" />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
            🚀 Nouveau Bot Multiplateforme
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Unifiez vos chats de streaming
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            StreamUnity centralise tous vos chats de streaming en un seul endroit. 
            Gérez votre communauté sur Twitch, YouTube, TikTok, Facebook Gaming et Kick simultanément.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 text-lg px-8">
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Fonctionnalités Principales</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Découvrez comment StreamUnity révolutionne la gestion de vos chats de streaming
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Tarifs Simples</h3>
            <p className="text-gray-300">Choisissez le plan qui convient à votre communauté</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gratuit</CardTitle>
                <CardDescription className="text-gray-300">Pour débuter</CardDescription>
                <div className="text-3xl font-bold text-white">0€<span className="text-lg font-normal">/mois</span></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  2 plateformes max
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Chat de base
                </div>
                <Button className="w-full mt-6 bg-gray-600 hover:bg-gray-700">
                  Commencer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}