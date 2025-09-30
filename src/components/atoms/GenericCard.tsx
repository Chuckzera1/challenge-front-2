import { Paper, Badge } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ReactNode } from 'react';

export interface CardAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export interface GenericCardProps {
  // Header
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    color: string;
  };
  
  // Content
  children: ReactNode;
  
  // Actions
  actions?: CardAction[];
  
  // Footer
  footerText?: string;
}

export function GenericCard({ 
  icon, 
  iconBgColor, 
  iconColor, 
  title, 
  subtitle, 
  badge,
  children, 
  actions = [],
  footerText 
}: GenericCardProps) {
  return (
    <Paper shadow='xl' p='md' className='min-h-72'>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${iconBgColor}`}>
            <div className={`h-6 w-6 ${iconColor}`}>
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
            {badge && (
              <div className="flex items-center space-x-2 mt-1">
                <Badge color={badge.color} size="sm">
                  {badge.text}
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        {actions.length > 0 && (
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`p-2 rounded-lg transition-colors ${action.className || 'text-blue-600 hover:bg-blue-50'}`}
                title={action.label}
              >
                <div className="h-4 w-4">
                  {action.icon}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        {children}
      </div>
      
      {footerText && (
        <div className="mt-3">
          <span className="text-sm text-gray-500">{footerText}</span>
        </div>
      )}
    </Paper>
  );
}
