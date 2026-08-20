import { useEffect } from 'react';

export default function SEO({ title, description, keywords, canonical, ogType = 'website', ogImage, schema }) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = `${title} | Growmify - Premium IT Solutions`;
    }

    // Helper to update/create meta tags
    const updateMetaTag = (property, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Helper to update/create link tags
    const updateLinkTag = (rel, value) => {
      if (!value) return;
      let element = document.head.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', value);
    };

    // 2. Core SEO Tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    
    // Open Graph (Facebook / LinkedIn)
    updateMetaTag('og:title', title ? `${title} | Growmify` : 'Growmify', true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    if (ogImage) {
      updateMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`, true);
    }

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? `${title} | Growmify` : 'Growmify');
    updateMetaTag('twitter:description', description);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);
    }

    // 3. Canonical Link
    updateLinkTag('canonical', canonical || window.location.href);

    // 4. JSON-LD Schema
    let schemaScript = document.head.querySelector('#json-ld-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'json-ld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else {
      if (schemaScript) {
        schemaScript.remove();
      }
    }

    // Clean up schema on unmount to avoid stale schema on navigation
    return () => {
      const activeSchema = document.head.querySelector('#json-ld-schema');
      if (activeSchema) {
        activeSchema.remove();
      }
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);

  return null;
}
