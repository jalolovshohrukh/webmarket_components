import * as React from "react";

/**
 * Document head manager for SPA routes. Renders nothing — imperatively syncs
 * the document title, meta description, canonical URL, and Open Graph /
 * Twitter cards as props change. Drop one near the root of each route.
 *
 * NOTE: This patches `document.head` at runtime; it's perfect for in-app
 * navigation but does NOT help search-engine crawlers that don't execute
 * JS. For real indexing you also need server-side rendering or a build-time
 * pre-render step (Vite SSG, Next.js, Astro, etc.). See README for guidance.
 */
export interface SeoProps {
  title?: string;
  /** Appended after `title`, separated by ` · `. */
  titleTemplate?: string;
  description?: string;
  /** Canonical URL for the current page. */
  canonical?: string;
  /** Image URL for og:image / twitter:image. Should be ≥1200×630 for best results. */
  image?: string;
  imageAlt?: string;
  /** Override og:type. Default `website`. */
  type?: "website" | "article" | "product";
  /** Lang attribute on <html>. */
  lang?: string;
  /** Robots directive. Default unspecified (inherits `index, follow`). */
  robots?: "index, follow" | "noindex, nofollow" | "noindex, follow" | string;
  /** Theme color for browsers / iOS PWA. */
  themeColor?: string;
  /** JSON-LD structured data. Pass an object; it'll be stringified into a script tag. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Extra meta tags as `{ name?, property?, content }`. */
  meta?: Array<{ name?: string; property?: string; content: string }>;
}

const MANAGED_ATTR = "data-seo-managed";

function ensureMeta(
  selector: string,
  attrs: Record<string, string>
): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function ensureLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(
  data: SeoProps["jsonLd"],
  scriptId = "wm-seo-jsonld"
) {
  const existing = document.getElementById(scriptId);
  if (!data) {
    existing?.remove();
    return;
  }
  const json = JSON.stringify(data);
  if (existing) {
    existing.textContent = json;
    return;
  }
  const tag = document.createElement("script");
  tag.id = scriptId;
  tag.type = "application/ld+json";
  tag.setAttribute(MANAGED_ATTR, "true");
  tag.textContent = json;
  document.head.appendChild(tag);
}

function Seo({
  title,
  titleTemplate,
  description,
  canonical,
  image,
  imageAlt,
  type = "website",
  lang,
  robots,
  themeColor,
  jsonLd,
  meta,
}: SeoProps) {
  React.useEffect(() => {
    if (lang) document.documentElement.lang = lang;

    const fullTitle = title
      ? titleTemplate
        ? `${title} · ${titleTemplate}`
        : title
      : undefined;
    if (fullTitle) document.title = fullTitle;

    if (description) {
      ensureMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
      ensureMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
      ensureMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    }

    if (fullTitle) {
      ensureMeta('meta[property="og:title"]', {
        property: "og:title",
        content: fullTitle,
      });
      ensureMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: fullTitle,
      });
    }

    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });

    if (canonical) {
      ensureLink("canonical", canonical);
      ensureMeta('meta[property="og:url"]', {
        property: "og:url",
        content: canonical,
      });
    }

    if (image) {
      ensureMeta('meta[property="og:image"]', {
        property: "og:image",
        content: image,
      });
      ensureMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: image,
      });
      ensureMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: "summary_large_image",
      });
      if (imageAlt) {
        ensureMeta('meta[property="og:image:alt"]', {
          property: "og:image:alt",
          content: imageAlt,
        });
      }
    }

    if (robots) {
      ensureMeta('meta[name="robots"]', {
        name: "robots",
        content: robots,
      });
    }

    if (themeColor) {
      ensureMeta('meta[name="theme-color"]', {
        name: "theme-color",
        content: themeColor,
      });
    }

    if (meta && meta.length > 0) {
      for (const m of meta) {
        if (m.name) {
          ensureMeta(`meta[name="${m.name}"]`, {
            name: m.name,
            content: m.content,
          });
        } else if (m.property) {
          ensureMeta(`meta[property="${m.property}"]`, {
            property: m.property,
            content: m.content,
          });
        }
      }
    }

    setJsonLd(jsonLd);
  }, [
    title,
    titleTemplate,
    description,
    canonical,
    image,
    imageAlt,
    type,
    lang,
    robots,
    themeColor,
    jsonLd,
    meta,
  ]);

  return null;
}

// ---------------------------------------------------------------------------
// Structured-data helpers — return JSON-LD objects you pass to <Seo jsonLd={...} />
// ---------------------------------------------------------------------------

export interface ProductJsonLdInput {
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  brand?: string;
  price: number;
  priceCurrency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder" | "BackOrder";
  rating?: { value: number; count: number };
  url?: string;
}

export function productJsonLd(p: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image,
    sku: p.sku,
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: p.priceCurrency,
      availability: `https://schema.org/${p.availability ?? "InStock"}`,
      url: p.url,
    },
    aggregateRating: p.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: p.rating.value,
          reviewCount: p.rating.count,
        }
      : undefined,
  };
}

export interface BreadcrumbJsonLdInput {
  items: Array<{ name: string; url: string }>;
}

export function breadcrumbJsonLd(p: BreadcrumbJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: p.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface OrganizationJsonLdInput {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function organizationJsonLd(p: OrganizationJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: p.name,
    url: p.url,
    logo: p.logo,
    sameAs: p.sameAs,
  };
}

export { Seo };
