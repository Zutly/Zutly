"use client";

import * as React from "react";
import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string; // pad of absolute URL
  image?: string; // pad of absolute URL
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object | object[];
};

function toAbsolute(urlOrPath?: string) {
  if (!urlOrPath) return undefined;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://www.zutly.nl";
  return urlOrPath.startsWith("/")
    ? `${origin}${urlOrPath}`
    : `${origin}/${urlOrPath}`;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}) => {
  const absCanonical =
    toAbsolute(canonical) ||
    (typeof window !== "undefined" ? window.location.href : "https://www.zutly.nl/");
  const absImage = toAbsolute(image || "/zutly-logo.png");

  const jsonItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={absCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absCanonical} />
      {absImage && <meta property="og:image" content={absImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absImage && <meta name="twitter:image" content={absImage} />}

      {/* JSON-LD */}
      {jsonItems.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;