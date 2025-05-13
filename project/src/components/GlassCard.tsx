import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  opacity?: 0.1 | 0.2 | 0.3;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  opacity = 0.2,
  hover = true,
  onClick
}) => {
  const { theme } = useTheme();
  
  const baseStyles = `
    relative
    rounded-xl
    backdrop-blur-lg
    transition-all
    duration-300
    border
    ${theme === 'dark' 
      ? `bg-gray-900/${Math.round(opacity * 100)} border-gray-700/30` 
      : `bg-white/${Math.round(opacity * 100)} border-white/30`}
    ${hover ? `
      hover:shadow-lg
      hover:scale-[1.02]
      hover:bg-opacity-${Math.round(opacity * 100 + 10)}
    ` : ''}
  `.trim();

  const beforeStyles = `
    before:absolute
    before:inset-0
    before:rounded-xl
    before:bg-gradient-to-br
    ${theme === 'dark'
      ? 'before:from-gray-700/20 before:to-gray-900/20'
      : 'before:from-white/20 before:to-transparent'}
    before:pointer-events-none
  `.trim();

  const afterStyles = `
    after:absolute
    after:inset-0
    after:rounded-xl
    after:bg-gradient-to-br
    ${theme === 'dark'
      ? 'after:from-gray-800/10 after:to-transparent'
      : 'after:from-white/10 after:to-transparent'}
    after:pointer-events-none
  `.trim();

  const shadowStyles = `
    shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
    dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
  `.trim();

  return (
    <div
      className={`
        ${baseStyles}
        ${beforeStyles}
        ${afterStyles}
        ${shadowStyles}
        ${className}
      `.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default GlassCard;