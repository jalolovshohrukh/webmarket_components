# Webmarket Components

A reusable, accessible, responsive React component kit. **119 components**, designed to be **owned by your codebase** — copy, paste, modify. No runtime library, no opinionated abstractions to fight.

Built with **React 18 + Vite + TypeScript + Tailwind v3 + Radix UI primitives**, themed via HSL CSS variable tokens (light + dark mode). Mobile-audited at 375px — zero horizontal overflow on any page.

## What's in it

| Section | Components |
|---|---|
| **Forms** | Button · Input · FloatingInput · Textarea · Select · Label · Checkbox · RadioGroup · Switch · Slider · NumberInput · QuantityStepper · ToggleGroup · ColorSwatch · SizeSelector · SearchBar · SearchWithSuggestions · Autocomplete · PhoneInput · OtpInput |
| **Display** | Card · Badge · Tag · Avatar · Rating · Price · Breadcrumb · Pagination · Accordion · Separator · Timeline · Skeleton · Spinner · EmptyState |
| **Overlays** | Dialog · Sheet · Popover · Toast · DropdownMenu · Tabs · Tooltip · QuickView · CartDrawer |
| **Layout** | SiteHeader · SiteFooter · MainNav · SideNav · MegaMenu · MobileNavBar · HeroBanner |
| **Product** | ProductCard · ProductCardList · ProductGrid · ProductGallery · VariantPicker · StockBadge · DeliveryCard · SellerCard · ReviewsBlock · ReviewForm · QABlock · FrequentlyBought · ComparisonTable · SpecTable · FilterSidebar |
| **Marketplace** | CategoryTileGrid · PromoBanner · ProductStrip · SortDropdown · ViewToggle · ActiveFiltersBar |
| **Cart** | CartLineItem · EmptyCart · CouponInput · OrderSummary |
| **Checkout** | CheckoutStepper · AddressCard · DeliveryMethodPicker · PaymentMethodPicker · OrderConfirmation |
| **Account** | AccountDropdown · NotificationBell · OrderHistoryRow · OrderTracking · AddressBook · LoyaltyCard · WishlistGrid |
| **Auth** | SignInForm · SignUpForm · OtpForm · ForgotPasswordForm |
| **Charts** | LineChart · AreaChart · BarChart · HorizontalBarChart · StackedBarChart · PieChart · DonutChart · RadialChart · ScatterChart · FunnelChart · RadarChart · Sparkline · Gauge · Heatmap · ActivityHeatmap |
| **Admin** | KpiCard · StatCard · MetricTrendCard · PeriodToggle · DateRangePicker · DashboardGrid · LeaderboardTable |
| **Brand** | Logo · Flag · LanguageSwitcher |

The Introduction page is a full-bleed bento showcase composed from real components.

## Run the docs site locally

```bash
git clone https://github.com/jalolovshohrukh/webmarket_components.git
cd webmarket_components
npm install
npm run dev
```

Open <http://localhost:5173>. Every component has a doc page in the sidebar with a live preview and code example.

## How to use a component in your project

It's "copy, paste, modify". Pick a component file from `src/components/`, drop it into your project, then bring along the things it depends on:

1. **The `cn` helper** — `src/lib/utils.ts` (5 lines, `clsx` + `tailwind-merge`). Every component uses it.
2. **The design tokens** — the `colors` block in `tailwind.config.ts` plus the CSS variables in `src/index.css`. Components reference semantic tokens like `bg-card`, `text-text-primary`, `border-border`, `--chart-1..8` — either copy the tokens or remap them to your project's palette.
3. **The peer dependencies** for any Radix / chart primitive the component pulls from. Open the file, look at the imports, install the matching `@radix-ui/react-*` package or the chart lib (`recharts`, `react-day-picker`, `embla-carousel-react`, etc.).

That's it. Each file is self-contained: forwardRef, named exports, JSDoc-free, no global side effects.

## Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind v3** — HSL CSS variable tokens with dark-mode flip via `.dark` class
- **Radix UI** primitives — accessibility, focus traps, ARIA, keyboard nav baked in
- **class-variance-authority** for component variants
- **lucide-react** for icons
- **Recharts** for charts (15 chart primitives)
- **react-day-picker** + **date-fns** for the date range picker
- **embla-carousel-react** for carousels
- **clsx** + **tailwind-merge** for class composition

## Theme

- Brand orange `#fe6a00` is `--primary` and `--chart-1`
- 8-step chart palette (`--chart-1` through `--chart-8`) — orange / sky / emerald / violet / amber / rose / cyan / lime
- Every chart and component uses these tokens via `hsl(var(--chart-1))` etc., so dark mode and rebranding are configuration-only

## SEO

There's a headless `<Seo />` helper at [src/components/seo/seo.tsx](src/components/seo/seo.tsx) that imperatively syncs `document.title`, `meta[name=description]`, canonical URL, Open Graph tags, Twitter cards, robots, and JSON-LD as props change — drop one near the root of every route. Typed builders ship for `productJsonLd`, `breadcrumbJsonLd`, and `organizationJsonLd`.

```tsx
<Seo
  title={product.title}
  titleTemplate="Webmarket"
  description={product.description}
  canonical={`https://webmarket.tj/product/${product.id}`}
  image={product.imageUrl}
  type="product"
  jsonLd={productJsonLd({ name: product.title, price: 249, priceCurrency: "USD", availability: "InStock" })}
/>
```

This is a runtime DOM patch — perfect for SPA navigation and crawlers that execute JS (Googlebot does). For full crawler coverage, also pre-render or SSR your routes (Vite SSG, Next.js, Astro). Static fallbacks live in `index.html` so the unrendered first byte still has sane meta.

## License

[MIT](LICENSE) — copy, fork, ship. No attribution required, no warranty given.
