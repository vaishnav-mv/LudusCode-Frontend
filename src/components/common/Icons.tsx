import React from 'react';

/**
 * Reusable Icon Components
 * SVG icons used throughout the application
 */


export type IconName =
  | 'dashboard'
  | 'code'
  | 'swords'
  | 'users'
  | 'list'
  | 'shield-check'
  | 'arrow-left'
  | 'terminal'
  | 'target'
  | 'light-bulb'
  | 'check'
  | 'x'
  | 'chevron-down'
  | 'search'
  | 'send'
  | 'alert-triangle'
  | 'plus'
  | 'minus'
  | 'user'
  | 'calendar'
  | 'clock'
  | 'trophy'
  | 'dollar-sign'
  | 'list-checks'
  | 'trending-up'
  | 'trending-down'
  | 'credit-card'
  | 'log-out'
  | 'google'
  | 'github'
  | 'award';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const ICONS: Record<IconName, React.ReactNode> = {
  dashboard: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  swords: <path d="M14.5 3L12 5.5 9.5 3 3 9.5 5.5 12 3 14.5 9.5 21l2.5-2.5L14.5 21l6.5-6.5L18.5 12l2.5-2.5L14.5 3zM3 3l18 18" />,
  users: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm12 14a4 4 0 100-8 4 4 0 000 8zM21 21v-2a4 4 0 00-3-3.87" />,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  'shield-check': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
  'arrow-left': <path d="M19 12H5m7 7l-7-7 7-7" />,
  terminal: <path d="M4 17l6-6-6-6m8 14h8" />,
  target: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 15a3 3 0 100-6 3 3 0 000 6zM12 2a10 10 0 100 20 10 10 0 000-20z" />,
  'light-bulb': <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19a7 7 0 00-5.46 11.64A5 5 0 009 20h6a5 5 0 002.46-9.36A7 7 0 0012 2z" />,
  check: <path d="M20 6L9 17l-5-5" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  search: <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />,
  send: <path d="M22 2L11 13 2 9l-2 2 7 5 5 7 2-2 4-9V2z" />,
  'alert-triangle': <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01" />,
  plus: <path d="M12 5v14m-7-7h14" />,
  minus: <path d="M5 12h14" />,
  user: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z" />,
  calendar: <path d="M8 2v4m8-4v4M3 10h18M5 6a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" />,
  clock: <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" />,
  trophy: <path d="M6 9H4.5a2.5 2.5 0 010-5H6m12 5h1.5a2.5 2.5 0 000-5H18M9 12l3 3 3-3m-3 3V3m6 9V3M6 9a3 3 0 013-3h6a3 3 0 013 3v5a6 6 0 01-12 0V9z" />,
  'dollar-sign': <path d="M12 1v22m-4-10.5a4 4 0 010-7h8a4 4 0 000 7h-8a4 4 0 000 7h8a4 4 0 010-7H8" />,
  'list-checks': <path d="M10 17l-3-3 1.4-1.4 1.6 1.6 3.6-3.6L15 12l-5 5zM3 17V7h4v10H3zm18-1-3-3 1.4-1.4 1.6 1.6 3.6-3.6L21 12l-5 5zM3 7V5h4v2H3zm10 0V5h4v2h-4z" />,
  'trending-up': <path d="M23 6l-9.5 9.5-5-5L1 18" />,
  'trending-down': <path d="M23 18l-9.5-9.5-5 5L1 6" />,
  'credit-card': <path d="M22 10v10H2V10M2 6h20v2H2z" />,
  'log-out': <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />,
  google: <path d="M21.35 11.1h-9.35v2.8h5.3c-.2 1.9-1.5 3.3-3.4 3.3-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7c1.1 0 1.8.5 2.2 1l2.1-2.1c-1.3-1.2-3-2-5.3-2-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5 0-1-.1-1.4z" />,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.3-3.2.1-.3.5-1.5-.1-3.2 0 0-1.1-.3-3.5 1.3-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4C2.5 2.5 1.4 2.8 1.4 2.8c-.6 1.7-.2 2.9-.1 3.2-.8.8-1.3 1.9-1.3 3.2 0 4.7 2.7 5.8 5.5 6.1-.6.5-.9 1.4-.9 2.8v4.2" />,
  award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"/></>,
};

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {ICONS[name]}
  </svg>
);





export const HomeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
    />
  </svg>
);

export const GroupsIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
    />
  </svg>
);

export const UsersIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
    />
  </svg>
);

export const LogoutIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
    />
  </svg>
);

export const PlusIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 4v16m8-8H4" 
    />
  </svg>
);

export const ChartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
    />
  </svg>
);

export const SettingsIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
);
