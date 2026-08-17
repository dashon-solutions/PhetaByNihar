import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  showArrow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-95 group cursor-pointer';
  
  const variants = {
    primary: 'bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#8A2B24]',
    secondary: 'bg-white text-[#4D2D22] border-2 border-[#D7A65B] hover:bg-[#6E1E18] hover:text-[#F3D18A] hover:border-[#6E1E18] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    gold: 'bg-[#D7A65B] text-[#4D2D22] hover:bg-[#C48B3C] hover:text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#C48B3C]',
    outline: 'border-2 border-[#D7A65B]/70 bg-transparent text-[#FFFDFB] hover:bg-[#D7A65B] hover:text-[#4D2D22] shadow-sm hover:-translate-y-0.5'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
      )}
    </button>
  );
};

