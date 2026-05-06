import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn-style HSL tokens
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
        },

        // Brand-namespaced (raw hex from Figma)
        brand: {
          DEFAULT: "var(--brand-primary)",
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          tertiary: "var(--brand-tertiary)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          700: "var(--brand-700)",
        },
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          muted: "var(--text-muted)",
        },
        success: {
          DEFAULT: "var(--success-500)",
          50: "var(--success-50)",
          100: "var(--success-100)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          700: "var(--success-700)",
        },
        "success-bg": "var(--success-50)",
        danger: {
          DEFAULT: "var(--danger-500)",
          50: "var(--danger-50)",
          100: "var(--danger-100)",
          500: "var(--danger-500)",
          600: "var(--danger-600)",
          700: "var(--danger-700)",
        },
        "danger-bg": "var(--danger-50)",
        warning: {
          DEFAULT: "var(--warning-500)",
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
        },
        info: {
          DEFAULT: "var(--info-500)",
          50: "var(--info-50)",
          100: "var(--info-100)",
          500: "var(--info-500)",
          600: "var(--info-600)",
          700: "var(--info-700)",
        },
        violet: {
          DEFAULT: "var(--violet-500)",
          50: "var(--violet-50)",
          100: "var(--violet-100)",
          500: "var(--violet-500)",
          600: "var(--violet-600)",
          700: "var(--violet-700)",
        },
        // Chart palette — themed via HSL CSS vars so dark mode flips automatically.
        chart: {
          1: "hsl(var(--chart-1) / <alpha-value>)",
          2: "hsl(var(--chart-2) / <alpha-value>)",
          3: "hsl(var(--chart-3) / <alpha-value>)",
          4: "hsl(var(--chart-4) / <alpha-value>)",
          5: "hsl(var(--chart-5) / <alpha-value>)",
          6: "hsl(var(--chart-6) / <alpha-value>)",
          7: "hsl(var(--chart-7) / <alpha-value>)",
          8: "hsl(var(--chart-8) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: ["40px", { lineHeight: "48px", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "40px", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h4: ["18px", { lineHeight: "24px", fontWeight: "500" }],
        h5: ["16px", { lineHeight: "24px", fontWeight: "500" }],
        h6: ["14px", { lineHeight: "20px", fontWeight: "600" }],
        p1: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        l1: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
