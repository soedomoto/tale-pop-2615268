import { Home, Settings, User } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DockNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { name: "Home", icon: Home, path: '/' },
    { name: "Account", icon: User, path: "/account" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Portrait - Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="bg-white/90 backdrop-blur-lg rounded-full shadow-2xl border border-white/20 px-6 py-3">
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`p-3 rounded-full transition-all duration-300 ${isActive(item.path)
                    ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg scale-110'
                    : 'text-purple-600 hover:bg-purple-100 hover:scale-105'
                  }`}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop/Tablet - Side Dock */}
      <div className="hidden md:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4">
          <div className="flex flex-col space-y-4">
            {/* Logo */}
            <div className="mb-2">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b10811e36_talepopicon.png"
                alt="Tale Pop"
                className="w-12 h-12 rounded-full"
              />
            </div>

            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`p-3 flex justify-center rounded-xl transition-all duration-300 group relative ${isActive(item.path)
                    ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg'
                    : 'text-purple-600 hover:bg-purple-100'
                  }`}
              >
                <item.icon className="w-6 h-6" />
                {/* <span className="absolute left-full px-2 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </span> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full shadow-2xl opacity-80">
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full">
            <div className="absolute top-2 left-3 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-3 right-4 w-1 h-1 bg-orange-400 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Floating Clouds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 -left-20 w-40 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-64 right-10 w-60 h-30 bg-white/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-24 bg-white/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pb-24 md:pb-8 md:pl-24">
        <Outlet />
      </div>

      {/* Navigation Dock */}
      <DockNavigation />
    </div>
  );
}