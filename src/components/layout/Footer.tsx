import { Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-purple-800/30 bg-black/40 py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Bot className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            StreamUnity
          </span>
        </div>
        <p className="text-gray-400 mb-4">
          Unifiez vos chats de streaming - Simplifiez votre expérience de streaming
        </p>
        <div className="flex justify-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-purple-400 transition-colors">À propos</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Conditions</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}