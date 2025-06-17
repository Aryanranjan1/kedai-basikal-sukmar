// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you still have pages router stuff (safe to include)
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Crucial for your components
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',       // Crucial for App Router pages and layouts
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // Corrected: Use '--font-outfit' which you defined for the Outfit font
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        primary: '#124970',
      },
    },
  },
  plugins: [],
};

export default config;