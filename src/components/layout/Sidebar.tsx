import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Gavel, 
  Shield, 
  History,
  Trophy,
  Search,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Tenders',
    href: '/tenders',
    icon: FileText,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Create Tender',
    href: '/create-tender',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'My Bids',
    href: '/my-bids',
    icon: Gavel,
    roles: ['bidder']
  },
  {
    title: 'Evaluation',
    href: '/evaluation',
    icon: Users,
    roles: ['evaluator']
  },
  {
    title: 'Awards',
    href: '/awards',
    icon: Trophy,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Verification',
    href: '/verification',
    icon: Shield,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Audit Trail',
    href: '/audit',
    icon: History,
    roles: ['admin', 'evaluator']
  },
  {
    title: 'Search',
    href: '/search',
    icon: Search,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    roles: ['admin', 'bidder', 'evaluator']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'bidder', 'evaluator']
  }
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card">
      <div className="space-y-4 py-6">
        <div className="px-6">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
        </div>
        <nav className="space-y-1 px-3">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}