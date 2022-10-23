module.exports = {
    mode: 'jit',
    content: [`./**/*.liquid`, `scripts/dev/**/*.js`],
    theme: {
        container: {
            center: true,
            padding: '1.2rem',
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1240px',
                '2xl': '1200px'
            }
        },
        extend: {
            fontFamily: {
                base: ['Archivo', 'sans-serif'],
                title: ['Archivo', 'sans-serif']
            },
            fontSize: {
                64: '64px',
                42: '42px',
                40: '40px',
                32: '32px',
                28: '28px',
                24: '24px',
                22: '22px',
                20: '20px',
                18: '18px',
                16: '16px',
                14: '14px',
                13: '13px',
                12: '12px',
                10: '10px'
            },
            colors: {
                base: '#1C1C1E',
                primary: '#D32316',
                secondary: '#344956 ',
                dark: '#1B1B1B',
                error: '#b22222',
                light: '#6a6a6a ',
                lighten: '#aaa '
            },
            boxShadow: {
                primary: '2px 2px 0px 0px',
                box: '4px 8px 18px rgba(185, 185, 185, 0.2)',
                icon: '0px 4px 37px rgba(0, 0, 0, 0.05)'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            },
            animation: {
                float: 'float 4s ease-in-out infinite'
            }
        }
    },
    plugins: []
};
