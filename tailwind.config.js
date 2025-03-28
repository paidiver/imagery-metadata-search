/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react'

module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        container: {
            center: true
        },
        extend: {}
    },
    plugins: [heroui({
        themes: {
            light: {
                colors: {
                    primary: '#00b5ff',
                    secondary: '#e7e6e6',
                    success: '#5ed496',
                    warning: '#ffaf0a',
                    danger: {
                        foreground: '#ffffff',
                        DEFAULT: '#eb1f24'
                    }
                }
            }
        }
    })]
}
