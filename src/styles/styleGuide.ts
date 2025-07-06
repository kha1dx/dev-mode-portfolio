export const styleGuide = {
  colors: {
    // Primary Colors
    primary: {
      black: '#000000',
      white: '#FFFFFF',
      blue: '#0041BE',
      gray: {
        light: '#9F9F9F',
        medium: '#585858',
        dark: '#1C1C1C',
        darker: '#2E2E2E',
      }
    },
    
    // Accent Colors
    accent: {
      orange: '#FFB000',
      orangeLight: '#FF5D20',
      orangeDark: '#FFA620',
      green: '#00FF66',
      red: '#FF0024',
      pink: '#FF589C',
      purple: '#5B6CFF',
      purpleLight: '#2D2A8C',
      teal: '#D6FFEE',
      yellow: '#F4EB97',
      coral: '#3A3C68',
    },
    
    // Neutral Tones
    neutral: {
      lightGray: '#2E2E2E',
      mediumGray: '#585858',
      darkGray: '#9F9F9F',
    }
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #000000 0%, #2D2A8C 50%, #FFB000 100%)',
    hero: 'linear-gradient(135deg, #000000 0%, #1C1C1C 25%, #2D2A8C 75%, #FFB000 100%)',
    card: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(45,42,140,0.3) 100%)',
    accent: 'linear-gradient(45deg, #FF589C 0%, #5B6CFF 100%)',
  },
  
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(91, 108, 255, 0.3)',
  }
};

export const getColorClasses = () => ({
  // Background Classes
  bgPrimary: 'bg-black',
  bgSecondary: 'bg-[#1C1C1C]',
  bgAccent: 'bg-[#2D2A8C]',
  bgCard: 'bg-gradient-to-br from-black/80 to-[#2D2A8C]/30',
  
  // Text Classes
  textPrimary: 'text-white',
  textSecondary: 'text-[#9F9F9F]',
  textAccent: 'text-[#FFB000]',
  textBlue: 'text-[#0041BE]',
  textPink: 'text-[#FF589C]',
  textPurple: 'text-[#5B6CFF]',
  
  // Gradient Classes
  gradientHero: 'bg-gradient-to-br from-black via-[#2D2A8C]/30 to-[#FFB000]/20',
  gradientCard: 'bg-gradient-to-br from-black/80 to-[#2D2A8C]/30',
  gradientAccent: 'bg-gradient-to-r from-[#FF589C] to-[#5B6CFF]',
  gradientText: 'bg-gradient-to-r from-[#FFB000] to-[#5B6CFF] bg-clip-text text-transparent',
  
  // Border Classes
  borderAccent: 'border-[#2D2A8C]',
  borderOrange: 'border-[#FFB000]',
  borderGray: 'border-[#585858]',
});
