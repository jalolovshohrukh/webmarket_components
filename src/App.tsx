import * as React from "react";
import {
  ArrowLeft,
  ArrowUp,
  AtSign,
  BadgeCheck,
  Check,
  ChevronRight,
  Github,
  Heart,
  Home,
  Info,
  LayoutGrid,
  Menu,
  Mic,
  Moon,
  MoreHorizontal,
  Package,
  PackageOpen,
  Paperclip,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Tag as TagIcon,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingInput } from "@/components/ui/floating-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FormFieldSkeleton,
  ListItemSkeleton,
  Skeleton,
  SkeletonAvatar,
  SkeletonHeading,
  SkeletonImage,
  SkeletonText,
  TableRowSkeleton,
} from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSkeleton,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckboxField } from "@/components/ui/checkbox";
import { RadioField, RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { QuickTooltip } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrent,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SmartPagination } from "@/components/ui/pagination";
import { Rating } from "@/components/ui/rating";
import { DiscountBadge, Price } from "@/components/ui/price";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectField, SelectItem } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import { Flag, type FlagCode } from "@/components/brand/flag";
import { Logo } from "@/components/brand/logo";
import { IconSpinner } from "@/components/forms/icon-spinner";
import { PhoneInput } from "@/components/forms/phone-input";
import { SearchBar } from "@/components/forms/search-bar";
import { Autocomplete } from "@/components/forms/autocomplete";
import { QuantityStepper } from "@/components/forms/quantity-stepper";
import { Switch, SwitchField } from "@/components/ui/switch";
import { NumberInput } from "@/components/ui/number-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ColorSwatchGroup } from "@/components/ui/color-swatch";
import { SizeSelector } from "@/components/ui/size-selector";
import { Timeline } from "@/components/ui/timeline";
import { Tag } from "@/components/ui/tag";
import { OtpInput } from "@/components/ui/otp-input";
import { SortDropdown, defaultSortOptions } from "@/components/marketplace/sort-dropdown";
import { ViewToggle } from "@/components/marketplace/view-toggle";
import { CategoryTileGrid } from "@/components/marketplace/category-tile-grid";
import { PromoBanner } from "@/components/marketplace/promo-banner";
import { ProductStrip } from "@/components/marketplace/product-strip";
import { ActiveFiltersBar } from "@/components/marketplace/active-filters-bar";
import { SearchWithSuggestions } from "@/components/marketplace/search-with-suggestions";
import { ProductCardList } from "@/components/product/product-card-list";
import { VariantPicker } from "@/components/product/variant-picker";
import { StockBadge } from "@/components/product/stock-badge";
import { DeliveryCard } from "@/components/product/delivery-card";
import { SellerCard } from "@/components/product/seller-card";
import { ReviewsBlock } from "@/components/product/reviews-block";
import { ReviewForm } from "@/components/product/review-form";
import { QABlock } from "@/components/product/qa-block";
import { FrequentlyBought } from "@/components/product/frequently-bought";
import { ComparisonTable } from "@/components/product/comparison-table";
import { SpecTable } from "@/components/product/spec-table";
import { CartLineItemRow } from "@/components/cart/cart-line-item";
import { EmptyCart } from "@/components/cart/empty-cart";
import { CouponInput } from "@/components/cart/coupon-input";
import { OrderSummary } from "@/components/cart/order-summary";
import { AddressCard } from "@/components/checkout/address-card";
import { DeliveryMethodPicker } from "@/components/checkout/delivery-method-picker";
import { PaymentMethodPicker } from "@/components/checkout/payment-method-picker";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { OrderHistoryRow } from "@/components/account/order-history-row";
import { OrderTracking } from "@/components/account/order-tracking";
import { AddressBook } from "@/components/account/address-book";
import { LoyaltyCard } from "@/components/account/loyalty-card";
import { NotificationBell } from "@/components/account/notification-bell";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { WishlistGrid } from "@/components/account/wishlist-grid";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OtpForm } from "@/components/auth/otp-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LineChart } from "@/components/charts/line-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart";
import { StackedBarChart } from "@/components/charts/stacked-bar-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { RadialChart } from "@/components/charts/radial-chart";
import { ScatterChart } from "@/components/charts/scatter-chart";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { RadarChart } from "@/components/charts/radar-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { Gauge } from "@/components/charts/gauge";
import { Heatmap } from "@/components/charts/heatmap";
import { ActivityHeatmap } from "@/components/charts/activity-heatmap";
import { KpiCard } from "@/components/admin/kpi-card";
import { StatCard } from "@/components/admin/stat-card";
import { MetricTrendCard } from "@/components/admin/metric-trend-card";
import { PeriodToggle, type Period } from "@/components/admin/period-toggle";
import { DateRangePicker } from "@/components/admin/date-range-picker";
import {
  DashboardGrid,
  DashboardItem,
  DashboardSection,
} from "@/components/admin/dashboard-grid";
import { LeaderboardTable } from "@/components/admin/leaderboard-table";
import {
  CommandPalette,
  useCommandPaletteHotkey,
  type CommandItem,
} from "@/components/ui/command-palette";
import { MobileNavBar } from "@/components/layout/mobile-nav-bar";
import { Seo, breadcrumbJsonLd } from "@/components/seo/seo";
import {
  Heart as HeartIcon,
  Home as HomeIcon,
  Repeat,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
} from "lucide-react";
import {
  DollarSign,
  ShoppingBag as ShoppingBagIcon,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SideNav } from "@/components/layout/side-nav";
import { MainNav } from "@/components/layout/main-nav";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/product/product-card";
import {
  ProductGrid,
  ProductGridSkeleton,
} from "@/components/product/product-grid";
import {
  ProductGallery,
  ProductGallerySkeleton,
} from "@/components/product/product-gallery";
import { FilterSidebar } from "@/components/product/filter-sidebar";
import { CartDrawer } from "@/components/product/cart-drawer";
import { QuickView } from "@/components/product/quick-view";
import { MegaMenu } from "@/components/layout/mega-menu";
import { HeroBanner } from "@/components/layout/hero-banner";

import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleProducts: Product[] = [
  {
    id: "p1",
    title: "Wireless Noise-Cancelling Headphones",
    price: { amount: 249 },
    comparePrice: { amount: 329 },
    imageUrl:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=60",
    badge: "Sale",
  },
  {
    id: "p2",
    title: "Minimalist Leather Backpack",
    price: { amount: 119 },
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=60",
    badge: "New",
  },
  {
    id: "p3",
    title: "Smart Espresso Machine",
    price: { amount: 459 },
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "p4",
    title: "Aroma Diffuser with Color Light",
    price: { amount: 49 },
    comparePrice: { amount: 69 },
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=60",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=70",
    alt: "Headphones front",
  },
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=70",
    alt: "Headphones side",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=70",
    alt: "Headphones detail",
  },
];

const sideNavItems = [
  { label: "All categories", href: "#all", icon: <LayoutGrid />, active: true },
  { label: "Electronics", href: "#elec", icon: <Package /> },
  { label: "Home & Living", href: "#home", icon: <Home /> },
  { label: "Fashion", href: "#fashion", icon: <ShoppingBag /> },
  { label: "Deals", href: "#deals", icon: <TagIcon /> },
];

// ---------------------------------------------------------------------------
// Doc page primitives — Preview frame + import snippet
// ---------------------------------------------------------------------------

function Preview({
  children,
  className,
  centered = true,
}: {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-background min-h-[280px] p-6",
        centered && "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg border border-gray-200 bg-gray-900 p-4 text-[12px] leading-5 text-gray-100 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function Demo({
  preview,
  code,
}: {
  preview: React.ReactNode;
  code: string;
}) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <Preview>{preview}</Preview>
      </TabsContent>
      <TabsContent value="code">
        <Code>{code}</Code>
      </TabsContent>
    </Tabs>
  );
}

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6">
      <h1 className="text-h2 text-text-primary">{title}</h1>
      <p className="mt-2 text-p1 text-text-secondary">{description}</p>
    </header>
  );
}

