import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { desert:'#E3CFA8', pearl:'#EFE0C5', gold:'#C69A3D', oldgold:'#9B7429', onyx:'#5B421E', coffee:'#3A241A', rose:'#7D3D32' },
    fontFamily: { serif:['var(--font-serif)'], sans:['var(--font-sans)'] },
    boxShadow: { 'gold':'0 18px 60px rgba(198,154,61,.18)' }
  }}, plugins: []
};
export default config;
