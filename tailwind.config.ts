import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
         bio: {
          primary: '#0B9E93',   // verde-teal principal
          secondary: '#107C10', // verde oscuro secundario
          accent: '#6C5CE7',    // morado/acento (para detalles)
          background: '#076E68', // fondo suave verdoso
         },
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // aquí defines la fuente
        inter: ['Inter', 'sans-serif'], // y también Inter por si la usas
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