function Variant({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-[11px] uppercase tracking-wider text-text-tertiary">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Doc pages
// ---------------------------------------------------------------------------

function ShowcaseTile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-card p-5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function IntroductionPage() {
  const [priceRange, setPriceRange] = React.useState<number[]>([200, 800]);
  const [seats, setSeats] = React.useState(8);
  const [tint, setTint] = React.useState(true);
  const [storefrontType, setStorefrontType] = React.useState("hosted");
  const [hearAbout, setHearAbout] = React.useState<string[]>(["social"]);
  const [agree, setAgree] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [chatTab, setChatTab] = React.useState("auto");
  const [askMode, setAskMode] = React.useState("auto");

  return (
    <article className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-card px-3 py-1 text-[12px] text-text-secondary">
          <Sparkles className="size-3.5 text-primary" />
          Webmarket UI · v1.0
        </div>
        <h1 className="mt-4 text-h1 text-text-primary">
          A marketplace-grade component kit.
        </h1>
        <p className="mt-3 max-w-2xl text-p1 text-text-secondary">
          Reusable, accessible, responsive React components. Themed from the
          Webmarket Figma kit, owned by your codebase — copy, paste, modify.
          Below: the surface area, in one page.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Column 1 — Payment */}
        <div className="flex min-w-0 flex-col gap-4">
          <ShowcaseTile>
            <div className="space-y-1">
              <h3 className="text-[15px] font-semibold text-text-primary">
                Payment method
              </h3>
              <p className="text-[12px] text-text-tertiary">
                All transactions are secure and encrypted
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <Input label="Name on card" defaultValue="John Doe" />
              <div className="grid grid-cols-[1fr_84px] gap-2">
                <Input label="Card number" defaultValue="1234 5678 9012 3456" />
                <Input label="CVV" defaultValue="123" />
              </div>
              <p className="text-[11px] text-text-tertiary -mt-1">
                Enter your 16-digit number.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <SelectField
                  label="Month"
                  placeholder="MM"
                  defaultValue="05"
                >
                  {Array.from({ length: 12 }).map((_, i) => {
                    const m = String(i + 1).padStart(2, "0");
                    return (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    );
                  })}
                </SelectField>
                <SelectField label="Year" placeholder="YYYY" defaultValue="2027">
                  {[2026, 2027, 2028, 2029, 2030].map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
              <Separator className="my-1" />
              <div className="space-y-1">
                <h4 className="text-[14px] font-semibold text-text-primary">
                  Billing address
                </h4>
                <p className="text-[12px] text-text-tertiary">
                  The billing address associated with your payment method.
                </p>
              </div>
              <CheckboxField label="Same as shipping address" defaultChecked />
              <Textarea
                label="Comments"
                placeholder="Add any additional comments"
                rows={3}
              />
              <div className="flex gap-2 pt-1">
                <Button size="sm">Submit</Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </ShowcaseTile>
        </div>

        {/* Column 2 — Engagement */}
        <div className="flex min-w-0 flex-col gap-4">
          <ShowcaseTile className="text-center">
            <div className="flex items-center justify-center -space-x-2">
              <Avatar size="md" className="ring-2 ring-card">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar size="md" className="ring-2 ring-card">
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <Avatar size="md" className="ring-2 ring-card">
                <AvatarFallback>RY</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-text-primary">
              No team members
            </h3>
            <p className="mt-1 text-[12px] text-text-tertiary">
              Invite your team to collaborate on this storefront.
            </p>
            <div className="mt-4">
              <Button variant="primaryOutlined" size="sm" iconLeft={<Plus />}>
                Invite members
              </Button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted" className="gap-1.5">
                <IconSpinner className="size-3" />
                Syncing
              </Badge>
              <Badge variant="info" className="gap-1.5">
                <IconSpinner className="size-3" />
                Updating
              </Badge>
              <Badge variant="warning" className="gap-1.5">
                <IconSpinner className="size-3" />
                Loading
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 bg-background px-2 py-1.5">
              <button
                type="button"
                className="grid size-7 place-items-center rounded-full text-text-tertiary hover:text-text-primary hover:bg-muted"
                aria-label="Attach"
              >
                <Plus className="size-4" />
              </button>
              <input
                type="text"
                placeholder="Send a message…"
                className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="button"
                className="grid size-7 place-items-center rounded-full text-text-tertiary hover:text-text-primary hover:bg-muted"
                aria-label="Voice"
              >
                <Mic className="size-4" />
              </button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-text-primary">
                Price range
              </h4>
              <p className="text-[12px] text-text-tertiary">
                Set your budget range (${priceRange[0]} – ${priceRange[1]}).
              </p>
            </div>
            <div className="mt-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000}
                step={10}
              />
            </div>
            <div className="mt-4">
              <Input
                iconLeft={<Search />}
                iconRight={
                  <span className="text-[12px] tabular-nums">12 results</span>
                }
                placeholder="Search…"
                className="pr-24"
              />
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-background pl-3 pr-2">
              <span className="shrink-0 text-[13px] text-text-tertiary">
                https://
              </span>
              <input
                type="text"
                defaultValue="yourstore.webmarket.com"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <Info className="size-4 shrink-0 text-text-tertiary" />
            </div>
            <div className="mt-3 rounded-xl border border-gray-200 bg-background p-3">
              <Textarea
                placeholder="Ask, search or chat…"
                rows={2}
                className="border-0 !ring-0 !bg-transparent p-0 resize-none"
              />
              <div className="mt-2 flex items-center gap-2">
                <ToggleGroup
                  type="single"
                  variant="segmented"
                  size="sm"
                  value={chatTab}
                  onValueChange={(v: string) => v && setChatTab(v)}
                >
                  <ToggleGroupItem value="auto">Auto</ToggleGroupItem>
                  <ToggleGroupItem value="52">52% used</ToggleGroupItem>
                </ToggleGroup>
                <Button
                  size="iconSm"
                  variant="primary"
                  className="ml-auto rounded-full"
                  aria-label="Send"
                >
                  <ArrowUp />
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Autocomplete
                iconLeft={<AtSign />}
                placeholder="Mention a teammate"
                defaultValue="webmarket-team"
                iconRight={<Check className="text-success-500" />}
                options={[
                  {
                    value: "webmarket-team",
                    label: "@webmarket-team",
                    description: "Default team",
                  },
                  { value: "design", label: "@design" },
                  { value: "engineering", label: "@engineering" },
                ]}
              />
            </div>
          </ShowcaseTile>
        </div>

        {/* Column 3 — Settings */}
        <div className="flex min-w-0 flex-col gap-4">
          <ShowcaseTile className="!p-3">
            <div className="flex items-center gap-2 rounded-full bg-background px-3 py-2">
              <Info className="size-4 text-text-tertiary" />
              <input
                type="text"
                defaultValue="https://"
                placeholder="https://"
                className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="button"
                aria-label="Star"
                className="grid size-7 place-items-center rounded-full text-text-tertiary hover:text-warning-500"
              >
                <Star className="size-4" />
              </button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-[14px] font-semibold text-text-primary">
                  Two-factor authentication
                </h4>
                <p className="mt-1 text-[12px] text-text-tertiary">
                  Verify via email or phone number
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Enable
              </Button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile className="!p-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted"
            >
              <span className="grid size-9 place-items-center rounded-full bg-success-50 text-success-700">
                <BadgeCheck className="size-5" />
              </span>
              <span className="flex-1 text-[14px] text-text-primary">
                Your profile has been verified.
              </span>
              <ChevronRight className="size-4 text-text-tertiary" />
            </button>
          </ShowcaseTile>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary">
              Storefront settings
            </span>
            <Separator className="flex-1" />
          </div>

          <ShowcaseTile>
            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-text-primary">
                Storefront type
              </h4>
              <p className="text-[12px] text-text-tertiary">
                Select the deployment mode for your storefront.
              </p>
            </div>
            <RadioGroup
              value={storefrontType}
              onValueChange={setStorefrontType}
              className="mt-4 gap-2"
            >
              {[
                {
                  v: "hosted",
                  t: "Hosted",
                  d: "Run your storefront on Webmarket's managed cloud. This is the default.",
                },
                {
                  v: "self",
                  t: "Self-hosted",
                  d: "Bring your own infrastructure to run the storefront. (Coming soon)",
                  disabled: true,
                },
              ].map((opt) => {
                const checked = storefrontType === opt.v;
                return (
                  <label
                    key={opt.v}
                    htmlFor={`storefront-${opt.v}`}
                    className={cn(
                      "block cursor-pointer rounded-lg border p-3 transition-colors",
                      checked
                        ? "border-primary bg-secondary"
                        : "border-gray-200 hover:bg-muted",
                      opt.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="text-[13px] font-medium text-text-primary">
                          {opt.t}
                        </div>
                        <div className="mt-0.5 text-[12px] text-text-tertiary">
                          {opt.d}
                        </div>
                      </div>
                      <RadioGroupItem
                        id={`storefront-${opt.v}`}
                        value={opt.v}
                        disabled={opt.disabled}
                      />
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-[14px] font-semibold text-text-primary">
                  Team seats
                </h4>
                <p className="text-[12px] text-text-tertiary">
                  You can add more later.
                </p>
              </div>
              <NumberInput
                size="sm"
                value={seats}
                onValueChange={setSeats}
                min={1}
                max={50}
              />
            </div>
            <Separator className="my-3" />
            <SwitchField
              label="Brand color tint"
              description="Allow the storefront to be tinted with your brand color."
              checked={tint}
              onCheckedChange={setTint}
            />
          </ShowcaseTile>
        </div>

        {/* Column 4 — Actions */}
        <div className="flex min-w-0 flex-col gap-4">
          <ShowcaseTile>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-text-tertiary">
                  Active users · 7d
                </div>
                <div className="mt-1 text-h2 font-semibold tabular-nums text-text-primary">
                  14,820
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-[12px] text-success-700">
                  <span className="font-medium">+12.4%</span>
                  <span className="text-text-tertiary">vs last week</span>
                </div>
              </div>
              <span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary">
                <Sparkles className="size-4" />
              </span>
            </div>
            <div className="-mx-1 mt-3 h-16">
              <Sparkline
                data={[12, 14, 13, 18, 17, 22, 24, 21, 28, 32, 30, 36]}
                color="hsl(var(--chart-1))"
                height={64}
              />
            </div>
          </ShowcaseTile>

          <ShowcaseTile className="!p-3">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-[12px] text-text-secondary hover:bg-muted"
            >
              <AtSign className="size-3.5" />
              Add context
            </button>
            <Textarea
              placeholder="Ask, search, or make anything…"
              rows={3}
              className="mt-2 border-0 !ring-0 !bg-transparent p-2 resize-none"
            />
            <div className="mt-2 flex items-center gap-2">
              <ToggleGroup
                type="single"
                variant="segmented"
                size="sm"
                value={askMode}
                onValueChange={(v: string) => v && setAskMode(v)}
              >
                <ToggleGroupItem value="auto">
                  <Paperclip />
                  Auto
                </ToggleGroupItem>
                <ToggleGroupItem value="all">All sources</ToggleGroupItem>
              </ToggleGroup>
              <Button
                size="iconSm"
                variant="primary"
                className="ml-auto rounded-full"
                aria-label="Send"
              >
                <ArrowUp />
              </Button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="flex flex-wrap items-center gap-1">
              <Button
                size="iconSm"
                variant="ghost"
                aria-label="Back"
                className="rounded-full"
              >
                <ArrowLeft />
              </Button>
              <Button variant="ghost" size="sm">
                Archive
              </Button>
              <Button variant="ghost" size="sm">
                Report
              </Button>
              <Button variant="ghost" size="sm">
                Snooze
              </Button>
              <Button
                size="iconSm"
                variant="ghost"
                aria-label="More"
                className="ml-auto rounded-full"
              >
                <MoreHorizontal />
              </Button>
            </div>
            <Separator className="my-3" />
            <CheckboxField
              label="I agree to the terms and conditions"
              checked={agree}
              onCheckedChange={(c) => setAgree(c === true)}
            />
            <div className="mt-3 flex flex-wrap items-center gap-y-3 justify-between gap-x-2">
              <SmartPagination
                currentPage={page}
                totalPages={3}
                onPageChange={setPage}
                className="!mx-0 justify-start"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" iconLeft={<Sparkles />}>
                    Copilot
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Summarize page</DropdownMenuItem>
                  <DropdownMenuItem>Suggest edits</DropdownMenuItem>
                  <DropdownMenuItem>Explain section</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ShowcaseTile>

          <ShowcaseTile>
            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-text-primary">
                How did you hear about us?
              </h4>
              <p className="text-[12px] text-text-tertiary">
                Select all that apply.
              </p>
            </div>
            <ToggleGroup
              type="multiple"
              variant="pills"
              size="sm"
              value={hearAbout}
              onValueChange={(v: string[]) => setHearAbout(v)}
              className="mt-4"
            >
              <ToggleGroupItem value="social">
                {hearAbout.includes("social") && <Check />}
                Social media
              </ToggleGroupItem>
              <ToggleGroupItem value="search">
                {hearAbout.includes("search") && <Check />}
                Search engine
              </ToggleGroupItem>
              <ToggleGroupItem value="referral">
                {hearAbout.includes("referral") && <Check />}
                Referral
              </ToggleGroupItem>
              <ToggleGroupItem value="other">
                {hearAbout.includes("other") && <Check />}
                Other
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseTile>

          <ShowcaseTile className="text-center">
            <IconSpinner className="mx-auto size-7 text-primary" />
            <h4 className="mt-3 text-[14px] font-semibold text-text-primary">
              Processing your request
            </h4>
            <p className="mt-1 text-[12px] text-text-tertiary">
              Please wait while we process your request. Do not refresh the page.
            </p>
            <Button variant="ghost" size="sm" className="mt-3">
              Cancel
            </Button>
          </ShowcaseTile>
        </div>
      </div>

      <footer className="rounded-2xl border border-gray-100 bg-card p-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-text-tertiary">
          <span>
            <strong className="text-text-primary">{flatPages.length}</strong>{" "}
            components
          </span>
          <span>
            <strong className="text-text-primary">React 18</strong> · Vite · TS
          </span>
          <span>
            <strong className="text-text-primary">Tailwind v3</strong> · CSS
            variable tokens
          </span>
          <span>
            <strong className="text-text-primary">Radix UI</strong> primitives
          </span>
          <span>
            <strong className="text-text-primary">CVA</strong> variants
          </span>
          <a
            href="#tokens"
            className="ml-auto inline-flex items-center gap-1 text-primary hover:text-brand-700"
          >
            See design tokens <ChevronRight className="size-3" />
          </a>
        </div>
      </footer>
    </article>
  );
}

function TokensPage() {
  const palettes: { title: string; tokens: { name: string; hex: string }[] }[] =
    [
      {
        title: "Brand",
        tokens: [
          { name: "primary", hex: "#FE6A00" },
          { name: "secondary", hex: "#FFF4EB" },
          { name: "tertiary", hex: "#FEE1CC" },
          { name: "100", hex: "#FEC399" },
          { name: "200", hex: "#FEA566" },
          { name: "700", hex: "#963F00" },
        ],
      },
      {
        title: "Text",
        tokens: [
          { name: "primary", hex: "#262626" },
          { name: "secondary", hex: "#525252" },
          { name: "tertiary", hex: "#A3A3A3" },
          { name: "muted", hex: "#404040" },
        ],
      },
      {
        title: "Blue gray",
        tokens: [
          { name: "50", hex: "#F8FAFC" },
          { name: "100", hex: "#F3F4F6" },
          { name: "200", hex: "#E2E8F0" },
          { name: "300", hex: "#CBD5E1" },
          { name: "400", hex: "#94A3B8" },
          { name: "500", hex: "#64748B" },
          { name: "600", hex: "#475569" },
          { name: "700", hex: "#334155" },
          { name: "800", hex: "#1E293B" },
          { name: "900", hex: "#0F172A" },
        ],
      },
      {
        title: "Success — emerald",
        tokens: [
          { name: "success-50", hex: "#ECFDF5" },
          { name: "success-100", hex: "#D1FAE5" },
          { name: "success-500", hex: "#10B981" },
          { name: "success-600", hex: "#059669" },
          { name: "success-700", hex: "#047857" },
        ],
      },
      {
        title: "Danger — red",
        tokens: [
          { name: "danger-50", hex: "#FEF2F2" },
          { name: "danger-100", hex: "#FEE2E2" },
          { name: "danger-500", hex: "#EF4444" },
          { name: "danger-600", hex: "#DC2626" },
          { name: "danger-700", hex: "#B91C1C" },
        ],
      },
      {
        title: "Warning — amber",
        tokens: [
          { name: "warning-50", hex: "#FFFBEB" },
          { name: "warning-100", hex: "#FEF3C7" },
          { name: "warning-500", hex: "#F59E0B" },
          { name: "warning-600", hex: "#D97706" },
          { name: "warning-700", hex: "#B45309" },
        ],
      },
      {
        title: "Info — sky",
        tokens: [
          { name: "info-50", hex: "#F0F9FF" },
          { name: "info-100", hex: "#E0F2FE" },
          { name: "info-500", hex: "#0EA5E9" },
          { name: "info-600", hex: "#0284C7" },
          { name: "info-700", hex: "#0369A1" },
        ],
      },
      {
        title: "Violet — accent",
        tokens: [
          { name: "violet-50", hex: "#F5F3FF" },
          { name: "violet-100", hex: "#EDE9FE" },
          { name: "violet-500", hex: "#8B5CF6" },
          { name: "violet-600", hex: "#7C3AED" },
          { name: "violet-700", hex: "#6D28D9" },
        ],
      },
    ];
  const typeScale = [
    { token: "h1", size: "40 / 48", weight: "Semi Bold" },
    { token: "h2", size: "32 / 40", weight: "Semi Bold" },
    { token: "h3", size: "24 / 32", weight: "Semi Bold" },
    { token: "h4", size: "18 / 24", weight: "Medium" },
    { token: "h5", size: "16 / 24", weight: "Medium" },
    { token: "h6", size: "14 / 20", weight: "Semi Bold" },
    { token: "p1", size: "14 / 20", weight: "Regular" },
    { token: "l1", size: "12 / 16", weight: "Regular" },
  ];

  return (
    <article>
      <PageHeader
        title="Design tokens"
        description="The complete color palette and typography scale lifted from the Figma UI Kit."
      />
      <div className="space-y-8">
        {palettes.map((p) => (
          <div key={p.title}>
            <h2 className="text-h4 font-semibold text-text-primary mb-3">
              {p.title}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {p.tokens.map((t) => (
                <div
                  key={t.name}
                  className="overflow-hidden rounded-md border border-gray-200"
                >
                  <div
                    className="h-16 w-full"
                    style={{ background: t.hex }}
                  />
                  <div className="px-3 py-2 text-[12px]">
                    <div className="font-medium text-text-primary">
                      {t.name}
                    </div>
                    <div className="font-mono text-text-tertiary">{t.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Separator />
        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            Typography
          </h2>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <table className="w-full text-[14px]">
              <thead className="bg-gray-50 text-text-tertiary text-[12px]">
                <tr>
                  <th className="text-left p-3 font-medium">Token</th>
                  <th className="text-left p-3 font-medium">Size / LH</th>
                  <th className="text-left p-3 font-medium">Weight</th>
                  <th className="text-left p-3 font-medium">Sample</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {typeScale.map((row) => (
                  <tr key={row.token}>
                    <td className="p-3 font-mono text-[13px] text-text-secondary">
                      {row.token}
                    </td>
                    <td className="p-3 text-text-secondary">{row.size}</td>
                    <td className="p-3 text-text-secondary">{row.weight}</td>
                    <td className={cn("p-3 text-text-primary", `text-${row.token}`)}>
                      The quick brown fox.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  );
}

function ButtonPage() {
  return (
    <article>
      <PageHeader
        title="Button"
        description="Five visual variants and four sizes, with default, hover, focus, loading, and disabled states."
      />
      <Demo
        preview={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" iconRight={<ChevronRight />}>
              Primary
            </Button>
            <Button variant="primaryOutlined" iconRight={<ChevronRight />}>
              Outlined
            </Button>
            <Button variant="secondary" iconRight={<ChevronRight />}>
              Secondary
            </Button>
            <Button variant="text">Text</Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        }
        code={`<Button variant="primary" iconRight={<ChevronRight />}>
  Primary
</Button>
<Button variant="primaryOutlined">Outlined</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="text">Text</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
      />
      <div className="mt-8 space-y-6">
        <Variant label="Sizes">
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
        </Variant>
        <Variant label="Icon buttons">
          <Button size="iconLg" aria-label="Next">
            <ChevronRight />
          </Button>
          <Button size="iconMd" variant="primaryOutlined" aria-label="Like">
            <Heart />
          </Button>
          <Button size="iconSm" variant="secondary" aria-label="Settings">
            <Settings />
          </Button>
        </Variant>
      </div>
    </article>
  );
}

function InputPage() {
  return (
    <article>
      <PageHeader
        title="Input"
        description="Text input with optional label, helper text, error state, and leading / trailing icons."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              iconLeft={<Search />}
              helperText="We'll never share your email."
              showClear
            />
            <Input label="Password" type="password" defaultValue="hunter2" />
            <Input
              label="Username"
              error="That username is already taken"
              defaultValue="taken_name"
            />
            <Input label="Disabled" disabled defaultValue="Read-only" />
          </div>
        }
        code={`<Input
  label="Email"
  placeholder="you@example.com"
  iconLeft={<Search />}
  helperText="We'll never share your email."
  showClear
/>`}
      />
    </article>
  );
}

function FloatingInputPage() {
  return (
    <article>
      <PageHeader
        title="Floating input"
        description="Variant 1 from the Figma — label sits inside and animates up on focus or fill."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-4">
            <FloatingInput label="Full name" />
            <FloatingInput label="Search" iconLeft={<Search />} showClear />
            <FloatingInput label="Has error" error="Required field" />
            <FloatingInput label="Disabled" disabled />
          </div>
        }
        code={`<FloatingInput label="Full name" />
<FloatingInput label="Search" iconLeft={<Search />} showClear />`}
      />
    </article>
  );
}

function TextareaPage() {
  return (
    <article>
      <PageHeader
        title="Textarea"
        description="Multi-line text input. Same label / helper / error API as Input."
      />
      <Demo
        preview={
          <div className="w-full max-w-md">
            <Textarea
              label="Description"
              placeholder="Tell us more about your product..."
              helperText="Up to 500 characters."
            />
          </div>
        }
        code={`<Textarea
  label="Description"
  placeholder="Tell us more..."
  helperText="Up to 500 characters."
/>`}
      />
    </article>
  );
}

function SelectPage() {
  return (
    <article>
      <PageHeader
        title="Select"
        description="Accessible dropdown built on Radix Select. Label sits above the trigger."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-4">
            <SelectField label="Category" placeholder="Choose a category">
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="deals">Deals</SelectItem>
            </SelectField>
            <SelectField
              label="With error"
              error="Please choose one"
              placeholder="Choose"
            >
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectField>
          </div>
        }
        code={`<SelectField label="Category" placeholder="Choose a category">
  <SelectItem value="electronics">Electronics</SelectItem>
  <SelectItem value="home">Home & Living</SelectItem>
</SelectField>`}
      />
    </article>
  );
}

function SearchBarPage() {
  return (
    <article>
      <PageHeader
        title="Search bar"
        description="Pill-shaped search input with leading icon and a primary submit button."
      />
      <Demo
        preview={
          <div className="w-full space-y-4">
            <SearchBar tone="light" placeholder="Search products..." />
            <div className="rounded-lg bg-gray-900 p-3">
              <SearchBar tone="dark" placeholder="Search products..." />
            </div>
          </div>
        }
        code={`<SearchBar tone="light" placeholder="Search products..." />
<SearchBar tone="dark" placeholder="Search products..." />`}
      />
    </article>
  );
}

function CardPage() {
  return (
    <article>
      <PageHeader
        title="Card"
        description="Container with optional Header, Title, Description, Content, Footer slots."
      />
      <Demo
        preview={
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Order #34921</CardTitle>
              <CardDescription>
                Placed Apr 28, 2026 · 3 items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-p1 text-text-secondary">
                Your order is on its way and should arrive in 2–3 business days.
              </p>
            </CardContent>
          </Card>
        }
        code={`<Card>
  <CardHeader>
    <CardTitle>Order #34921</CardTitle>
    <CardDescription>Placed Apr 28, 2026</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>`}
      />
    </article>
  );
}

function BadgePage() {
  return (
    <article>
      <PageHeader
        title="Badge"
        description="Small inline label used for status, counts, or category tags."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="violet">Violet</Badge>
            <Badge variant="muted">Muted</Badge>
          </div>
        }
        code={`<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="violet">Violet</Badge>`}
      />
    </article>
  );
}

function DialogPage() {
  return (
    <article>
      <PageHeader
        title="Dialog"
        description="Modal dialog. Fullscreen on mobile, centered card on tablet and up. Focus trap, ESC to close."
      />
      <Demo
        preview={
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm your order</DialogTitle>
                <DialogDescription>
                  Review your cart total before placing the order.
                </DialogDescription>
              </DialogHeader>
              <div className="text-p1 text-text-secondary">
                Subtotal:{" "}
                <span className="font-semibold text-text-primary">$284.00</span>
              </div>
              <DialogFooter>
                <Button variant="secondaryOutlined">Cancel</Button>
                <Button>Place order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
        code={`<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondaryOutlined">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      />
    </article>
  );
}

function SheetPage() {
  return (
    <article>
      <PageHeader
        title="Sheet"
        description="Modal panel. Default `center` pops from the middle (zoom in); `top`/`right`/`bottom`/`left` slide from that edge for nav drawers."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-2">
            {(["center", "left", "right", "top", "bottom"] as const).map(
              (side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="primaryOutlined">
                      {side === "center" ? "Centered" : `From ${side}`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Side: {side}</SheetTitle>
                    </SheetHeader>
                    <p className="text-p1 text-text-secondary mt-2">
                      Sheet content goes here.
                    </p>
                  </SheetContent>
                </Sheet>
              )
            )}
          </div>
        }
        code={`<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  {/* default: side="center" — pops from the middle */}
  <SheetContent>
    <SheetHeader><SheetTitle>Cart</SheetTitle></SheetHeader>
  </SheetContent>
</Sheet>`}
      />
    </article>
  );
}

function ToastPage() {
  const { toast } = useToast();
  return (
    <article>
      <PageHeader
        title="Toast"
        description="Transient notifications. Bottom-pinned on mobile, top-right on tablet and up."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast({
                  title: "Saved",
                  description: "Your changes have been saved.",
                })
              }
            >
              Default
            </Button>
            <Button
              variant="primaryOutlined"
              onClick={() =>
                toast({
                  variant: "success",
                  title: "Order placed",
                  description: "Your order #34921 is on its way.",
                })
              }
            >
              Success
            </Button>
            <Button
              variant="secondaryOutlined"
              onClick={() =>
                toast({
                  variant: "destructive",
                  title: "Payment failed",
                  description: "Try a different card or contact support.",
                })
              }
            >
              Destructive
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  variant: "warning",
                  title: "Stock running low",
                  description: "Only 2 items left at this price.",
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="text"
              onClick={() =>
                toast({
                  variant: "info",
                  title: "New feature",
                  description: "Wishlist sync is now available across devices.",
                })
              }
            >
              Info
            </Button>
          </div>
        }
        code={`const { toast } = useToast();

toast({ title: "Saved", description: "Changes saved." });
toast({ variant: "success", title: "Order placed" });
toast({ variant: "warning", title: "Stock running low" });
toast({ variant: "info", title: "New feature" });
toast({ variant: "destructive", title: "Payment failed" });`}
      />
    </article>
  );
}

function DropdownMenuPage() {
  return (
    <article>
      <PageHeader
        title="Dropdown menu"
        description="Action menu. Use for account menus, item options, or contextual actions."
      />
      <Demo
        preview={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primaryOutlined">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="size-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="size-4" /> Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:text-danger">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      />
    </article>
  );
}

function TabsPage() {
  return (
    <article>
      <PageHeader
        title="Tabs"
        description="Switch between mutually-exclusive panels of content."
      />
      <Demo
        preview={
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-p1 text-text-secondary">
                Manage your account information.
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-p1 text-text-secondary">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="notifications">
              <p className="text-p1 text-text-secondary">
                Email and push notification preferences.
              </p>
            </TabsContent>
          </Tabs>
        }
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</Tabs>`}
      />
    </article>
  );
}

function SkeletonPage() {
  return (
    <article>
      <PageHeader
        title="Skeleton"
        description="Pulse placeholder primitives. Compose them yourself, or use the pre-built component skeletons on the Loading patterns page."
      />

      <h2 className="text-h4 font-semibold text-text-primary mb-3">
        Atomic — &lt;Skeleton /&gt;
      </h2>
      <Demo
        preview={
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-12 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        }
        code={`<Skeleton className="size-12 rounded-2xl" />
<Skeleton className="h-4 w-3/4" />`}
      />

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            SkeletonAvatar
          </h2>
          <Demo
            preview={
              <div className="flex items-center gap-4">
                <SkeletonAvatar size="sm" />
                <SkeletonAvatar size="md" />
                <SkeletonAvatar size="lg" />
                <SkeletonAvatar size="xl" />
                <SkeletonAvatar shape="square" size="md" />
              </div>
            }
            code={`<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar shape="square" size="lg" />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            SkeletonText
          </h2>
          <Demo
            preview={
              <div className="w-full max-w-md space-y-6">
                <SkeletonText lines={3} />
                <SkeletonText lines={5} lastLineWidth="40%" />
              </div>
            }
            code={`<SkeletonText lines={3} />
<SkeletonText lines={5} lastLineWidth="40%" />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            SkeletonHeading
          </h2>
          <Demo
            preview={
              <div className="w-full max-w-md space-y-6">
                <SkeletonHeading size="sm" />
                <SkeletonHeading size="md" withSubtitle />
                <SkeletonHeading size="lg" withSubtitle />
              </div>
            }
            code={`<SkeletonHeading size="md" withSubtitle />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            SkeletonImage
          </h2>
          <Demo
            preview={
              <div className="grid w-full gap-4 sm:grid-cols-3">
                <div>
                  <SkeletonImage aspect="square" />
                  <p className="mt-2 text-[12px] text-text-tertiary">square</p>
                </div>
                <div>
                  <SkeletonImage aspect="video" />
                  <p className="mt-2 text-[12px] text-text-tertiary">video</p>
                </div>
                <div>
                  <SkeletonImage aspect="portrait" />
                  <p className="mt-2 text-[12px] text-text-tertiary">portrait</p>
                </div>
              </div>
            }
            code={`<SkeletonImage aspect="square" />
<SkeletonImage aspect="video" />
<SkeletonImage aspect="portrait" />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            ListItemSkeleton
          </h2>
          <Demo
            preview={
              <div className="w-full max-w-md space-y-3">
                <ListItemSkeleton />
                <ListItemSkeleton />
                <ListItemSkeleton showAction />
              </div>
            }
            code={`<ListItemSkeleton />
<ListItemSkeleton showAction />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            FormFieldSkeleton
          </h2>
          <Demo
            preview={
              <div className="w-full max-w-sm space-y-4">
                <FormFieldSkeleton withHelper />
                <FormFieldSkeleton withHelper />
                <FormFieldSkeleton />
              </div>
            }
            code={`<FormFieldSkeleton withHelper />`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            TableRowSkeleton
          </h2>
          <Demo
            preview={
              <div className="w-full max-w-2xl divide-y divide-gray-100 rounded-md border border-gray-200 px-4">
                <TableRowSkeleton columns={4} />
                <TableRowSkeleton columns={4} />
                <TableRowSkeleton columns={4} />
              </div>
            }
            code={`<TableRowSkeleton columns={4} />`}
          />
        </div>
      </div>
    </article>
  );
}

function LoadingPatternsPage() {
  const [loading, setLoading] = React.useState(true);
  const sample: Product = {
    id: "demo",
    title: "Wireless Noise-Cancelling Headphones — Studio Edition",
    price: { amount: 249 },
    comparePrice: { amount: 329 },
    imageUrl:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=60",
    badge: "Sale",
  };

  return (
    <article>
      <PageHeader
        title="Loading patterns"
        description="Pre-built skeletons that mirror the shape of each composite component. Drop in while data is fetching, swap to the real component when ready."
      />

      <div className="mb-6 flex items-center gap-3">
        <Button onClick={() => setLoading((l) => !l)}>
          {loading ? "Show loaded state" : "Show loading state"}
        </Button>
        <span className="text-[13px] text-text-secondary">
          Currently:{" "}
          <span className="font-mono text-text-primary">
            {loading ? "loading" : "loaded"}
          </span>
        </span>
      </div>

      <div className="space-y-10">
        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            CardSkeleton
          </h2>
          <Demo
            preview={
              loading ? (
                <CardSkeleton withFooter className="w-full max-w-sm" />
              ) : (
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Order #34921</CardTitle>
                    <CardDescription>Apr 28, 2026 · 3 items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-p1 text-text-secondary">
                      Your order is on its way and should arrive in 2–3 business
                      days.
                    </p>
                  </CardContent>
                </Card>
              )
            }
            code={`{loading
  ? <CardSkeleton withFooter />
  : <Card>...</Card>}`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            ProductCardSkeleton
          </h2>
          <Demo
            preview={
              loading ? (
                <ProductCardSkeleton className="w-full max-w-xs" />
              ) : (
                <div className="w-full max-w-xs">
                  <ProductCard product={sample} />
                </div>
              )
            }
            code={`{loading
  ? <ProductCardSkeleton />
  : <ProductCard product={p} />}`}
          />
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            ProductGridSkeleton
          </h2>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Preview centered={false}>
                {loading ? (
                  <ProductGridSkeleton count={4} columns={{ sm: 2, lg: 4 }} />
                ) : (
                  <ProductGrid
                    products={Array.from({ length: 4 }).map((_, i) => ({
                      ...sample,
                      id: `demo-${i}`,
                    }))}
                  />
                )}
              </Preview>
            </TabsContent>
            <TabsContent value="code">
              <Code>{`{loading
  ? <ProductGridSkeleton count={8} />
  : <ProductGrid products={products} />}`}</Code>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-h4 font-semibold text-text-primary mb-3">
            ProductGallerySkeleton
          </h2>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Preview centered={false}>
                <div className="w-full max-w-2xl">
                  {loading ? (
                    <ProductGallerySkeleton thumbCount={4} />
                  ) : (
                    <ProductGallery images={galleryImages} />
                  )}
                </div>
              </Preview>
            </TabsContent>
            <TabsContent value="code">
              <Code>{`{loading
  ? <ProductGallerySkeleton thumbCount={4} />
  : <ProductGallery images={images} />}`}</Code>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </article>
  );
}

function SpinnerPage() {
  return (
    <article>
      <PageHeader
        title="Spinner"
        description="Animated loading indicator. Used inside Button (loading state) or standalone."
      />
      <Demo
        preview={
          <div className="flex items-center gap-6">
            <IconSpinner size="sm" />
            <IconSpinner size="md" />
            <IconSpinner size="lg" />
            <IconSpinner size="xl" tone="muted" />
          </div>
        }
        code={`<IconSpinner size="md" />
<IconSpinner size="lg" tone="muted" />`}
      />
    </article>
  );
}

function EmptyStatePage() {
  return (
    <article>
      <PageHeader
        title="Empty state"
        description="Communicates that a list, page, or section has no data — and tells the user what to do next."
      />
      <Demo
        preview={
          <EmptyState
            icon={<PackageOpen />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Browse the catalog to find something you love."
            action={<Button>Browse catalog</Button>}
          />
        }
        code={`<EmptyState
  icon={<PackageOpen />}
  title="Your cart is empty"
  description="Browse the catalog to find something you love."
  action={<Button>Browse catalog</Button>}
/>`}
      />
    </article>
  );
}

function SeparatorPage() {
  return (
    <article>
      <PageHeader
        title="Separator"
        description="Visual divider, horizontal or vertical."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-3 text-text-secondary">
            <p>Above</p>
            <Separator />
            <p>Below</p>
          </div>
        }
        code={`<Separator />
<Separator orientation="vertical" />`}
      />
    </article>
  );
}

function SiteHeaderPage() {
  return (
    <article>
      <PageHeader
        title="Site header"
        description="The dark Webmarket header — brand · catalog · search · profile/wishlist/cart. Collapses to a hamburger Sheet below 768px."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SiteHeader
              actions={[
                {
                  label: "Profile",
                  icon: <User aria-hidden="true" />,
                  href: "#profile",
                },
                {
                  label: "Wishlist",
                  icon: <Heart aria-hidden="true" />,
                  href: "#wishlist",
                  badgeCount: 2,
                },
                {
                  label: "Cart",
                  icon: <ShoppingCart aria-hidden="true" />,
                  href: "#cart",
                  badgeCount: 3,
                },
              ]}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<SiteHeader
  actions={[
    { label: "Profile", icon: <User />, href: "#profile" },
    { label: "Wishlist", icon: <Heart />, href: "#wishlist", badgeCount: 2 },
    { label: "Cart", icon: <ShoppingCart />, href: "#cart", badgeCount: 3 },
  ]}
  onSearch={(q) => console.log("search", q)}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function SiteFooterPage() {
  return (
    <article>
      <PageHeader
        title="Site footer"
        description="Multi-column footer with brand block, link columns, optional social and legal slots."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SiteFooter
              description="Your one-stop online marketplace for quality goods at fair prices."
              columns={[
                {
                  heading: "Company",
                  links: [
                    { label: "About", href: "#" },
                    { label: "Careers", href: "#" },
                    { label: "Press", href: "#" },
                  ],
                },
                {
                  heading: "Help",
                  links: [
                    { label: "Support", href: "#" },
                    { label: "Returns", href: "#" },
                    { label: "Shipping", href: "#" },
                  ],
                },
                {
                  heading: "Legal",
                  links: [
                    { label: "Terms", href: "#" },
                    { label: "Privacy", href: "#" },
                  ],
                },
              ]}
              legal={<>© 2026 Webmarket. All rights reserved.</>}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<SiteFooter
  description="Your one-stop online marketplace."
  columns={[
    { heading: "Company", links: [{ label: "About", href: "#" }] },
    { heading: "Help", links: [{ label: "Support", href: "#" }] },
  ]}
  legal={<>© 2026 Webmarket.</>}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function SideNavPage() {
  return (
    <article>
      <PageHeader
        title="Side nav"
        description="Vertical navigation. Fixed left rail at lg+, opens as a Sheet on smaller screens."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-lg overflow-hidden border border-gray-200 flex">
            <SideNav title="Categories" items={sideNavItems} />
            <div className="flex-1 p-6 text-text-secondary">
              <p className="text-p1">
                Main content area. Below 1024px the nav becomes a Sheet drawer.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<SideNav
  title="Categories"
  items={[
    { label: "All categories", href: "#all", icon: <LayoutGrid />, active: true },
    { label: "Electronics", href: "#elec", icon: <Package /> },
  ]}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function MainNavPage() {
  return (
    <article>
      <PageHeader
        title="Main nav"
        description="Horizontal or vertical link list. Tone supports light or dark backgrounds."
      />
      <Demo
        preview={
          <div className="space-y-4 w-full">
            <MainNav
              tone="light"
              links={[
                { label: "Home", href: "#", active: true },
                { label: "Catalog", href: "#" },
                { label: "Deals", href: "#" },
                { label: "About", href: "#" },
              ]}
            />
            <div className="rounded-md bg-gray-900 p-3">
              <MainNav
                tone="dark"
                links={[
                  { label: "Home", href: "#", active: true },
                  { label: "Catalog", href: "#" },
                  { label: "Deals", href: "#" },
                ]}
              />
            </div>
          </div>
        }
        code={`<MainNav
  tone="light"
  links={[
    { label: "Home", href: "#", active: true },
    { label: "Catalog", href: "#" },
  ]}
/>`}
      />
    </article>
  );
}

function ProductCardPage() {
  const { toast } = useToast();
  const [wish, setWish] = React.useState(false);
  return (
    <article>
      <PageHeader
        title="Product card"
        description="Image, badge, title, price, optional add-to-cart and wishlist toggle."
      />
      <Demo
        preview={
          <div className="w-full max-w-xs">
            <ProductCard
              product={sampleProducts[0]}
              onAddToCart={(p) =>
                toast({ title: "Added to cart", description: p.title })
              }
              onToggleWishlist={() => setWish((w) => !w)}
              inWishlist={wish}
            />
          </div>
        }
        code={`<ProductCard
  product={product}
  onAddToCart={(p) => addToCart(p)}
  onToggleWishlist={(p) => toggleWishlist(p.id)}
  inWishlist={inWishlist}
/>`}
      />
    </article>
  );
}

function ProductGridPage() {
  const { toast } = useToast();
  const [wish, setWish] = React.useState<Set<string>>(new Set(["p2"]));
  return (
    <article>
      <PageHeader
        title="Product grid"
        description="Responsive grid of product cards. 1 col on mobile · 2 on tablet · 3 on desktop · 4 on wide screens."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview centered={false}>
            <ProductGrid
              products={sampleProducts}
              wishlistIds={wish}
              onToggleWishlist={(p) =>
                setWish((prev) => {
                  const next = new Set(prev);
                  next.has(p.id) ? next.delete(p.id) : next.add(p.id);
                  return next;
                })
              }
              onAddToCart={(p) =>
                toast({
                  variant: "success",
                  title: "Added to cart",
                  description: p.title,
                })
              }
            />
          </Preview>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<ProductGrid
  products={products}
  wishlistIds={wishlist}
  onAddToCart={addToCart}
  onToggleWishlist={toggleWishlist}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function ProductGalleryPage() {
  return (
    <article>
      <PageHeader
        title="Product gallery"
        description="Main carousel + thumbnail strip. Touch swipe on mobile, arrow keys on desktop. Thumbs sit below on mobile, on the left at lg+."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview centered={false}>
            <div className="w-full max-w-2xl">
              <ProductGallery images={galleryImages} />
            </div>
          </Preview>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<ProductGallery
  images={[
    { src: "/img/p1-front.jpg", alt: "Front" },
    { src: "/img/p1-side.jpg", alt: "Side" },
  ]}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function FlagsPage() {
  const codes: FlagCode[] = ["ru", "tj", "gb", "us", "kz", "uz", "kg", "ua"];
  const labels: Record<FlagCode, string> = {
    ru: "Russia",
    tj: "Tajikistan",
    gb: "United Kingdom",
    us: "United States",
    kz: "Kazakhstan",
    uz: "Uzbekistan",
    kg: "Kyrgyzstan",
    ua: "Ukraine",
  };
  return (
    <article>
      <PageHeader
        title="Flags"
        description="Inline-SVG flags for the marketplace's primary regions. Used by the language switcher and phone input."
      />
      <Demo
        preview={
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {codes.map((c) => (
              <div
                key={c}
                className="flex flex-col items-center gap-2 rounded-md border border-gray-200 p-3"
              >
                <Flag code={c} className="h-8 w-12" />
                <div className="text-[12px] text-text-secondary">
                  {labels[c]}
                </div>
                <div className="font-mono text-[11px] text-text-tertiary">
                  {c}
                </div>
              </div>
            ))}
          </div>
        }
        code={`<Flag code="tj" className="h-4 w-6" />
<Flag code="ru" className="h-4 w-6" />
<Flag code="gb" className="h-4 w-6" />`}
      />
    </article>
  );
}

function LanguageSwitcherPage() {
  const [lang, setLang] = React.useState<"en" | "ru" | "tj">("en");
  return (
    <article>
      <PageHeader
        title="Language switcher"
        description="Dropdown menu for picking the UI language. Three locales — English, Русский, Тоҷикӣ — with flags."
      />
      <Demo
        preview={
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher value={lang} onChange={setLang} variant="compact" />
              <LanguageSwitcher value={lang} onChange={setLang} variant="full" />
            </div>
            <div className="text-[13px] text-text-secondary">
              Current locale: <span className="font-mono">{lang}</span>
            </div>
          </div>
        }
        code={`const [lang, setLang] = useState<"en" | "ru" | "tj">("en");

<LanguageSwitcher value={lang} onChange={setLang} />
<LanguageSwitcher value={lang} onChange={setLang} variant="full" />`}
      />
    </article>
  );
}

function PhoneInputPage() {
  const [phone, setPhone] = React.useState("");
  const [errPhone, setErrPhone] = React.useState("");
  return (
    <article>
      <PageHeader
        title="Phone input"
        description="Country code dropdown with flag + dial code, max-length enforced per country, digits-only national number."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-4">
            <PhoneInput
              label="Phone number"
              value={phone}
              onChange={(v) => setPhone(v)}
              defaultCountry="TJ"
            />
            <PhoneInput
              label="With validation"
              value={errPhone}
              onChange={(v) => setErrPhone(v)}
              defaultCountry="RU"
              error={
                errPhone.length > 0 && errPhone.length < 10
                  ? "Number is too short"
                  : undefined
              }
            />
            <PhoneInput
              label="Disabled"
              defaultValue="900112233"
              defaultCountry="TJ"
              disabled
            />
          </div>
        }
        code={`const [phone, setPhone] = useState("");

<PhoneInput
  label="Phone number"
  value={phone}
  onChange={(v, country) => setPhone(v)}
  defaultCountry="TJ"
/>`}
      />
      <div className="mt-8">
        <h2 className="text-h4 font-semibold text-text-primary mb-3">
          Per-country max length
        </h2>
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 text-text-tertiary text-[12px]">
              <tr>
                <th className="text-left p-3 font-medium">Country</th>
                <th className="text-left p-3 font-medium">ISO</th>
                <th className="text-left p-3 font-medium">Dial code</th>
                <th className="text-left p-3 font-medium">Max digits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Tajikistan", iso: "TJ", flag: "tj", code: "+992", max: 9 },
                { name: "Russia", iso: "RU", flag: "ru", code: "+7", max: 10 },
                { name: "Kazakhstan", iso: "KZ", flag: "kz", code: "+7", max: 10 },
                { name: "Uzbekistan", iso: "UZ", flag: "uz", code: "+998", max: 9 },
                { name: "Kyrgyzstan", iso: "KG", flag: "kg", code: "+996", max: 9 },
                { name: "Ukraine", iso: "UA", flag: "ua", code: "+380", max: 9 },
                { name: "United Kingdom", iso: "GB", flag: "gb", code: "+44", max: 10 },
                { name: "United States", iso: "US", flag: "us", code: "+1", max: 10 },
              ].map((row) => (
                <tr key={row.iso}>
                  <td className="p-3 text-text-primary">
                    <span className="inline-flex items-center gap-2">
                      <Flag code={row.flag as FlagCode} className="h-3.5 w-5" />
                      {row.name}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-text-secondary">{row.iso}</td>
                  <td className="p-3 font-mono text-text-secondary">{row.code}</td>
                  <td className="p-3 tabular-nums text-text-secondary">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function LabelPage() {
  return (
    <article>
      <PageHeader
        title="Label"
        description="Form label paired with form fields via htmlFor."
      />
      <Demo
        preview={
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="email-demo">Email</Label>
            <Input id="email-demo" placeholder="you@example.com" />
          </div>
        }
        code={`<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="you@example.com" />`}
      />
    </article>
  );
}

// ---------------------------------------------------------------------------
// New: primitive doc pages
// ---------------------------------------------------------------------------

function AvatarPage() {
  return (
    <article>
      <PageHeader
        title="Avatar"
        description="User / brand image with fallback initials. Squary by default."
      />
      <Demo
        preview={
          <div className="flex items-center gap-4">
            <Avatar size="sm">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=70" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=70" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <Avatar size="xl" shape="square">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=70" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
          </div>
        }
        code={`<Avatar size="md">
  <AvatarImage src="..." />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`}
      />
    </article>
  );
}

function CheckboxPage() {
  const [checked, setChecked] = React.useState(true);
  return (
    <article>
      <PageHeader
        title="Checkbox"
        description="Boolean control. Use CheckboxField for label + description in one shot."
      />
      <Demo
        preview={
          <div className="space-y-3">
            <CheckboxField
              label="Send me marketing emails"
              description="We'll only send important updates."
              checked={checked}
              onCheckedChange={(c) => setChecked(c === true)}
            />
            <CheckboxField label="Subscribe to weekly digest" />
            <CheckboxField label="Disabled" disabled />
            <CheckboxField label="Disabled checked" disabled defaultChecked />
          </div>
        }
        code={`<CheckboxField
  label="Send me marketing emails"
  description="We'll only send important updates."
  checked={checked}
  onCheckedChange={setChecked}
/>`}
      />
    </article>
  );
}

function RadioGroupPage() {
  const [value, setValue] = React.useState("delivery");
  return (
    <article>
      <PageHeader
        title="Radio group"
        description="One choice from many. Use RadioField for label + description."
      />
      <Demo
        preview={
          <RadioGroup value={value} onValueChange={setValue} className="space-y-2">
            <RadioField
              value="delivery"
              label="Home delivery"
              description="Arrives in 2-3 business days"
            />
            <RadioField
              value="pickup"
              label="Pickup point"
              description="Free at over 200 locations"
            />
            <RadioField value="express" label="Express" description="Same-day in city center" />
          </RadioGroup>
        }
        code={`<RadioGroup value={value} onValueChange={setValue}>
  <RadioField value="delivery" label="Home delivery" />
  <RadioField value="pickup" label="Pickup point" />
</RadioGroup>`}
      />
    </article>
  );
}

function SliderPage() {
  const [single, setSingle] = React.useState([40]);
  const [range, setRange] = React.useState([20, 80]);
  return (
    <article>
      <PageHeader
        title="Slider"
        description="Numeric input via drag. Single value or [min, max] range."
      />
      <Demo
        preview={
          <div className="w-full max-w-md space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-[12px] text-text-secondary">
                <span>Volume</span>
                <span className="tabular-nums">{single[0]}</span>
              </div>
              <Slider value={single} onValueChange={setSingle} min={0} max={100} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-[12px] text-text-secondary">
                <span>Price range</span>
                <span className="tabular-nums">${range[0]} – ${range[1]}</span>
              </div>
              <Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
            </div>
          </div>
        }
        code={`<Slider value={[40]} onValueChange={setVal} min={0} max={100} />
<Slider value={[20, 80]} onValueChange={setRange} step={5} />`}
      />
    </article>
  );
}

function TooltipPage() {
  return (
    <article>
      <PageHeader
        title="Tooltip"
        description="Hover/focus hint. Use QuickTooltip for the most common case (one trigger, one tip)."
      />
      <Demo
        preview={
          <div className="flex items-center gap-3">
            <QuickTooltip content="Add to wishlist">
              <Button variant="primaryOutlined" size="iconMd" aria-label="Wishlist">
                <span className="text-[16px]">♥</span>
              </Button>
            </QuickTooltip>
            <QuickTooltip content="Compare products" side="right">
              <Button variant="secondary" size="iconMd" aria-label="Compare">
                <span className="text-[16px]">⇄</span>
              </Button>
            </QuickTooltip>
            <QuickTooltip content="Bottom-side tooltip" side="bottom">
              <Button variant="text">Hover me</Button>
            </QuickTooltip>
          </div>
        }
        code={`<QuickTooltip content="Add to wishlist">
  <Button>♥</Button>
</QuickTooltip>`}
      />
    </article>
  );
}

function AccordionPage() {
  return (
    <article>
      <PageHeader
        title="Accordion"
        description="Collapsible content sections. Use type='single' for FAQ, 'multiple' for filter groups."
      />
      <Demo
        preview={
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="a">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns within 30 days, full refund on unused items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard delivery is 2–5 business days. Express is next-day in
                covered areas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, to 40+ countries. Rates and customs vary by region.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        }
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>`}
      />
    </article>
  );
}

function BreadcrumbPage() {
  return (
    <article>
      <PageHeader
        title="Breadcrumb"
        description="Hierarchical trail showing the user's path through the catalog."
      />
      <Demo
        preview={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Beauty</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Face care</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCurrent>Anti-aging</BreadcrumbCurrent>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Anti-aging</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      />
    </article>
  );
}

function PaginationPage() {
  const [page, setPage] = React.useState(3);
  return (
    <article>
      <PageHeader
        title="Pagination"
        description="Page-based navigation. SmartPagination auto-truncates with ellipses."
      />
      <Demo
        preview={
          <div className="w-full space-y-6">
            <SmartPagination
              currentPage={page}
              totalPages={12}
              onPageChange={setPage}
            />
            <p className="text-center text-[13px] text-text-secondary">
              Currently on page <span className="font-mono">{page}</span> of 12
            </p>
          </div>
        }
        code={`<SmartPagination
  currentPage={page}
  totalPages={12}
  onPageChange={setPage}
/>`}
      />
    </article>
  );
}

function RatingPage() {
  const [value, setValue] = React.useState(0);
  return (
    <article>
      <PageHeader
        title="Rating"
        description="Star rating display, with optional count and value labels. Set interactive for input mode."
      />
      <Demo
        preview={
          <div className="space-y-4">
            <Rating value={4.5} size="md" showValue count={1283} />
            <Rating value={3} size="lg" />
            <Rating value={2.5} size="xl" />
            <div className="flex items-center gap-3">
              <Rating
                value={value}
                interactive
                size="lg"
                onValueChange={setValue}
              />
              <span className="text-[13px] text-text-secondary">
                {value > 0 ? `You rated: ${value}` : "Not rated yet"}
              </span>
            </div>
          </div>
        }
        code={`<Rating value={4.5} showValue count={1283} />
<Rating value={value} interactive onValueChange={setValue} />`}
      />
    </article>
  );
}

function PricePage() {
  return (
    <article>
      <PageHeader
        title="Price"
        description="Current price + optional strikethrough comparePrice + auto -X% discount badge."
      />
      <Demo
        preview={
          <div className="space-y-4">
            <Price current={{ amount: 49 }} compare={{ amount: 69 }} size="lg" />
            <Price
              current={{ amount: 249 }}
              compare={{ amount: 329 }}
              size="xl"
            />
            <Price current={{ amount: 19 }} size="md" />
            <div className="flex flex-wrap items-center gap-3">
              <DiscountBadge percent={20} />
              <DiscountBadge percent={50} />
              <DiscountBadge percent={70} label="HOT" />
              <DiscountBadge percent={0} label="NEW" />
            </div>
          </div>
        }
        code={`<Price current={{amount: 49}} compare={{amount: 69}} size="lg" />
<DiscountBadge percent={20} />
<DiscountBadge label="NEW" percent={0} />`}
      />
    </article>
  );
}

function FilterSidebarPage() {
  const [price, setPrice] = React.useState<[number, number]>([20, 200]);
  const [brands, setBrands] = React.useState<string[]>(["nike"]);
  const [cats, setCats] = React.useState<string[]>([]);
  const [r, setR] = React.useState<number | null>(4);
  const [avail, setAvail] = React.useState<"any" | "in-stock" | "on-sale">("in-stock");
  return (
    <article>
      <PageHeader
        title="Filter sidebar"
        description="Composes Accordion + Slider + Checkbox + RadioGroup + Rating into a marketplace filter panel."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview centered={false}>
            <FilterSidebar
              priceRange={price}
              priceMin={0}
              priceMax={500}
              priceStep={5}
              onPriceChange={setPrice}
              brands={[
                { value: "nike", label: "Nike", count: 124 },
                { value: "adidas", label: "Adidas", count: 98 },
                { value: "puma", label: "Puma", count: 45 },
                { value: "reebok", label: "Reebok", count: 32 },
              ]}
              selectedBrands={brands}
              onBrandsChange={setBrands}
              categories={[
                { value: "shoes", label: "Shoes", count: 240 },
                { value: "clothing", label: "Clothing", count: 180 },
                { value: "accessories", label: "Accessories", count: 84 },
              ]}
              selectedCategories={cats}
              onCategoriesChange={setCats}
              rating={r}
              onRatingChange={setR}
              availability={avail}
              onAvailabilityChange={setAvail}
              onClear={() => {
                setPrice([0, 500]);
                setBrands([]);
                setCats([]);
                setR(null);
                setAvail("any");
              }}
            />
          </Preview>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<FilterSidebar
  priceRange={[20, 200]}
  priceMin={0} priceMax={500}
  brands={brands} selectedBrands={selected}
  rating={4} onRatingChange={setRating}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function CartDrawerPage() {
  const [open, setOpen] = React.useState(false);
  const [lines, setLines] = React.useState<{ product: Product; quantity: number }[]>([
    { product: sampleProducts[0], quantity: 1 },
    { product: sampleProducts[1], quantity: 2 },
  ]);
  return (
    <article>
      <PageHeader
        title="Cart drawer"
        description="Slide-out cart with line items, quantity steppers, free-shipping progress, and totals."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen(true)}>Open cart</Button>
            <CartDrawer
              open={open}
              onOpenChange={setOpen}
              lines={lines}
              freeShippingThreshold={500}
              onQuantityChange={(id, q) =>
                setLines((ls) =>
                  ls.map((l) => (l.product.id === id ? { ...l, quantity: q } : l))
                )
              }
              onRemove={(id) =>
                setLines((ls) => ls.filter((l) => l.product.id !== id))
              }
              onCheckout={() => alert("Go to checkout")}
              onContinueShopping={() => setOpen(false)}
            />
          </div>
        }
        code={`<CartDrawer
  open={open} onOpenChange={setOpen}
  lines={lines}
  freeShippingThreshold={500}
  onQuantityChange={updateQty}
  onRemove={removeLine}
  onCheckout={...}
/>`}
      />
    </article>
  );
}

function QuickViewPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <article>
      <PageHeader
        title="Quick view"
        description="Mini product detail dialog. Gallery on the left, info + buy actions on the right."
      />
      <Demo
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open quick view</Button>
            <QuickView
              open={open}
              onOpenChange={setOpen}
              product={sampleProducts[0]}
              images={galleryImages}
              rating={4.5}
              reviewCount={1283}
              description="Studio-grade headphones with adaptive noise cancellation, 30-hour battery, and premium materials. The matte finish resists fingerprints."
              onAddToCart={() => setOpen(false)}
            />
          </>
        }
        code={`<QuickView
  open={open} onOpenChange={setOpen}
  product={p}
  images={images}
  rating={4.5} reviewCount={1283}
/>`}
      />
    </article>
  );
}

function MegaMenuPage() {
  return (
    <article>
      <PageHeader
        title="Mega menu"
        description="Multi-level category navigation. Hover a category in the rail, see its sub-categories + featured banner."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview centered={false}>
            <MegaMenu
              categories={[
                {
                  id: "electronics",
                  label: "Electronics",
                  columns: [
                    {
                      heading: "Phones & tablets",
                      items: [
                        { label: "Smartphones", count: 412 },
                        { label: "Tablets", count: 88 },
                        { label: "Cases", count: 1240 },
                      ],
                    },
                    {
                      heading: "Audio",
                      items: [
                        { label: "Headphones", count: 230 },
                        { label: "Speakers", count: 145 },
                        { label: "Soundbars", count: 32 },
                      ],
                    },
                    {
                      heading: "Computers",
                      items: [
                        { label: "Laptops", count: 124 },
                        { label: "Desktops", count: 38 },
                        { label: "Accessories", count: 720 },
                      ],
                    },
                  ],
                  featured: {
                    imageUrl:
                      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=400&q=70",
                    title: "Studio Edition — 20% off",
                  },
                },
                {
                  id: "beauty",
                  label: "Beauty",
                  columns: [
                    {
                      heading: "Face care",
                      items: [
                        { label: "Cleansers", count: 84 },
                        { label: "Moisturizers", count: 156 },
                        { label: "Serums", count: 92 },
                      ],
                    },
                    {
                      heading: "Body",
                      items: [
                        { label: "Lotions" },
                        { label: "Bath" },
                        { label: "Sun care" },
                      ],
                    },
                  ],
                },
                {
                  id: "fashion",
                  label: "Fashion",
                  columns: [
                    {
                      heading: "Women",
                      items: [
                        { label: "Tops" },
                        { label: "Dresses" },
                        { label: "Shoes" },
                      ],
                    },
                    {
                      heading: "Men",
                      items: [
                        { label: "Shirts" },
                        { label: "Pants" },
                        { label: "Shoes" },
                      ],
                    },
                  ],
                },
                { id: "kitchen", label: "Kitchen", columns: [] },
                { id: "home", label: "Home & living", columns: [] },
                { id: "kids", label: "Kids & baby", columns: [] },
                { id: "sports", label: "Sports", columns: [] },
                { id: "auto", label: "Auto", columns: [] },
              ]}
              defaultCategoryId="electronics"
            />
          </Preview>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<MegaMenu
  categories={[
    {
      id: "electronics", label: "Electronics",
      columns: [
        { heading: "Phones", items: [{ label: "Smartphones", count: 412 }] }
      ],
      featured: { imageUrl: "...", title: "Sale" },
    }
  ]}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

function HeroBannerPage() {
  return (
    <article>
      <PageHeader
        title="Hero banner"
        description="Auto-advancing banner carousel with image, gradient overlay, eyebrow / title / description / CTA, and pagination dots."
      />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview centered={false}>
            <HeroBanner
              autoplayMs={5000}
              slides={[
                {
                  id: "s1",
                  imageUrl:
                    "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1600&q=70",
                  eyebrow: "New arrival",
                  title: "Studio-grade audio, redefined",
                  description:
                    "Adaptive noise cancellation, 30-hour battery, premium matte finish.",
                  ctaLabel: "Shop now",
                  ctaHref: "#",
                },
                {
                  id: "s2",
                  imageUrl:
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=70",
                  eyebrow: "Limited offer",
                  title: "Save up to 40% on accessories",
                  description: "Headphone stands, cases, and cables — for a few days only.",
                  ctaLabel: "View deals",
                  ctaHref: "#",
                },
                {
                  id: "s3",
                  imageUrl:
                    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=70",
                  title: "Built for everyday focus",
                  description:
                    "Comfortable for hours, light enough to forget you're wearing them.",
                  ctaLabel: "Explore",
                  ctaHref: "#",
                  align: "right",
                },
              ]}
            />
          </Preview>
        </TabsContent>
        <TabsContent value="code">
          <Code>{`<HeroBanner
  autoplayMs={6000}
  slides={[
    { id: "s1", imageUrl: "...", eyebrow: "New", title: "...", ctaLabel: "Shop" }
  ]}
/>`}</Code>
        </TabsContent>
      </Tabs>
    </article>
  );
}

// ---------------------------------------------------------------------------
// New primitive doc pages
// ---------------------------------------------------------------------------

function SwitchPage() {
  const [on, setOn] = React.useState(true);
  return (
    <article>
      <PageHeader
        title="Switch"
        description="iOS-style toggle. Use for binary settings — preferences, feature flags."
      />
      <Demo
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <Switch checked={on} onCheckedChange={setOn} />
            <SwitchField
              label="Email notifications"
              description="Get updates about your orders."
              checked={on}
              onCheckedChange={setOn}
            />
          </div>
        }
        code={`<Switch checked={on} onCheckedChange={setOn} />
<SwitchField label="Email notifications" description="..." />`}
      />
    </article>
  );
}

function NumberInputPage() {
  const [n, setN] = React.useState(8);
  return (
    <article>
      <PageHeader
        title="Number input"
        description="Stepper with – / + buttons and a typeable input. Three sizes."
      />
      <Demo
        preview={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <NumberInput size="sm" value={n} onValueChange={setN} min={0} max={20} />
            <NumberInput size="md" value={n} onValueChange={setN} min={0} max={20} />
            <NumberInput size="lg" value={n} onValueChange={setN} min={0} max={20} />
          </div>
        }
        code={`<NumberInput value={n} onValueChange={setN} min={0} max={20} />`}
      />
    </article>
  );
}

function ToggleGroupPage() {
  const [pill, setPill] = React.useState("a");
  const [seg, setSeg] = React.useState("grid");
  return (
    <article>
      <PageHeader
        title="Toggle group"
        description="Pill or segmented group of toggles. Single or multiple selection."
      />
      <div className="space-y-6">
        <Variant label="Pills (single)">
          <ToggleGroup type="single" variant="pills" value={pill} onValueChange={(v: string) => v && setPill(v)}>
            <ToggleGroupItem value="a">Option A</ToggleGroupItem>
            <ToggleGroupItem value="b">Option B</ToggleGroupItem>
            <ToggleGroupItem value="c">Option C</ToggleGroupItem>
          </ToggleGroup>
        </Variant>
        <Variant label="Segmented">
          <ToggleGroup type="single" variant="segmented" value={seg} onValueChange={(v: string) => v && setSeg(v)}>
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">List</ToggleGroupItem>
          </ToggleGroup>
        </Variant>
      </div>
    </article>
  );
}

function PopoverPage() {
  return (
    <article>
      <PageHeader
        title="Popover"
        description="Floating panel anchored to a trigger. Used by autocomplete, swatch picker, account menu."
      />
      <Demo
        preview={
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <h4 className="text-[14px] font-semibold">Quick settings</h4>
              <p className="mt-1 text-[13px] text-text-secondary">
                Anchored to the trigger. Closes on outside click.
              </p>
            </PopoverContent>
          </Popover>
        }
        code={`<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
      />
    </article>
  );
}

function ColorSwatchPage() {
  const [c, setC] = React.useState("orange");
  return (
    <article>
      <PageHeader
        title="Color swatch"
        description="Color picker for product variants and filters. Supports disabled / out-of-stock state."
      />
      <Demo
        preview={
          <ColorSwatchGroup
            value={c}
            onValueChange={setC}
            options={[
              { value: "orange", label: "Orange", hex: "#fe6a00" },
              { value: "blue", label: "Blue", hex: "#0ea5e9" },
              { value: "emerald", label: "Emerald", hex: "#10b981" },
              { value: "white", label: "White", hex: "#ffffff" },
              { value: "black", label: "Black", hex: "#171717" },
              { value: "violet", label: "Violet", hex: "#8b5cf6", disabled: true },
            ]}
          />
        }
        code={`<ColorSwatchGroup value={c} onValueChange={setC}
  options={[{ value: "orange", label: "Orange", hex: "#fe6a00" }, ...]} />`}
      />
    </article>
  );
}

function SizeSelectorPage() {
  const [s, setS] = React.useState("m");
  return (
    <article>
      <PageHeader
        title="Size selector"
        description="Size chips. Disabled or out-of-stock states render with strikethrough."
      />
      <Demo
        preview={
          <SizeSelector
            value={s}
            onValueChange={setS}
            options={[
              { value: "xs", label: "XS" },
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L", outOfStock: true },
              { value: "xl", label: "XL" },
            ]}
          />
        }
        code={`<SizeSelector value={s} onValueChange={setS}
  options={[{ value: "s", label: "S" }, { value: "m", label: "M" }, ...]} />`}
      />
    </article>
  );
}

function TimelinePage() {
  return (
    <article>
      <PageHeader
        title="Timeline"
        description="Vertical or horizontal stepper. Used by order tracking and checkout progress."
      />
      <Demo
        preview={
          <Timeline
            steps={[
              { id: "1", title: "Order placed", description: "We received your order.", meta: "Mar 1", status: "complete" },
              { id: "2", title: "Processing", description: "Preparing your items.", meta: "Mar 2", status: "complete" },
              { id: "3", title: "Shipped", description: "On the way to you.", meta: "Mar 3", status: "current" },
              { id: "4", title: "Delivered", status: "upcoming" },
            ]}
          />
        }
        code={`<Timeline steps={[
  { id: "1", title: "Placed", status: "complete" },
  { id: "2", title: "Shipped", status: "current" },
]} />`}
      />
    </article>
  );
}

function TagPage() {
  const [tags, setTags] = React.useState(["red", "size-m", "in-stock"]);
  return (
    <article>
      <PageHeader
        title="Tag"
        description="Removable filter chip. Three variants: default, outline, secondary."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t} onRemove={() => setTags((p) => p.filter((x) => x !== t))}>
                {t}
              </Tag>
            ))}
            <Tag variant="outline">Outline</Tag>
            <Tag variant="secondary">Secondary</Tag>
          </div>
        }
        code={`<Tag onRemove={() => removeFilter()}>red</Tag>`}
      />
    </article>
  );
}

function OtpInputPage() {
  const [code, setCode] = React.useState("");
  return (
    <article>
      <PageHeader
        title="OTP input"
        description="Code-entry boxes for sign-up / 2FA. Auto-advances, supports paste."
      />
      <Demo
        preview={
          <div className="space-y-3">
            <OtpInput length={6} value={code} onChange={setCode} autoFocus />
            <p className="text-[12px] text-text-tertiary">Code: {code || "—"}</p>
          </div>
        }
        code={`<OtpInput length={6} value={code} onChange={setCode}
  onComplete={verify} />`}
      />
    </article>
  );
}

function AutocompletePage() {
  return (
    <article>
      <PageHeader
        title="Autocomplete"
        description="Type-ahead input with suggestions. Keyboard nav (↑/↓/Enter/Esc)."
      />
      <Demo
        preview={
          <div className="w-full max-w-md">
            <Autocomplete
              placeholder="Search products…"
              options={[
                { value: "headphones", label: "Wireless headphones", description: "Electronics" },
                { value: "backpack", label: "Leather backpack", description: "Bags" },
                { value: "espresso", label: "Espresso machine", description: "Home" },
              ]}
            />
          </div>
        }
        code={`<Autocomplete options={suggestions} onSelect={pick} />`}
      />
    </article>
  );
}

function QuantityStepperPage() {
  const [q, setQ] = React.useState(2);
  return (
    <article>
      <PageHeader
        title="Quantity stepper"
        description="Cart-line variant of NumberInput. Switches to a delete icon at the minimum."
      />
      <Demo
        preview={
          <div className="space-y-3">
            <QuantityStepper value={q} onChange={setQ} size="sm" min={1} removeAtMin onRemove={() => setQ(0)} />
            <QuantityStepper value={q} onChange={setQ} size="md" min={1} />
          </div>
        }
        code={`<QuantityStepper value={q} onChange={setQ}
  min={1} removeAtMin onRemove={remove} />`}
      />
    </article>
  );
}

// ---------------------------------------------------------------------------
// Marketplace doc pages
// ---------------------------------------------------------------------------

function SortDropdownPage() {
  const [sort, setSort] = React.useState("popular");
  return (
    <article>
      <PageHeader
        title="Sort dropdown"
        description="Standard marketplace sort options — popular, newest, price asc/desc, rating, discount."
      />
      <Demo
        preview={
          <SortDropdown
            options={defaultSortOptions}
            value={sort}
            onValueChange={setSort}
          />
        }
        code={`<SortDropdown options={defaultSortOptions}
  value={sort} onValueChange={setSort} />`}
      />
    </article>
  );
}

function ViewTogglePage() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  return (
    <article>
      <PageHeader
        title="View toggle"
        description="Grid ↔ list view switch for product listings."
      />
      <Demo
        preview={<ViewToggle value={view} onValueChange={setView} />}
        code={`<ViewToggle value={view} onValueChange={setView} />`}
      />
    </article>
  );
}

function CategoryTilePage() {
  return (
    <article>
      <PageHeader
        title="Category tile grid"
        description="Marketplace homepage category browse. Image background, label, optional count."
      />
      <Preview centered={false}>
        <CategoryTileGrid
          columns={4}
          tiles={[
            { id: "1", label: "Electronics", count: 12500, icon: <Package /> },
            { id: "2", label: "Home & Living", count: 8400, icon: <Home /> },
            { id: "3", label: "Fashion", count: 22000, icon: <ShoppingBag /> },
            { id: "4", label: "Deals", count: 540, icon: <TagIcon /> },
          ]}
        />
      </Preview>
    </article>
  );
}

function PromoBannerPage() {
  const ends = new Date(Date.now() + 1000 * 60 * 60 * 26);
  return (
    <article>
      <PageHeader
        title="Promo banner"
        description="Hero promotional banner with optional countdown timer."
      />
      <Preview centered={false}>
        <PromoBanner
          eyebrow="Limited time"
          title="Spring sale — up to 40% off"
          description="Free shipping on every order over $50."
          ctaLabel="Shop the sale"
          endsAt={ends}
        />
      </Preview>
    </article>
  );
}

function ProductStripPage() {
  return (
    <article>
      <PageHeader
        title="Product strip"
        description="Horizontal carousel of product cards. Use for recently-viewed and recommended."
      />
      <Preview centered={false}>
        <ProductStrip
          title="Recently viewed"
          subtitle="Pick up where you left off."
          products={sampleProducts}
          viewAllHref="#all"
        />
      </Preview>
    </article>
  );
}

function ActiveFiltersBarPage() {
  const [filters, setFilters] = React.useState([
    { id: "1", group: "Color", label: "Orange" },
    { id: "2", group: "Size", label: "M" },
    { id: "3", group: "Brand", label: "Webmarket" },
  ]);
  return (
    <article>
      <PageHeader
        title="Active filters bar"
        description="Shows applied filters above results with a Clear all action."
      />
      <Preview centered={false}>
        <ActiveFiltersBar
          filters={filters}
          resultsCount={1245}
          onRemove={(id) => setFilters((f) => f.filter((x) => x.id !== id))}
          onClearAll={() => setFilters([])}
        />
      </Preview>
    </article>
  );
}

function SearchWithSuggestionsPage() {
  return (
    <article>
      <PageHeader
        title="Search with suggestions"
        description="Marketplace search with grouped suggestions — recent, trending, categories."
      />
      <Preview>
        <div className="w-full max-w-xl">
          <SearchWithSuggestions
            suggestions={[
              { value: "wireless headphones", label: "wireless headphones", group: "recent" },
              { value: "espresso", label: "espresso", group: "recent" },
              { value: "spring jackets", label: "spring jackets", group: "trending" },
              { value: "running shoes", label: "running shoes", group: "trending" },
              { value: "Electronics", label: "Electronics", group: "category" },
              { value: "Home & Living", label: "Home & Living", group: "category" },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Product detail doc pages
// ---------------------------------------------------------------------------

function ProductCardListPage() {
  return (
    <article>
      <PageHeader
        title="Product card (list)"
        description="Horizontal layout of ProductCard. For list view in product grids."
      />
      <Preview centered={false}>
        <ProductCardList
          product={sampleProducts[0]}
          description="Industry-leading noise cancellation, 30-hour battery, with quick charge support."
          seller="Webmarket Audio"
          deliveryEta="Tomorrow"
          reviewCount={482}
          onAddToCart={() => undefined}
          onToggleWishlist={() => undefined}
        />
      </Preview>
    </article>
  );
}

function VariantPickerPage() {
  const [color, setColor] = React.useState("orange");
  const [size, setSize] = React.useState("m");
  return (
    <article>
      <PageHeader
        title="Variant picker"
        description="Composes ColorSwatchGroup + SizeSelector with labels and an optional size guide link."
      />
      <Preview>
        <div className="w-full max-w-md">
          <VariantPicker
            colors={[
              { value: "orange", label: "Orange", hex: "#fe6a00" },
              { value: "black", label: "Black", hex: "#171717" },
              { value: "ivory", label: "Ivory", hex: "#f5f5dc" },
            ]}
            selectedColor={color}
            onColorChange={setColor}
            sizes={[
              { value: "s", label: "S" },
              { value: "m", label: "M" },
              { value: "l", label: "L", outOfStock: true },
              { value: "xl", label: "XL" },
            ]}
            selectedSize={size}
            onSizeChange={setSize}
            sizeGuideHref="#size-guide"
          />
        </div>
      </Preview>
    </article>
  );
}

function StockBadgePage() {
  return (
    <article>
      <PageHeader
        title="Stock badge"
        description="Inventory status indicator. Five states: in-stock, low, out, preorder, backorder."
      />
      <Demo
        preview={
          <div className="flex flex-wrap gap-2">
            <StockBadge state="in" />
            <StockBadge state="low" count={3} />
            <StockBadge state="out" />
            <StockBadge state="preorder" />
            <StockBadge state="backorder" />
          </div>
        }
        code={`<StockBadge state="low" count={3} />`}
      />
    </article>
  );
}

function DeliveryCardPage() {
  return (
    <article>
      <PageHeader
        title="Delivery card"
        description="Shows delivery options for a product — ship to address or pickup."
      />
      <Preview>
        <div className="w-full max-w-md">
          <DeliveryCard
            address="125 Market St, San Francisco, CA"
            onChangeAddress={() => undefined}
            options={[
              { id: "1", type: "ship", title: "Standard delivery", eta: "Tue, Mar 5 — Thu, Mar 7", price: "Free" },
              { id: "2", type: "ship", title: "Express", eta: "Tomorrow by 9pm", price: "$9.99" },
              { id: "3", type: "pickup", title: "Pickup point", eta: "Today after 4pm", description: "Webmarket Hub · 0.4 mi", price: "Free" },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

function SellerCardPage() {
  return (
    <article>
      <PageHeader
        title="Seller card"
        description="Information about a marketplace seller with rating, response time, and CTA."
      />
      <Preview>
        <div className="w-full max-w-md">
          <SellerCard
            name="Webmarket Audio"
            href="#shop"
            rating={4.8}
            reviewCount={2340}
            shipsFrom="California, US"
            responseTime="2 hours"
            verified
            onMessage={() => undefined}
          />
        </div>
      </Preview>
    </article>
  );
}

function ReviewsBlockPage() {
  return (
    <article>
      <PageHeader
        title="Reviews block"
        description="Average rating, distribution histogram, and a list of reviews with verified-buyer badges."
      />
      <Preview centered={false}>
        <ReviewsBlock
          averageRating={4.6}
          totalReviews={2340}
          distribution={{ 5: 1820, 4: 360, 3: 110, 2: 30, 1: 20 }}
          reviews={[
            {
              id: "1",
              authorName: "Maria S.",
              date: "Mar 1, 2026",
              rating: 5,
              title: "Sounds incredible",
              body: "Bass is rich, comfortable for hours-long sessions, and the noise cancellation is top-notch.",
              verifiedPurchase: true,
              helpfulCount: 42,
            },
            {
              id: "2",
              authorName: "Daniel R.",
              date: "Feb 24, 2026",
              rating: 4,
              body: "Great battery life. The case could be a bit smaller, but otherwise these are excellent.",
              verifiedPurchase: true,
              helpfulCount: 18,
            },
          ]}
          onWriteReview={() => undefined}
        />
      </Preview>
    </article>
  );
}

function ReviewFormPage() {
  return (
    <article>
      <PageHeader
        title="Review form"
        description="Submit a review with rating, headline, body, and optional photo uploads."
      />
      <Preview>
        <div className="w-full max-w-lg">
          <ReviewForm onSubmit={() => undefined} onCancel={() => undefined} />
        </div>
      </Preview>
    </article>
  );
}

function QABlockPage() {
  return (
    <article>
      <PageHeader
        title="Q&A block"
        description="Customer questions and answers, with an Ask form."
      />
      <Preview centered={false}>
        <QABlock
          onAsk={() => undefined}
          entries={[
            {
              id: "1",
              question: "Does this work with iPhone?",
              answer: "Yes, it pairs over Bluetooth 5.3 with iOS, Android, and any device with a 3.5mm jack.",
              answeredBy: "Webmarket Audio",
              date: "Feb 28, 2026",
              helpfulCount: 12,
              answersCount: 1,
            },
            {
              id: "2",
              question: "How long does the battery last on a single charge?",
              answer: "Up to 30 hours with ANC on, 40 with it off.",
              answeredBy: "A. Verified buyer",
              date: "Feb 20, 2026",
              answersCount: 3,
            },
          ]}
        />
      </Preview>
    </article>
  );
}

function FrequentlyBoughtPage() {
  return (
    <article>
      <PageHeader
        title="Frequently bought together"
        description="Bundle suggestions with checkboxes and a combined total."
      />
      <Preview centered={false}>
        <FrequentlyBought
          anchor={sampleProducts[0]}
          bundle={[sampleProducts[1], sampleProducts[3]]}
          onAddBundle={() => undefined}
        />
      </Preview>
    </article>
  );
}

function ComparisonTablePage() {
  return (
    <article>
      <PageHeader
        title="Comparison table"
        description="Side-by-side feature comparison. Sticky first column, true/false renders as ✓/—."
      />
      <Preview centered={false}>
        <ComparisonTable
          columnHeaders={["Standard", "Pro", "Premium"]}
          groups={[
            {
              label: "Audio",
              rows: [
                { label: "Drivers", values: ["30mm", "40mm", "50mm"] },
                { label: "Active noise cancellation", values: [false, true, true] },
                { label: "Spatial audio", values: [false, false, true], highlight: true },
              ],
            },
            {
              label: "Connectivity",
              rows: [
                { label: "Bluetooth", values: ["5.0", "5.2", "5.3"] },
                { label: "Multipoint", values: [false, true, true] },
              ],
            },
          ]}
        />
      </Preview>
    </article>
  );
}

function SpecTablePage() {
  return (
    <article>
      <PageHeader
        title="Spec table"
        description="Collapsible product specifications grouped by category."
      />
      <Preview centered={false}>
        <SpecTable
          groups={[
            {
              id: "general",
              title: "General",
              rows: [
                { label: "Brand", value: "Webmarket Audio" },
                { label: "Model", value: "WA-300" },
                { label: "Color", value: "Black" },
              ],
            },
            {
              id: "audio",
              title: "Audio",
              rows: [
                { label: "Driver size", value: "40mm" },
                { label: "Frequency response", value: "20 Hz – 20 kHz" },
                { label: "Impedance", value: "32 Ω" },
              ],
            },
          ]}
        />
      </Preview>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Cart & checkout doc pages
// ---------------------------------------------------------------------------

function CartLineItemPage() {
  const [q, setQ] = React.useState(2);
  return (
    <article>
      <PageHeader
        title="Cart line item"
        description="A single row in the cart with quantity stepper, remove, and save-for-later."
      />
      <Preview centered={false}>
        <CartLineItemRow
          item={{
            id: "1",
            title: "Wireless noise-cancelling headphones",
            imageUrl: sampleProducts[0].imageUrl,
            price: { amount: 249 },
            comparePrice: { amount: 329 },
            quantity: q,
            variant: "Black · One size",
            stockHint: "Only 3 left in stock",
          }}
          onQuantityChange={(_, next) => setQ(next)}
          onRemove={() => undefined}
          onSaveForLater={() => undefined}
        />
      </Preview>
    </article>
  );
}

function EmptyCartPage() {
  return (
    <article>
      <PageHeader
        title="Empty cart"
        description="Empty state for the cart with a continue-shopping CTA."
      />
      <Preview>
        <EmptyCart onContinueShopping={() => undefined} />
      </Preview>
    </article>
  );
}

function CouponInputPage() {
  const [applied, setApplied] = React.useState<{ code: string; description?: React.ReactNode } | null>(null);
  return (
    <article>
      <PageHeader
        title="Coupon input"
        description="Promo / coupon code entry. Switches to applied state with a remove action."
      />
      <Preview>
        <div className="w-full max-w-md">
          <CouponInput
            applied={applied}
            onApply={(code) => setApplied({ code, description: "10% off your order" })}
            onRemove={() => setApplied(null)}
          />
        </div>
      </Preview>
    </article>
  );
}

function OrderSummaryPage() {
  return (
    <article>
      <PageHeader
        title="Order summary"
        description="Subtotal, discounts, shipping, tax, total. Used in cart and checkout."
      />
      <Preview>
        <div className="w-full max-w-sm">
          <OrderSummary
            itemCount={3}
            lines={[
              { id: "subtotal", label: "Subtotal", value: { amount: 478 } },
              { id: "promo", label: "SPRING10", value: { amount: 47.8 }, discount: true },
              { id: "shipping", label: "Shipping", value: "Free" },
              { id: "tax", label: "Tax (estimated)", value: { amount: 38.5 }, muted: true },
            ]}
            total={{ amount: 468.7 }}
            onCheckout={() => undefined}
            footnote="Taxes and shipping calculated at checkout."
          />
        </div>
      </Preview>
    </article>
  );
}

function AddressCardPage() {
  return (
    <article>
      <PageHeader
        title="Address card"
        description="A single saved shipping address with select / edit / delete actions."
      />
      <Preview centered={false}>
        <div className="grid gap-3 sm:grid-cols-2">
          <AddressCard
            address={{
              id: "1",
              recipientName: "John Doe",
              street: "125 Market St",
              city: "San Francisco",
              region: "CA",
              postalCode: "94103",
              country: "United States",
              phone: "+1 (415) 555-0102",
              label: "Home",
              isDefault: true,
            }}
            selected
            onEdit={() => undefined}
            onDelete={() => undefined}
          />
          <AddressCard
            address={{
              id: "2",
              recipientName: "John Doe",
              street: "500 Howard St, Suite 400",
              city: "San Francisco",
              region: "CA",
              postalCode: "94105",
              country: "United States",
              label: "Work",
            }}
            onEdit={() => undefined}
            onDelete={() => undefined}
          />
        </div>
      </Preview>
    </article>
  );
}

function DeliveryMethodPickerPage() {
  const [method, setMethod] = React.useState("standard");
  return (
    <article>
      <PageHeader
        title="Delivery method picker"
        description="Rich-content radio cards for shipping / pickup options."
      />
      <Preview>
        <div className="w-full max-w-md">
          <DeliveryMethodPicker
            value={method}
            onValueChange={setMethod}
            methods={[
              { id: "standard", kind: "standard", title: "Standard", eta: "Tue, Mar 5 — Thu, Mar 7", price: "Free" },
              { id: "express", kind: "express", title: "Express", eta: "Tomorrow by 9pm", price: "$9.99" },
              { id: "pickup", kind: "pickup", title: "Pickup point", eta: "Today after 4pm", description: "Webmarket Hub · 0.4 mi", price: "Free" },
              { id: "same", kind: "same-day", title: "Same-day", eta: "Today by 10pm", price: "$19.99", disabled: true },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

function PaymentMethodPickerPage() {
  const [method, setMethod] = React.useState("card-1");
  return (
    <article>
      <PageHeader
        title="Payment method picker"
        description="Rich-content radio cards for saved payment methods."
      />
      <Preview>
        <div className="w-full max-w-md">
          <PaymentMethodPicker
            value={method}
            onValueChange={setMethod}
            methods={[
              { id: "card-1", kind: "card", title: "Visa ending in 4242", description: "Expires 12/27" },
              { id: "wallet", kind: "wallet", title: "Apple Pay" },
              { id: "bank", kind: "bank", title: "Bank transfer", description: "ACH · 2-3 business days" },
              { id: "cod", kind: "cod", title: "Cash on delivery", badge: "+ $2 fee" },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

function CheckoutStepperPage() {
  return (
    <article>
      <PageHeader
        title="Checkout stepper"
        description="Horizontal progress through checkout stages."
      />
      <Preview>
        <CheckoutStepper current="delivery" />
      </Preview>
    </article>
  );
}

function OrderConfirmationPage() {
  return (
    <article>
      <PageHeader
        title="Order confirmation"
        description="Post-checkout success card with order number, delivery estimate, and tracking link."
      />
      <Preview centered={false}>
        <OrderConfirmation
          orderNumber="WM-30482"
          email="john@example.com"
          estimatedDelivery="Tue, Mar 5 — Thu, Mar 7"
          shippingAddress={
            <>
              John Doe
              <br />
              125 Market St
              <br />
              San Francisco, CA 94103
            </>
          }
          total="$468.70"
          trackingHref="#track"
          receiptHref="#receipt"
        />
      </Preview>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Account & auth doc pages
// ---------------------------------------------------------------------------

function OrderHistoryRowPage() {
  return (
    <article>
      <PageHeader
        title="Order history row"
        description="A single order in the account order history list."
      />
      <Preview centered={false}>
        <div className="space-y-2">
          <OrderHistoryRow
            order={{
              id: "1",
              orderNumber: "WM-30482",
              placedAt: "Mar 1, 2026",
              status: "shipped",
              total: "$468.70",
              itemCount: 3,
              thumbnails: sampleProducts.slice(0, 3).map((p) => p.imageUrl),
              href: "#order-30482",
            }}
            onTrack={() => undefined}
            onReorder={() => undefined}
          />
          <OrderHistoryRow
            order={{
              id: "2",
              orderNumber: "WM-30401",
              placedAt: "Feb 15, 2026",
              status: "delivered",
              total: "$119.00",
              itemCount: 1,
              thumbnails: [sampleProducts[1].imageUrl],
            }}
            onReorder={() => undefined}
          />
        </div>
      </Preview>
    </article>
  );
}

function OrderTrackingPage() {
  return (
    <article>
      <PageHeader
        title="Order tracking"
        description="Vertical timeline of shipping events for a single order."
      />
      <Preview>
        <div className="w-full max-w-md">
          <OrderTracking
            carrier="UPS"
            trackingNumber="1Z 9999 9999 9999 9999"
            events={[
              { stage: "placed", title: "Order placed", at: "Mar 1, 9:32 AM" },
              { stage: "processing", title: "Processing", description: "Items being prepared", at: "Mar 1, 4:15 PM" },
              { stage: "shipped", title: "Shipped", description: "In transit with UPS", at: "Mar 2, 8:01 AM" },
              { stage: "out-for-delivery", title: "Out for delivery", description: "Estimated by 7pm" },
              { stage: "delivered", title: "Delivered" },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

function AddressBookPage() {
  const [selected, setSelected] = React.useState("1");
  return (
    <article>
      <PageHeader
        title="Address book"
        description="Grid of saved shipping addresses with an add-new tile."
      />
      <Preview centered={false}>
        <AddressBook
          selectedId={selected}
          onSelect={setSelected}
          onAdd={() => undefined}
          onEdit={() => undefined}
          onDelete={() => undefined}
          addresses={[
            {
              id: "1",
              recipientName: "John Doe",
              street: "125 Market St",
              city: "San Francisco",
              region: "CA",
              postalCode: "94103",
              country: "United States",
              label: "Home",
              isDefault: true,
            },
            {
              id: "2",
              recipientName: "John Doe",
              street: "500 Howard St, Suite 400",
              city: "San Francisco",
              region: "CA",
              postalCode: "94105",
              country: "United States",
              label: "Work",
            },
          ]}
        />
      </Preview>
    </article>
  );
}

function LoyaltyCardPage() {
  return (
    <article>
      <PageHeader
        title="Loyalty card"
        description="Display the user's rewards tier, points balance, and progress to the next tier."
      />
      <Preview>
        <div className="w-full max-w-sm">
          <LoyaltyCard
            tier="Gold member"
            points={2340}
            pointsToNext={660}
            nextTier="Platinum"
            perks={["Free express shipping", "Early access to sales", "Birthday bonus"]}
            onRedeem={() => undefined}
          />
        </div>
      </Preview>
    </article>
  );
}

function NotificationBellPage() {
  return (
    <article>
      <PageHeader
        title="Notification bell"
        description="Header notification dropdown with unread badge and mark-all-read action."
      />
      <Demo
        preview={
          <NotificationBell
            onMarkAllRead={() => undefined}
            notifications={[
              {
                id: "1",
                title: "Your order has shipped",
                description: "WM-30482 is on its way.",
                date: "2 hours ago",
              },
              {
                id: "2",
                title: "Price drop on a wishlisted item",
                description: "Leather backpack is now $89.",
                date: "Yesterday",
              },
              {
                id: "3",
                title: "Welcome to Webmarket",
                date: "Mar 1",
                read: true,
              },
            ]}
          />
        }
        code={`<NotificationBell notifications={items}
  onMarkAllRead={markAllRead} />`}
      />
    </article>
  );
}

function AccountDropdownPage() {
  return (
    <article>
      <PageHeader
        title="Account dropdown"
        description="Header avatar trigger with profile, orders, wishlist, settings, and sign-out."
      />
      <Demo
        preview={
          <AccountDropdown
            user={{ name: "John Doe", email: "john@example.com" }}
            showName
            onSignOut={() => undefined}
          />
        }
        code={`<AccountDropdown
  user={{ name: "John Doe", email: "john@example.com" }}
  onSignOut={signOut} />`}
      />
    </article>
  );
}

function WishlistGridPage() {
  return (
    <article>
      <PageHeader
        title="Wishlist grid"
        description="Saved products grid with a per-item remove and add-to-cart."
      />
      <Preview centered={false}>
        <WishlistGrid
          items={sampleProducts}
          onRemove={() => undefined}
          onAddToCart={() => undefined}
        />
      </Preview>
    </article>
  );
}

function SignInFormPage() {
  return (
    <article>
      <PageHeader
        title="Sign-in form"
        description="Email/password sign-in with optional social providers and remember-me."
      />
      <Preview>
        <div className="w-full max-w-sm">
          <SignInForm
            signUpHref="#sign-up"
            onForgotPassword={() => undefined}
            onSocialSignIn={() => undefined}
          />
        </div>
      </Preview>
    </article>
  );
}

function SignUpFormPage() {
  return (
    <article>
      <PageHeader
        title="Sign-up form"
        description="Create-account form with password strength meter, terms agreement, and newsletter opt-in."
      />
      <Preview>
        <div className="w-full max-w-sm">
          <SignUpForm signInHref="#sign-in" />
        </div>
      </Preview>
    </article>
  );
}

function OtpFormPage() {
  return (
    <article>
      <PageHeader
        title="OTP form"
        description="Verification code entry with resend timer, used after sign-up or 2FA challenge."
      />
      <Preview>
        <OtpForm
          destination="john@example.com"
          length={6}
          resendSeconds={20}
          onSubmit={() => undefined}
          onResend={() => undefined}
          onChangeDestination={() => undefined}
        />
      </Preview>
    </article>
  );
}

function ForgotPasswordFormPage() {
  return (
    <article>
      <PageHeader
        title="Forgot password form"
        description="Email entry to request a password reset link."
      />
      <Preview>
        <ForgotPasswordForm signInHref="#sign-in" onSubmit={() => undefined} />
      </Preview>
    </article>
  );
}

function SeoPage() {
  return (
    <article>
      <PageHeader
        title="SEO &amp; structured data"
        description="A headless `<Seo />` helper that imperatively syncs <title>, meta description, canonical, Open Graph, Twitter cards, robots, and JSON-LD as props change. Plus typed builders for Product / Breadcrumb / Organization JSON-LD."
      />

      <div className="space-y-6">
        <section>
          <h3 className="text-h5 font-semibold text-text-primary">
            What it does
          </h3>
          <p className="mt-2 text-p1 text-text-secondary">
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-mono">
              {"<Seo />"}
            </code>{" "}
            renders nothing — it patches{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-mono">
              document.head
            </code>{" "}
            via <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-mono">useEffect</code>.
            Drop one near the root of every route. Pass{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-mono">jsonLd</code>{" "}
            to inject Schema.org structured data; use the typed builders for
            Product / Breadcrumb / Organization.
          </p>
        </section>

        <section>
          <h3 className="text-h5 font-semibold text-text-primary">
            Per-route example
          </h3>
          <Code>{`import { Seo, productJsonLd } from "@/components/seo/seo";

function ProductPage({ product }) {
  return (
    <>
      <Seo
        title={product.title}
        titleTemplate="Webmarket"
        description={product.description}
        canonical={\`https://webmarket.tj/product/\${product.id}\`}
        image={product.imageUrl}
        imageAlt={product.title}
        type="product"
        jsonLd={productJsonLd({
          name: product.title,
          description: product.description,
          image: product.imageUrl,
          sku: product.id,
          brand: "Webmarket",
          price: product.price.amount,
          priceCurrency: "USD",
          availability: "InStock",
          rating: { value: 4.6, count: 2340 },
          url: window.location.href,
        })}
      />
      {/* page UI */}
    </>
  );
}`}</Code>
        </section>

        <section>
          <h3 className="text-h5 font-semibold text-text-primary">
            Caveats
          </h3>
          <p className="mt-2 text-p1 text-text-secondary">
            This is a runtime DOM patch. It works for in-app navigation, link
            previews opened from your own app, and crawlers that execute JS
            (Googlebot does — most others don&apos;t). For full crawler
            coverage, also pre-render or SSR your routes (Vite SSG, Next.js,
            Astro, etc.). Static fallbacks live in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-mono">
              index.html
            </code>{" "}
            so an unrendered first byte still has sane meta tags.
          </p>
        </section>

        <section>
          <h3 className="text-h5 font-semibold text-text-primary">
            JSON-LD builders
          </h3>
          <Code>{`// Product detail page
<Seo jsonLd={productJsonLd({ ... })} />

// Catalog page with breadcrumb
<Seo
  jsonLd={[
    breadcrumbJsonLd({
      items: [
        { name: "Home",        url: "https://example.com/" },
        { name: "Electronics", url: "https://example.com/electronics" },
        { name: "Audio",       url: "https://example.com/electronics/audio" },
      ],
    }),
    organizationJsonLd({
      name: "Webmarket",
      url: "https://webmarket.tj",
      logo: "https://webmarket.tj/logo.png",
      sameAs: ["https://t.me/webmarket", "https://instagram.com/webmarket"],
    }),
  ]}
/>`}</Code>
        </section>
      </div>

      {/* live demo: this Seo updates the page title while you're on this doc */}
      <Seo
        title="SEO & structured data"
        titleTemplate="Webmarket Components"
        description="Headless Seo helper for SPA routes: title, description, OG, Twitter, canonical, robots, JSON-LD."
        canonical={
          typeof window !== "undefined" ? window.location.href : undefined
        }
        jsonLd={breadcrumbJsonLd({
          items: [
            { name: "Webmarket Components", url: "https://github.com/jalolovshohrukh/webmarket_components" },
            { name: "SEO", url: "https://github.com/jalolovshohrukh/webmarket_components#seo" },
          ],
        })}
      />
    </article>
  );
}

function MobileNavBarPage() {
  const [active, setActive] = React.useState("home");
  return (
    <article>
      <PageHeader
        title="Mobile nav bar"
        description="Bottom tab bar for mobile. Fixed to the viewport bottom, respects iOS safe-area-inset, hides on `lg` and up. Drop it once at the page root."
      />
      <Preview centered={false}>
        <div className="relative h-[420px] overflow-hidden rounded-xl border border-gray-200 bg-muted/30">
          <div className="px-4 pt-4 text-[12px] text-text-tertiary">
            ↓ Bottom-pinned nav bar
          </div>
          <div className="absolute inset-x-0 bottom-0">
            <nav
              aria-label="Mobile navigation"
              className="bg-background border-t border-gray-200"
            >
              <ul
                className="grid"
                style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
              >
                {(
                  [
                    { id: "home", label: "Home", icon: <HomeIcon /> },
                    { id: "wish", label: "Wishlist", icon: <HeartIcon /> },
                    {
                      id: "cart",
                      label: "Cart",
                      icon: <ShoppingCartIcon />,
                      badge: 3,
                    },
                    { id: "compare", label: "Compare", icon: <Repeat /> },
                  ] as const
                ).map((item) => {
                  const isActive = item.id === active;
                  return (
                    <li key={item.id} className="relative">
                      <button
                        type="button"
                        onClick={() => setActive(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className="flex w-full flex-col items-center justify-center gap-0 py-2 min-h-12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      >
                        <span
                          className={cn(
                            "relative grid place-items-center [&_svg]:size-5",
                            isActive ? "text-primary" : "text-text-tertiary"
                          )}
                        >
                          {item.icon}
                          {"badge" in item && (item as { badge?: number }).badge ? (
                            <span className="absolute -right-2 -top-1 grid h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground">
                              {(item as { badge: number }).badge}
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 text-[10.5px] font-medium leading-tight",
                            isActive ? "text-primary" : "text-text-tertiary"
                          )}
                        >
                          {item.label}
                        </span>
                      </button>
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-x-4 top-0 h-0.5 rounded-b-full bg-primary"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
        <p className="mt-3 text-[12px] text-text-tertiary">
          Active: <span className="font-mono text-text-primary">{active}</span>{" "}
          (this preview renders the bar inside a frame so you can see it without
          docking it to the actual viewport).
        </p>
      </Preview>
      <div className="mt-6">
        <Code>{`<MobileNavBar
  activeId={active}
  onItemClick={(item) => setActive(item.id)}
  items={[
    { id: "home",    label: "Home",    icon: <Home /> },
    { id: "wish",    label: "Wishlist", icon: <Heart /> },
    { id: "cart",    label: "Cart",    icon: <ShoppingCart />, badge: 3 },
    { id: "compare", label: "Compare", icon: <Repeat /> },
  ]}
/>`}</Code>
      </div>
      <p className="mt-4 text-[13px] text-text-secondary">
        For real usage, drop a single <code>{"<MobileNavBar>"}</code> at the root
        of your app — it&apos;s position-fixed so it floats above page content.
        Use the <code>floating</code> prop for the rounded-corner card style.
        Hides automatically at <code>lg</code> and up; pair with a desktop side
        nav for that breakpoint.
      </p>
      {/* Live one stuck to the actual viewport bottom for this page only */}
      <MobileNavBar
        activeId={active}
        onItemClick={(item) => setActive(item.id)}
        items={[
          { id: "home", label: "Home", icon: <HomeIcon /> },
          { id: "wish", label: "Wishlist", icon: <HeartIcon /> },
          { id: "cart", label: "Cart", icon: <ShoppingCartIcon />, badge: 3 },
          { id: "profile", label: "Account", icon: <UserIcon /> },
        ]}
      />
    </article>
  );
}

// ---------------------------------------------------------------------------
// Charts — sample data
// ---------------------------------------------------------------------------

const monthlyData = [
  { month: "Jan", users: 1240, revenue: 4200, orders: 120 },
  { month: "Feb", users: 1380, revenue: 4800, orders: 142 },
  { month: "Mar", users: 1620, revenue: 5800, orders: 168 },
  { month: "Apr", users: 1480, revenue: 5400, orders: 154 },
  { month: "May", users: 1820, revenue: 6900, orders: 192 },
  { month: "Jun", users: 2040, revenue: 7800, orders: 224 },
  { month: "Jul", users: 2210, revenue: 8500, orders: 248 },
];

const categoryData = [
  { category: "Electronics", value: 4800 },
  { category: "Fashion", value: 3200 },
  { category: "Home", value: 2400 },
  { category: "Beauty", value: 1800 },
  { category: "Sports", value: 1200 },
];

const pieData = [
  { name: "Direct", value: 38 },
  { name: "Search", value: 26 },
  { name: "Social", value: 18 },
  { name: "Referral", value: 12 },
  { name: "Email", value: 6 },
];

const funnelData = [
  { name: "Visitors", value: 12400 },
  { name: "Signups", value: 4800 },
  { name: "Activated", value: 2400 },
  { name: "Purchased", value: 920 },
  { name: "Repeat buyers", value: 312 },
];

const radarData = [
  { trait: "Speed", a: 88, b: 72 },
  { trait: "Quality", a: 92, b: 80 },
  { trait: "Price", a: 64, b: 90 },
  { trait: "Support", a: 78, b: 70 },
  { trait: "Range", a: 84, b: 60 },
];

const heatmapData = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = ["6a", "9a", "12p", "3p", "6p", "9p"];
  const out: { x: string; y: string; value: number }[] = [];
  let seed = 1;
  for (const y of days)
    for (const x of hours) {
      seed = (seed * 9301 + 49297) % 233280;
      const r = seed / 233280;
      out.push({
        x,
        y,
        value: Math.round(r * 100 + (x === "12p" || x === "6p" ? 40 : 0)),
      });
    }
  return out;
})();

const activityDays = (() => {
  const out: { date: string; value: number }[] = [];
  const today = new Date();
  let seed = 7;
  for (let i = 119; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    out.push({
      date: d.toISOString().slice(0, 10),
      value: Math.round(r * 12),
    });
  }
  return out;
})();

const sparkSeries = [12, 14, 13, 18, 17, 22, 24, 21, 28, 32, 30, 36];

// ---------------------------------------------------------------------------
// Charts — doc pages
// ---------------------------------------------------------------------------

function LineChartPage() {
  return (
    <article>
      <PageHeader
        title="Line chart"
        description="Single- or multi-series time-series chart, themed via the chart palette."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <LineChart
            data={monthlyData}
            xKey="month"
            config={{
              users: { label: "Users", color: "hsl(var(--chart-1))" },
              orders: { label: "Orders", color: "hsl(var(--chart-2))" },
            }}
            showLegend
          />
        </div>
      </Preview>
    </article>
  );
}

function AreaChartPage() {
  return (
    <article>
      <PageHeader
        title="Area chart"
        description="Filled area with optional gradient and stacking."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <AreaChart
            data={monthlyData}
            xKey="month"
            stacked
            config={{
              users: { label: "Users", color: "hsl(var(--chart-1))" },
              orders: { label: "Orders", color: "hsl(var(--chart-3))" },
            }}
            showLegend
          />
        </div>
      </Preview>
    </article>
  );
}

function BarChartPage() {
  return (
    <article>
      <PageHeader
        title="Bar chart"
        description="Vertical bars. Use for categorical totals."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <BarChart
            data={categoryData}
            xKey="category"
            config={{ value: { label: "Revenue", color: "hsl(var(--chart-1))" } }}
          />
        </div>
      </Preview>
    </article>
  );
}

function HorizontalBarChartPage() {
  return (
    <article>
      <PageHeader
        title="Horizontal bar chart"
        description="Same data, rotated layout. Useful for ranked lists with long category names."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <HorizontalBarChart
            data={categoryData}
            yKey="category"
            yWidth={88}
            config={{
              value: { label: "Revenue", color: "hsl(var(--chart-2))" },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function StackedBarChartPage() {
  return (
    <article>
      <PageHeader
        title="Stacked bar chart"
        description="Composition over time. Toggle `grouped` for side-by-side bars instead."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <StackedBarChart
            data={monthlyData}
            xKey="month"
            config={{
              users: { label: "Users", color: "hsl(var(--chart-1))" },
              orders: { label: "Orders", color: "hsl(var(--chart-4))" },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function PieChartPage() {
  return (
    <article>
      <PageHeader
        title="Pie chart"
        description="Share-of-total. Five distinct slices fits comfortably; beyond that prefer a bar."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <PieChart
            data={pieData}
            config={{
              Direct: { label: "Direct", color: "hsl(var(--chart-1))" },
              Search: { label: "Search", color: "hsl(var(--chart-2))" },
              Social: { label: "Social", color: "hsl(var(--chart-3))" },
              Referral: { label: "Referral", color: "hsl(var(--chart-4))" },
              Email: { label: "Email", color: "hsl(var(--chart-5))" },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function DonutChartPage() {
  return (
    <article>
      <PageHeader
        title="Donut chart"
        description="Pie with an inner radius and an optional center label / value slot."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <DonutChart
            data={pieData}
            centerValue="100%"
            centerLabel="Traffic"
            config={{
              Direct: { label: "Direct", color: "hsl(var(--chart-1))" },
              Search: { label: "Search", color: "hsl(var(--chart-2))" },
              Social: { label: "Social", color: "hsl(var(--chart-3))" },
              Referral: { label: "Referral", color: "hsl(var(--chart-4))" },
              Email: { label: "Email", color: "hsl(var(--chart-5))" },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function RadialChartPage() {
  return (
    <article>
      <PageHeader
        title="Radial chart"
        description="Concentric arcs. Good for completion-style metrics and KPIs."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <RadialChart
            data={[
              { name: "Mobile", value: 78 },
              { name: "Desktop", value: 64 },
              { name: "Tablet", value: 42 },
            ]}
            config={{
              Mobile: { label: "Mobile", color: "hsl(var(--chart-1))" },
              Desktop: { label: "Desktop", color: "hsl(var(--chart-2))" },
              Tablet: { label: "Tablet", color: "hsl(var(--chart-3))" },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function ScatterChartPage() {
  return (
    <article>
      <PageHeader
        title="Scatter chart"
        description="Two- or three-dimensional point cloud. Optional bubble size via `zKey`."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <ScatterChart
            xKey="x"
            yKey="y"
            zKey="z"
            config={{
              A: { label: "Group A", color: "hsl(var(--chart-1))" },
              B: { label: "Group B", color: "hsl(var(--chart-4))" },
            }}
            series={[
              {
                name: "A",
                data: [
                  { x: 10, y: 30, z: 200 },
                  { x: 30, y: 80, z: 120 },
                  { x: 45, y: 50, z: 180 },
                  { x: 60, y: 90, z: 240 },
                  { x: 75, y: 70, z: 100 },
                ],
              },
              {
                name: "B",
                data: [
                  { x: 20, y: 60, z: 140 },
                  { x: 40, y: 30, z: 160 },
                  { x: 55, y: 65, z: 220 },
                  { x: 70, y: 40, z: 180 },
                  { x: 85, y: 85, z: 100 },
                ],
              },
            ]}
          />
        </div>
      </Preview>
    </article>
  );
}

function FunnelChartPage() {
  return (
    <article>
      <PageHeader
        title="Funnel chart"
        description="Conversion through ordered stages."
      />
      <Preview centered={false}>
        <div className="h-[280px]">
          <FunnelChart
            data={funnelData}
            config={{
              Visitors: { label: "Visitors", color: "hsl(var(--chart-1))" },
              Signups: { label: "Signups", color: "hsl(var(--chart-2))" },
              Activated: { label: "Activated", color: "hsl(var(--chart-3))" },
              Purchased: { label: "Purchased", color: "hsl(var(--chart-4))" },
              "Repeat buyers": {
                label: "Repeat buyers",
                color: "hsl(var(--chart-5))",
              },
            }}
          />
        </div>
      </Preview>
    </article>
  );
}

function RadarChartPage() {
  return (
    <article>
      <PageHeader
        title="Radar chart"
        description="Compare a small number of categorical axes across one or more series."
      />
      <Preview centered={false}>
        <div className="h-[300px]">
          <RadarChart
            data={radarData}
            axisKey="trait"
            config={{
              a: { label: "Webmarket", color: "hsl(var(--chart-1))" },
              b: { label: "Competitor", color: "hsl(var(--chart-4))" },
            }}
            showLegend
          />
        </div>
      </Preview>
    </article>
  );
}

function SparklinePage() {
  return (
    <article>
      <PageHeader
        title="Sparkline"
        description="Tiny inline chart for KPI cards and table rows. No axes, no legend."
      />
      <Demo
        preview={
          <div className="w-full max-w-xs space-y-3">
            <Sparkline data={sparkSeries} />
            <Sparkline data={sparkSeries} variant="line" />
          </div>
        }
        code={`<Sparkline data={[12, 14, 13, ...]} />
<Sparkline variant="line" data={values} color="hsl(var(--chart-2))" />`}
      />
    </article>
  );
}

function GaugePage() {
  return (
    <article>
      <PageHeader
        title="Gauge"
        description="Semi-circle or 270° gauge with an optional thresholds palette."
      />
      <Preview>
        <div className="grid w-full max-w-2xl grid-cols-1 sm:grid-cols-3 gap-4">
          <Gauge value={72} label="CPU" />
          <Gauge
            value={88}
            label="SLA"
            sweep={270}
            thresholds={[
              { stop: 50, color: "hsl(var(--chart-6))" },
              { stop: 80, color: "hsl(var(--chart-5))" },
              { stop: 100, color: "hsl(var(--chart-3))" },
            ]}
          />
          <Gauge value={42} label="Memory" sweep={360} />
        </div>
      </Preview>
    </article>
  );
}

function HeatmapPage() {
  return (
    <article>
      <PageHeader
        title="Heatmap"
        description="Categorical X/Y intensity grid. Hand-rolled SVG; themed via tokens."
      />
      <Preview centered={false}>
        <Heatmap data={heatmapData} />
      </Preview>
    </article>
  );
}

function ActivityHeatmapPage() {
  return (
    <article>
      <PageHeader
        title="Activity heatmap"
        description="Day-by-day activity grid (GitHub-style). Pass an array of `{ date, value }`."
      />
      <Preview centered={false}>
        <ActivityHeatmap days={activityDays} />
      </Preview>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Admin — doc pages
// ---------------------------------------------------------------------------

function KpiCardPage() {
  return (
    <article>
      <PageHeader
        title="KPI card"
        description="Headline metric with delta and optional sparkline / icon."
      />
      <Preview centered={false}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            label="Active users"
            value="14,820"
            delta={12.4}
            deltaLabel="vs last week"
          />
          <KpiCard
            label="Revenue"
            value="$84,210"
            delta={-3.1}
            deltaLabel="vs last month"
            variant="with-icon"
            icon={<DollarSign />}
          />
          <KpiCard
            label="Orders"
            value="1,284"
            delta={5.2}
            variant="with-icon"
            icon={<ShoppingBagIcon />}
          />
        </div>
      </Preview>
    </article>
  );
}

function StatCardPage() {
  return (
    <article>
      <PageHeader
        title="Stat card"
        description="Smaller dense stat for header strips and inline summaries."
      />
      <Preview centered={false}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Sessions" value="14.2k" delta="+2.4%" tone="good" />
          <StatCard label="Bounce rate" value="34%" delta="-1.2%" tone="good" />
          <StatCard label="Avg. order" value="$72.40" delta="+0.6%" tone="good" />
          <StatCard label="Refunds" value="42" delta="+3" tone="bad" />
        </div>
      </Preview>
    </article>
  );
}

function MetricTrendCardPage() {
  return (
    <article>
      <PageHeader
        title="Metric trend card"
        description="KPI card with a chart inline. Pass any chart node as `chart`."
      />
      <Preview centered={false}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MetricTrendCard
            label="Active users · 7d"
            value="14,820"
            delta={12.4}
            chart={
              <Sparkline data={sparkSeries} color="hsl(var(--chart-1))" />
            }
          />
          <MetricTrendCard
            label="Revenue · 30d"
            value="$84.2k"
            delta={-3.1}
            chartHeight={120}
            chart={
              <AreaChart
                data={monthlyData}
                xKey="month"
                showGrid={false}
                showXAxis={false}
                showYAxis={false}
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              />
            }
          />
        </div>
      </Preview>
    </article>
  );
}

function PeriodTogglePage() {
  const [period, setPeriod] = React.useState<Period>("month");
  return (
    <article>
      <PageHeader
        title="Period toggle"
        description="Day / Week / Month / Quarter / Year switch for time-range scoped views."
      />
      <Demo
        preview={<PeriodToggle value={period} onValueChange={setPeriod} />}
        code={`<PeriodToggle value={period} onValueChange={setPeriod} />`}
      />
    </article>
  );
}

function DateRangePickerPage() {
  return (
    <article>
      <PageHeader
        title="Date range picker"
        description="Two-month range picker with quick-select sidebar (Today / Last 7 / Last 30 / This month / Last month / Last 90)."
      />
      <Demo
        preview={
          <DateRangePicker
            defaultValue={{
              from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
              to: new Date(),
            }}
          />
        }
        code={`<DateRangePicker value={range} onValueChange={setRange} />`}
      />
    </article>
  );
}

function DashboardGridPage() {
  return (
    <article>
      <PageHeader
        title="Dashboard grid"
        description="Responsive grid for admin layouts. Items can span multiple columns via `<DashboardItem span={n}>`."
      />
      <Preview centered={false}>
        <DashboardSection
          title="Overview"
          description="Last 7 days"
          action={<PeriodToggle value="week" onValueChange={() => undefined} />}
        >
          <DashboardGrid cols={4}>
            <KpiCard label="Users" value="14.8k" delta={12.4} />
            <KpiCard label="Revenue" value="$84.2k" delta={-3.1} />
            <KpiCard label="Orders" value="1,284" delta={5.2} />
            <KpiCard label="Avg. order" value="$72.40" delta={0.6} />
            <DashboardItem span={2}>
              <KpiCard
                label="Sessions"
                value="38,210"
                delta={2.4}
                trail={
                  <div className="-mx-1 h-20">
                    <AreaChart
                      data={monthlyData}
                      xKey="month"
                      showGrid={false}
                      showXAxis={false}
                      showYAxis={false}
                      config={{
                        users: { color: "hsl(var(--chart-1))", label: "Users" },
                      }}
                    />
                  </div>
                }
              />
            </DashboardItem>
            <DashboardItem span={2}>
              <KpiCard
                label="Repeat buyers"
                value="312"
                delta={8.1}
                trail={
                  <div className="-mx-1 h-20">
                    <BarChart
                      data={categoryData}
                      xKey="category"
                      showGrid={false}
                      showXAxis={false}
                      showYAxis={false}
                      config={{
                        value: {
                          color: "hsl(var(--chart-4))",
                          label: "Repeat",
                        },
                      }}
                    />
                  </div>
                }
              />
            </DashboardItem>
          </DashboardGrid>
        </DashboardSection>
      </Preview>
    </article>
  );
}

function LeaderboardTablePage() {
  return (
    <article>
      <PageHeader
        title="Leaderboard table"
        description="Ranked rows with avatar, optional sparkline, primary value, delta."
      />
      <Preview centered={false}>
        <LeaderboardTable
          title="Top sellers · last 30 days"
          entries={[
            {
              id: "1",
              name: "Webmarket Audio",
              subtitle: "Electronics",
              value: "$24,820",
              delta: 14.2,
              trend: [4, 6, 5, 7, 8, 9, 11, 10, 12, 14],
            },
            {
              id: "2",
              name: "Atelier Levi",
              subtitle: "Fashion",
              value: "$18,440",
              delta: 6.8,
              trend: [9, 8, 9, 10, 9, 11, 10, 12, 13, 12],
            },
            {
              id: "3",
              name: "Greenhouse Co.",
              subtitle: "Home",
              value: "$11,210",
              delta: -2.1,
              trend: [12, 13, 11, 10, 11, 9, 10, 9, 8, 9],
            },
            {
              id: "4",
              name: "Nimbus Beauty",
              subtitle: "Beauty",
              value: "$8,940",
              delta: 22.5,
              trend: [3, 4, 5, 6, 8, 9, 11, 12, 14, 16],
            },
            {
              id: "5",
              name: "Trail Goods",
              subtitle: "Sports",
              value: "$6,210",
              delta: 1.4,
              trend: [6, 6, 7, 6, 7, 7, 8, 7, 8, 8],
            },
          ]}
        />
      </Preview>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Page registry
// ---------------------------------------------------------------------------

type DocPage = {
  id: string;
  title: string;
  Component: React.FC;
  fullBleed?: boolean;
};
type DocSection = { title: string; pages: DocPage[] };

const sections: DocSection[] = [
  {
    title: "Getting started",
    pages: [
      {
        id: "introduction",
        title: "Introduction",
        Component: IntroductionPage,
        fullBleed: true,
      },
      { id: "tokens", title: "Design tokens", Component: TokensPage },
      { id: "seo", title: "SEO & meta", Component: SeoPage },
    ],
  },
  {
    title: "Forms",
    pages: [
      { id: "button", title: "Button", Component: ButtonPage },
      { id: "input", title: "Input", Component: InputPage },
      { id: "floating-input", title: "Floating input", Component: FloatingInputPage },
      { id: "textarea", title: "Textarea", Component: TextareaPage },
      { id: "select", title: "Select", Component: SelectPage },
      { id: "label", title: "Label", Component: LabelPage },
      { id: "checkbox", title: "Checkbox", Component: CheckboxPage },
      { id: "radio-group", title: "Radio group", Component: RadioGroupPage },
      { id: "switch", title: "Switch", Component: SwitchPage },
      { id: "slider", title: "Slider", Component: SliderPage },
      { id: "number-input", title: "Number input", Component: NumberInputPage },
      { id: "quantity-stepper", title: "Quantity stepper", Component: QuantityStepperPage },
      { id: "toggle-group", title: "Toggle group", Component: ToggleGroupPage },
      { id: "color-swatch", title: "Color swatch", Component: ColorSwatchPage },
      { id: "size-selector", title: "Size selector", Component: SizeSelectorPage },
      { id: "search-bar", title: "Search bar", Component: SearchBarPage },
      { id: "search-with-suggestions", title: "Search w/ suggestions", Component: SearchWithSuggestionsPage },
      { id: "autocomplete", title: "Autocomplete", Component: AutocompletePage },
      { id: "phone-input", title: "Phone input", Component: PhoneInputPage },
      { id: "otp-input", title: "OTP input", Component: OtpInputPage },
    ],
  },
  {
    title: "Brand",
    pages: [
      { id: "flags", title: "Flags", Component: FlagsPage },
      {
        id: "language-switcher",
        title: "Language switcher",
        Component: LanguageSwitcherPage,
      },
    ],
  },
  {
    title: "Display",
    pages: [
      { id: "card", title: "Card", Component: CardPage },
      { id: "badge", title: "Badge", Component: BadgePage },
      { id: "tag", title: "Tag", Component: TagPage },
      { id: "avatar", title: "Avatar", Component: AvatarPage },
      { id: "rating", title: "Rating", Component: RatingPage },
      { id: "price", title: "Price", Component: PricePage },
      { id: "breadcrumb", title: "Breadcrumb", Component: BreadcrumbPage },
      { id: "pagination", title: "Pagination", Component: PaginationPage },
      { id: "accordion", title: "Accordion", Component: AccordionPage },
      { id: "separator", title: "Separator", Component: SeparatorPage },
      { id: "timeline", title: "Timeline", Component: TimelinePage },
      { id: "skeleton", title: "Skeleton", Component: SkeletonPage },
      {
        id: "loading-patterns",
        title: "Loading patterns",
        Component: LoadingPatternsPage,
      },
      { id: "spinner", title: "Spinner", Component: SpinnerPage },
      { id: "empty-state", title: "Empty state", Component: EmptyStatePage },
    ],
  },
  {
    title: "Overlays",
    pages: [
      { id: "dialog", title: "Dialog", Component: DialogPage },
      { id: "sheet", title: "Sheet", Component: SheetPage },
      { id: "popover", title: "Popover", Component: PopoverPage },
      { id: "toast", title: "Toast", Component: ToastPage },
      { id: "dropdown-menu", title: "Dropdown menu", Component: DropdownMenuPage },
      { id: "tabs", title: "Tabs", Component: TabsPage },
      { id: "tooltip", title: "Tooltip", Component: TooltipPage },
      { id: "quick-view", title: "Quick view", Component: QuickViewPage },
      { id: "cart-drawer", title: "Cart drawer", Component: CartDrawerPage },
    ],
  },
  {
    title: "Layout",
    pages: [
      { id: "site-header", title: "Site header", Component: SiteHeaderPage },
      { id: "site-footer", title: "Site footer", Component: SiteFooterPage },
      { id: "main-nav", title: "Main nav", Component: MainNavPage },
      { id: "side-nav", title: "Side nav", Component: SideNavPage },
      { id: "mega-menu", title: "Mega menu", Component: MegaMenuPage },
      { id: "mobile-nav-bar", title: "Mobile nav bar", Component: MobileNavBarPage },
      { id: "hero-banner", title: "Hero banner", Component: HeroBannerPage },
    ],
  },
  {
    title: "Product",
    pages: [
      { id: "product-card", title: "Product card", Component: ProductCardPage },
      { id: "product-card-list", title: "Product card (list)", Component: ProductCardListPage },
      { id: "product-grid", title: "Product grid", Component: ProductGridPage },
      {
        id: "product-gallery",
        title: "Product gallery",
        Component: ProductGalleryPage,
      },
      { id: "variant-picker", title: "Variant picker", Component: VariantPickerPage },
      { id: "stock-badge", title: "Stock badge", Component: StockBadgePage },
      { id: "delivery-card", title: "Delivery card", Component: DeliveryCardPage },
      { id: "seller-card", title: "Seller card", Component: SellerCardPage },
      { id: "reviews-block", title: "Reviews block", Component: ReviewsBlockPage },
      { id: "review-form", title: "Review form", Component: ReviewFormPage },
      { id: "qa-block", title: "Q&A block", Component: QABlockPage },
      { id: "frequently-bought", title: "Frequently bought", Component: FrequentlyBoughtPage },
      { id: "comparison-table", title: "Comparison table", Component: ComparisonTablePage },
      { id: "spec-table", title: "Spec table", Component: SpecTablePage },
      {
        id: "filter-sidebar",
        title: "Filter sidebar",
        Component: FilterSidebarPage,
      },
    ],
  },
  {
    title: "Marketplace",
    pages: [
      { id: "category-tile-grid", title: "Category tiles", Component: CategoryTilePage },
      { id: "promo-banner", title: "Promo banner", Component: PromoBannerPage },
      { id: "product-strip", title: "Product strip", Component: ProductStripPage },
      { id: "sort-dropdown", title: "Sort dropdown", Component: SortDropdownPage },
      { id: "view-toggle", title: "View toggle", Component: ViewTogglePage },
      { id: "active-filters-bar", title: "Active filters bar", Component: ActiveFiltersBarPage },
    ],
  },
  {
    title: "Cart",
    pages: [
      { id: "cart-line-item", title: "Cart line item", Component: CartLineItemPage },
      { id: "empty-cart", title: "Empty cart", Component: EmptyCartPage },
      { id: "coupon-input", title: "Coupon input", Component: CouponInputPage },
      { id: "order-summary", title: "Order summary", Component: OrderSummaryPage },
    ],
  },
  {
    title: "Checkout",
    pages: [
      { id: "checkout-stepper", title: "Checkout stepper", Component: CheckoutStepperPage },
      { id: "address-card", title: "Address card", Component: AddressCardPage },
      { id: "delivery-method-picker", title: "Delivery method", Component: DeliveryMethodPickerPage },
      { id: "payment-method-picker", title: "Payment method", Component: PaymentMethodPickerPage },
      { id: "order-confirmation", title: "Order confirmation", Component: OrderConfirmationPage },
    ],
  },
  {
    title: "Account",
    pages: [
      { id: "account-dropdown", title: "Account dropdown", Component: AccountDropdownPage },
      { id: "notification-bell", title: "Notification bell", Component: NotificationBellPage },
      { id: "order-history-row", title: "Order history row", Component: OrderHistoryRowPage },
      { id: "order-tracking", title: "Order tracking", Component: OrderTrackingPage },
      { id: "address-book", title: "Address book", Component: AddressBookPage },
      { id: "loyalty-card", title: "Loyalty card", Component: LoyaltyCardPage },
      { id: "wishlist-grid", title: "Wishlist", Component: WishlistGridPage },
    ],
  },
  {
    title: "Auth",
    pages: [
      { id: "sign-in-form", title: "Sign in", Component: SignInFormPage },
      { id: "sign-up-form", title: "Sign up", Component: SignUpFormPage },
      { id: "otp-form", title: "OTP verification", Component: OtpFormPage },
      { id: "forgot-password-form", title: "Forgot password", Component: ForgotPasswordFormPage },
    ],
  },
  {
    title: "Charts",
    pages: [
      { id: "line-chart", title: "Line chart", Component: LineChartPage },
      { id: "area-chart", title: "Area chart", Component: AreaChartPage },
      { id: "bar-chart", title: "Bar chart", Component: BarChartPage },
      { id: "horizontal-bar-chart", title: "Horizontal bar", Component: HorizontalBarChartPage },
      { id: "stacked-bar-chart", title: "Stacked bar", Component: StackedBarChartPage },
      { id: "pie-chart", title: "Pie chart", Component: PieChartPage },
      { id: "donut-chart", title: "Donut chart", Component: DonutChartPage },
      { id: "radial-chart", title: "Radial chart", Component: RadialChartPage },
      { id: "scatter-chart", title: "Scatter chart", Component: ScatterChartPage },
      { id: "funnel-chart", title: "Funnel chart", Component: FunnelChartPage },
      { id: "radar-chart", title: "Radar chart", Component: RadarChartPage },
      { id: "sparkline", title: "Sparkline", Component: SparklinePage },
      { id: "gauge", title: "Gauge", Component: GaugePage },
      { id: "heatmap", title: "Heatmap", Component: HeatmapPage },
      { id: "activity-heatmap", title: "Activity heatmap", Component: ActivityHeatmapPage },
    ],
  },
  {
    title: "Admin",
    pages: [
      { id: "kpi-card", title: "KPI card", Component: KpiCardPage },
      { id: "stat-card", title: "Stat card", Component: StatCardPage },
      { id: "metric-trend-card", title: "Metric trend card", Component: MetricTrendCardPage },
      { id: "period-toggle", title: "Period toggle", Component: PeriodTogglePage },
      { id: "date-range-picker", title: "Date range picker", Component: DateRangePickerPage },
      { id: "dashboard-grid", title: "Dashboard grid", Component: DashboardGridPage },
      { id: "leaderboard-table", title: "Leaderboard table", Component: LeaderboardTablePage },
    ],
  },
];

const flatPages = sections.flatMap((s) => s.pages);
const pageById = (id: string) =>
  flatPages.find((p) => p.id === id) ?? flatPages[0];

function getInitialId() {
  if (typeof window === "undefined") return flatPages[0].id;
  const hash = window.location.hash.replace(/^#/, "");
  return hash || flatPages[0].id;
}

// ---------------------------------------------------------------------------
// Docs site chrome
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={dark}
      onClick={() => setDark((d) => !d)}
      className="grid size-9 place-items-center rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

function DocsHeader({
  onMenuClick,
  onOpenPalette,
}: {
  onMenuClick: () => void;
  onOpenPalette: () => void;
}) {
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iP(hone|ad|od)/.test(navigator.platform);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="lg:hidden grid size-9 place-items-center rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary"
        >
          <Menu className="size-5" />
        </button>
        <a
          href="#introduction"
          aria-label="Webmarket home"
          className="flex items-center text-text-primary"
        >
          <Logo variant="wordmark" size={26} />
        </a>
        <nav className="hidden md:flex items-center gap-1 ml-2" aria-label="Primary">
          {["Docs", "Components", "Tokens"].map((label) => (
            <a
              key={label}
              href="#introduction"
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Search components"
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 text-[13px] text-text-tertiary transition-colors hover:bg-background hover:text-text-secondary md:w-48 lg:w-56 xl:w-64"
          >
            <Search className="size-4 shrink-0" />
            <span className="flex-1 text-left">Search components...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-gray-200 bg-background px-1.5 font-mono text-[10px] text-text-tertiary">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Search components"
            className="md:hidden grid size-9 place-items-center rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary"
          >
            <Search className="size-4" />
          </button>
          <LanguageSwitcher />
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
          >
            <Github className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SidebarNav({
  activeId,
  onNavigate,
  filter,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
  filter: string;
}) {
  const q = filter.trim().toLowerCase();
  const matches = (s: string) => !q || s.toLowerCase().includes(q);

  return (
    <nav aria-label="Documentation" className="space-y-6">
      {sections.map((section) => {
        const visible = section.pages.filter((p) => matches(p.title));
        if (visible.length === 0) return null;
        return (
          <div key={section.title}>
            <div className="mb-2 px-2 text-[11px] uppercase tracking-wider font-semibold text-text-tertiary">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {visible.map((page) => {
                const isActive = page.id === activeId;
                return (
                  <li key={page.id}>
                    <a
                      href={`#${page.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(page.id);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-[13px] transition-colors",
                        isActive
                          ? "bg-secondary text-primary font-medium"
                          : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                      )}
                    >
                      {page.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function PageBreadcrumb({ id }: { id: string }) {
  const section = sections.find((s) => s.pages.some((p) => p.id === id));
  const page = pageById(id);
  if (!section) return null;
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-[12px] text-text-tertiary"
    >
      <span>{section.title}</span>
      <ChevronRight className="size-3" />
      <span className="text-text-secondary">{page.title}</span>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const [activeId, setActiveId] = React.useState<string>(() => getInitialId());
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const onHash = () => setActiveId(getInitialId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id: string) => {
    setActiveId(id);
    setMobileNavOpen(false);
    if (typeof window !== "undefined") window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const openPalette = React.useCallback(() => setPaletteOpen(true), []);
  useCommandPaletteHotkey(openPalette);

  const paletteItems = React.useMemo<CommandItem[]>(
    () =>
      sections.flatMap((section) =>
        section.pages.map((p) => ({
          id: p.id,
          label: p.title,
          group: section.title,
          keywords: `${p.id} ${section.title}`,
          onSelect: () => navigate(p.id),
        }))
      ),
    []
  );

  const page = pageById(activeId);
  const PageComponent = page.Component;

  return (
    <div className="min-h-full bg-background">
      <DocsHeader
        onMenuClick={() => setMobileNavOpen(true)}
        onOpenPalette={openPalette}
      />

      {/* Mobile / tablet sidebar drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-72 sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>Documentation</SheetTitle>
          </SheetHeader>
          <div className="mt-2 mb-3">
            <Input
              iconLeft={<Search />}
              placeholder="Filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto -mx-2 px-2 pb-6">
            <SidebarNav
              activeId={activeId}
              onNavigate={navigate}
              filter={filter}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="mx-auto w-full max-w-screen-2xl flex">
        {/* Desktop sticky sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200">
          <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-6">
            <SidebarNav
              activeId={activeId}
              onNavigate={navigate}
              filter={filter}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 py-8 md:px-8 md:py-10">
          <div
            className={cn(
              "mx-auto w-full",
              page.fullBleed ? "max-w-screen-2xl" : "max-w-3xl xl:max-w-4xl"
            )}
          >
            {!page.fullBleed && <PageBreadcrumb id={activeId} />}
            <PageComponent key={activeId} />
          </div>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={paletteItems}
        placeholder="Search components..."
      />
      <Toaster />
    </div>
  );
}

export default App;
