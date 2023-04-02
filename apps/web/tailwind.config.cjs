/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,tsx}', './src/**/*.css'],
    plugins: [],
    theme: {
        columns: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '11': '11',
            '12': '12',
            'auto': 'auto',
            '3xs': '28.67vh',
            '2xs': '32.25vh',
            'xs': '35.83vh',
            'sm': '43.00vh',
            'md': '50.17vh',
            'lg': '57.33vh',
            'xl': '64.50vh',
            '2xl': '75.25vh',
            '3xl': '86.00vh',
            '4xl': '100.34vh',
            '5xl': '114.67vh',
            '6xl': '129.00vh',
            '7xl': '143.34vh'
        },
        spacing: {
            0: '0.00vh',
            1: '0.45vh',
            2: '0.90vh',
            3: '1.34vh',
            4: '1.79vh',
            5: '2.24vh',
            6: '2.69vh',
            7: '3.14vh',
            8: '3.58vh',
            9: '4.03vh',
            10: '4.48vh',
            11: '4.93vh',
            12: '5.38vh',
            14: '6.27vh',
            16: '7.17vh',
            20: '8.96vh',
            24: '10.75vh',
            28: '12.54vh',
            32: '14.33vh',
            36: '16.13vh',
            40: '17.92vh',
            44: '19.71vh',
            48: '21.50vh',
            52: '23.29vh',
            56: '25.08vh',
            60: '26.88vh',
            64: '28.67vh',
            72: '32.25vh',
            80: '35.83vh',
            96: '43.00vh',
            px: '0.11vh',
            0.5: '0.22vh',
            1.5: '0.67vh',
            2.5: '1.12vh',
            3.5: '1.57vh'
        },
        blur: {
            '0': '0',
            'none': '0',
            'sm': '0.45vh',
            'DEFAULT': '0.90vh',
            'md': '1.34vh',
            'lg': '1.79vh',
            'xl': '2.69vh',
            '2xl': '4.48vh',
            '3xl': '7.17vh'
        },
        borderRadius: {
            'none': '0.00vh',
            'sm': '0.22vh',
            'DEFAULT': '0.45vh',
            'md': '0.67vh',
            'lg': '0.90vh',
            'xl': '1.34vh',
            '2xl': '1.79vh',
            '3xl': '2.69vh',
            'full': '1119.71vh'
        },
        borderWidth: {
            0: '0.00vh',
            2: '0.22vh',
            4: '0.45vh',
            8: '0.90vh',
            DEFAULT: '0.11vh'
        },
        boxShadow: {
            'sm': '0 0.11vh 0.22vh 0 rgb(0 0 0 / 0.05)',
            'DEFAULT':
                '0 0.11vh 0.34vh 0 rgb(0 0 0 / 0.1), 0 0.11vh 0.22vh -0.11vh rgb(0 0 0 / 0.1)',
            'md': '0 0.45vh 0.67vh -0.11vh rgb(0 0 0 / 0.1), 0 0.22vh 0.45vh -0.22vh rgb(0 0 0 / 0.1)',
            'lg': '0 1.12vh 1.68vh -0.34vh rgb(0 0 0 / 0.1), 0 0.45vh 0.67vh -0.45vh rgb(0 0 0 / 0.1)',
            'xl': '0 2.24vh 2.80vh -0.56vh rgb(0 0 0 / 0.1), 0 0.90vh 1.12vh -0.67vh rgb(0 0 0 / 0.1)',
            '2xl': '0 2.80vh 5.60vh -1.34vh rgb(0 0 0 / 0.25)',
            'inner': 'inset 0 0.22vh 0.45vh 0 rgb(0 0 0 / 0.05)',
            'none': 'none'
        },
        dropShadow: {
            'sm': '0 0.11vh 0.11vh rgb(0 0 0 / 0.05)',
            'DEFAULT': [
                '0 0.11vh 0.22vh rgb(0 0 0 / 0.1)',
                '0 0.11vh 0.11vh rgb(0 0 0 / 0.06)'
            ],
            'md': [
                '0 0.45vh 0.34vh rgb(0 0 0 / 0.07)',
                '0 0.22vh 0.22vh rgb(0 0 0 / 0.06)'
            ],
            'lg': [
                '0 1.12vh 0.90vh rgb(0 0 0 / 0.04)',
                '0 0.45vh 0.34vh rgb(0 0 0 / 0.1)'
            ],
            'xl': [
                '0 2.24vh 1.46vh rgb(0 0 0 / 0.03)',
                '0 0.90vh 0.56vh rgb(0 0 0 / 0.08)'
            ],
            '2xl': '0 2.80vh 2.80vh rgb(0 0 0 / 0.15)',
            'none': '0 0 #0000'
        },
        fontSize: {
            'xs': ['1.34vh', { lineHeight: '1.79vh' }],
            'sm': ['1.57vh', { lineHeight: '2.24vh' }],
            'base': ['1.79vh', { lineHeight: '2.69vh' }],
            'lg': ['2.02vh', { lineHeight: '3.14vh' }],
            'xl': ['2.24vh', { lineHeight: '3.14vh' }],
            '2xl': ['2.69vh', { lineHeight: '3.58vh' }],
            '3xl': ['3.36vh', { lineHeight: '4.03vh' }],
            '4xl': ['4.03vh', { lineHeight: '4.48vh' }],
            '5xl': ['5.38vh', { lineHeight: '1' }],
            '6xl': ['6.72vh', { lineHeight: '1' }],
            '7xl': ['8.06vh', { lineHeight: '1' }],
            '8xl': ['10.75vh', { lineHeight: '1' }],
            '9xl': ['14.33vh', { lineHeight: '1' }]
        }
    }
}
