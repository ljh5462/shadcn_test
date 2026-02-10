const config = {
  // 1. Tailwind를 적용할 파일 경로 설정
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  darkMode: ['class'],
  theme: {
    // 2. 테마 확장 (기존 설정을 유지하며 추가)
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          DEFAULT: '#0fa9e6',
          dark: '#0c87b8'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },

  // 3. 외부 플러그인 추가 (Typography, Forms 등)
  plugins: []
}

export default config
