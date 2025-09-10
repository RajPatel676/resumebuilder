const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./client/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#1A1A1A", // Dark background
        foreground: "#E1E1E1", // Light text
        primary: {
          DEFAULT: "#D4AF37", // Gold
          50: "#FDF8E1",
          100: "#FCF1C3",
          200: "#F9E487",
          300: "#F6D64B",
          400: "#F3C810",
          500: "#D4AF37",
          600: "#B8941F",
          700: "#9C7A1A",
          800: "#7D5F14",
          900: "#5E450F",
          foreground: "#1A1A1A",
        },
        secondary: {
          DEFAULT: "#2A2A2A", // Dark Gray
          50: "#F7F7F7",
          100: "#E1E1E1",
          200: "#CFCFCF",
          300: "#B1B1B1",
          400: "#9E9E9E",
          500: "#7E7E7E",
          600: "#626262",
          700: "#515151",
          800: "#3B3B3B",
          900: "#2A2A2A",
          foreground: "#E1E1E1",
        },
        accent: {
          DEFAULT: "#34A853", // Green
          50: "#E6F4EA",
          100: "#CEEAD6",
          200: "#A8DAB5",
          300: "#81C995",
          400: "#5BB974",
          500: "#34A853",
          600: "#1E8E3E",
          700: "#137333",
          800: "#0D652D",
          900: "#0B5D2C",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EA4335", // Red
          50: "#FCE8E6",
          100: "#F9D0CC",
          200: "#F2A299",
          300: "#EA7367",
          400: "#EA4335",
          500: "#D33B2C",
          600: "#B52D20",
          700: "#981E17",
          800: "#7A1712",
          900: "#5D110E",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#3B3B3B",
          foreground: "#9E9E9E",
        },
        popover: {
          DEFAULT: "#2A2A2A",
          foreground: "#E1E1E1",
        },
        card: {
          DEFAULT: "#2A2A2A",
          foreground: "#E1E1E1",
        },
        // Score colors
        score: {
          excellent: "#34A853", // Green 70+
          good: "#FBBC04", // Orange 40-70
          poor: "#EA4335", // Red <40
        },
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        'google': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'google-lg': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
