import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BookOpen, 
  Code, 
  Trophy, 
  User, 
  ChevronRight,
  Zap,
  Rocket
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  preload?: boolean;
}

// Lightning-fast navigation with preloading
export const FastNavigation = memo(({ user, onSignOut }: { 
  user?: any; 
  onSignOut?: () => void; 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Dashboard',
      path: '/',
      icon: <Home className="h-4 w-4" />,
      preload: true
    },
    {
      id: 'learn',
      label: 'Learn',
      path: '/learn/python',
      icon: <BookOpen className="h-4 w-4" />,
      badge: 'HOT',
      preload: true
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/learn/python/project/1',
      icon: <Code className="h-4 w-4" />,
      preload: true
    },
    {
      id: 'achievements',
      label: 'Achievements',
      path: '/achievements',
      icon: <Trophy className="h-4 w-4" />
    }
  ];

  // Preload critical routes for instant navigation
  const preloadRoute = useCallback((path: string) => {
    if (!preloadedRoutes.has(path)) {
      // Create invisible link and trigger preload
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      document.head.appendChild(link);
      
      setPreloadedRoutes(prev => new Set(prev.add(path)));
      
      // Clean up after 10 seconds
      setTimeout(() => {
        document.head.removeChild(link);
      }, 10000);
    }
  }, [preloadedRoutes]);

  // Preload important routes on component mount
  useEffect(() => {
    navigationItems
      .filter(item => item.preload)
      .forEach(item => preloadRoute(item.path));
  }, [navigationItems, preloadRoute]);

  // Instant navigation with hover preloading
  const handleNavigation = useCallback((path: string) => {
    // Use replace for instant navigation feel
    navigate(path, { replace: false });
  }, [navigate]);

  const handleHover = useCallback((path: string) => {
    preloadRoute(path);
  }, [preloadRoute]);

  const isActiveRoute = useCallback((path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  }, [location.pathname]);

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with fast loading indicator */}
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              CodeCraft
            </span>
            <Badge variant="secondary" className="text-xs animate-bounce">
              <Zap className="h-3 w-3 mr-1" />
              FAST
            </Badge>
          </div>

          {/* Navigation items */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={isActiveRoute(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                onMouseEnter={() => handleHover(item.path)}
                className="flex items-center space-x-2 transition-all duration-150 hover:scale-105"
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs ml-1 animate-pulse">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="h-3 w-3 opacity-50" />
              </Button>
            ))}
          </div>

          {/* User menu with fast actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSignOut}
                  className="transition-all duration-150 hover:scale-105"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation('/auth')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-150 hover:scale-105"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

FastNavigation.displayName = 'FastNavigation';