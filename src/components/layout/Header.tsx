'use client';

import { Bot, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import Link from 'next/link';
interface HeaderProps {
  variant?: 'home' | 'auth' | 'dashboard';
  user?: User;
  onLogout?: () => void;
  showBackButton?: boolean;
}

export function Header({ variant = 'home', user, onLogout, showBackButton }: HeaderProps) {

  const renderHomeHeader = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Bot className="h-8 w-8 text-purple-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          StreamUnity
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-purple-400">
          Fonctionnalités
        </Button>
        <Button variant="ghost" className="text-white hover:text-purple-400">
          Tarifs
        </Button>
        <Link href="/auth">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Connexion
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderAuthHeader = () => (
    <div className="flex items-center justify-between">
      <Link 
        href="/"
        className="flex items-center space-x-3 text-white hover:text-purple-400 transition-colors"
      >
        {showBackButton && <ArrowLeft className="h-5 w-5" />}
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            StreamUnity
          </span>
        </div>
      </Link>
    </div>
  );

  const renderDashboardHeader = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Bot className="h-8 w-8 text-purple-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          StreamUnity
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white">Bonjour, {user?.name}</span>
        <Button 
          onClick={onLogout}
          variant="ghost" 
          className="text-white hover:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'home':
        return renderHomeHeader();
      case 'auth':
        return renderAuthHeader();
      case 'dashboard':
        return renderDashboardHeader();
      default:
        return renderHomeHeader();
    }
  };

  return (
    <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        {renderContent()}
      </div>
    </header>
  );
}