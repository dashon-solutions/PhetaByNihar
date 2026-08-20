import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Pheta Tying Service in Mumbai & Pune | Marathi & Wedding Pheta Artist - Pheta By Nihar';
const DEFAULT_DESCRIPTION = 'Premier Marathi Pheta tying service in Mumbai, Pune & across Maharashtra. Specialized groom pheta styling, royal wedding guest tying, traditional Puneri & Kolhapuri phetas, and masterclasses by Nihar.';
const DEFAULT_KEYWORDS = 'Pheta Tying Service in Mumbai, Marathi Pheta Tying Service in Mumbai, Wedding Pheta Tying Service in Mumbai, Pheta Tying in Mumbai, Marathi Pheta in Mumbai, Maharashtrian Pheta Service in Mumbai, Wedding Pheta Service Mumbai, Pheta for Wedding in Mumbai, Traditional Pheta Tying Service Mumbai, Professional Pheta Tying Service Mumbai, Pheta Tying Service in Pune, Marathi Pheta Tying Service in Pune, Wedding Pheta Tying Service in Pune, Marathi Pheta in Pune, Maharashtrian Pheta Service in Pune, Pheta for Wedding in Pune, Traditional Pheta Tying in Pune, Pheta Tying Service Maharashtra, Marathi Pheta Tying Service Maharashtra, Maharashtrian Wedding Pheta, Groom Pheta Tying Service, Groom Pheta Mumbai, Wedding Pheta for Groom, Pheta for Groom in Mumbai, Pheta for Groom in Pune, Marathi Wedding Pheta, Wedding Pheta Artist, Pheta Artist Mumbai, Pheta Artist Pune, Wedding Pheta Stylist, Pheta Styling for Weddings, Pheta Service for Baraat, Pheta for Wedding Guests, Pheta Tying for Wedding Guests, Group Pheta Tying Service, Wedding Pheta for Baraati, Pheta Tying Near Me, Pheta Artist Near Me, Marathi Pheta Near Me, Wedding Pheta Near Me';
const DEFAULT_IMAGE = '/hero_groom.png';
const SITE_URL = 'https://phetabynihar.com';

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('author', 'Pheta By Nihar');
    setMetaTag('geo.region', 'IN-MH');
    setMetaTag('geo.placename', 'Mumbai, Pune, Maharashtra');
    setMetaTag('geo.position', '18.9822;72.8335');
    setMetaTag('ICBM', '18.9822, 72.8335');

    // 3. Open Graph Tags
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

    setMetaTag('og:site_name', 'Pheta By Nihar - Royal Maharashtrian Turban Heritage', true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:image', fullImageUrl, true);
    setMetaTag('og:image:alt', title, true);
    setMetaTag('og:locale', 'en_IN', true);

    // 4. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImageUrl);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data Schema
    const scriptId = 'seo-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;

    // Base Organization & LocalBusiness Schema
    const baseLocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#business`,
      name: 'Pheta By Nihar',
      alternateName: ['Pheta By Nihar Mumbai', 'Pheta By Nihar Pune', 'Marathi Pheta Tying Service'],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/hero_groom.png`,
      description: 'Premier Marathi & Maharashtrian Pheta tying service in Mumbai, Pune & across Maharashtra. Specialized groom styling, wedding guest draping, authentic rentals, and certified pheta academy masterclasses.',
      telephone: '+918652028136',
      email: 'phetabynihar@gmail.com',
      priceRange: '₹₹ - ₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer',
      areaServed: [
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Pune' },
        { '@type': 'City', name: 'Thane' },
        { '@type': 'City', name: 'Navi Mumbai' },
        { '@type': 'City', name: 'Girgaon' },
        { '@type': 'City', name: 'Pimpri Chinchwad' },
        { '@type': 'City', name: 'Kolhapur' },
        { '@type': 'City', name: 'Nashik' },
        { '@type': 'AdministrativeArea', name: 'Maharashtra' }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Girgaon & Dadar Cultural Center',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400004',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.9553,
        longitude: 72.8181
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00'
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Pheta Tying & Cultural Services Catalog',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wedding Groom Pheta Tying Service in Mumbai & Pune',
              description: 'Authentic royal groom pagadi styling with customized silk pheta, royal kalgi, brooch, and Shahi pleating.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Baraat & Wedding Guest Group Pheta Tying',
              description: 'On-site mass pheta tying service for wedding guests, baraati processions, and corporate cultural celebrations.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Pheta Tying Workshops & Masterclasses',
              description: 'Certified hands-on studio masterclasses and global online workshops on traditional Maharashtrian pheta tying.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Royal Pheta & Traditional Ornaments on Rent',
              description: 'Exclusive Puneri, Kolhapuri, and Shahi phetas, designer kalgis, Rajmudra, and Wagnakha accessories on rent.'
            }
          }
        ]
      }
    };

    const finalStructuredData = structuredData
      ? Array.isArray(structuredData)
        ? [baseLocalBusinessSchema, ...structuredData]
        : [baseLocalBusinessSchema, structuredData]
      : baseLocalBusinessSchema;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(finalStructuredData);
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, structuredData, noindex]);

  return null;
};
