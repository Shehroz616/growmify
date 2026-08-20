import SEO from '../components/SEO';
import Hero from './Hero';
import Services from './Services';
import Showcase from './Showcase';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Blogs from './Blogs';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Growmify",
    "url": "https://growmify.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://growmify.com/blogs?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Growmify",
    "url": "https://growmify.com",
    "logo": "https://growmify.com/logo-growmify.png",
    "sameAs": [
      "https://twitter.com/growmify",
      "https://linkedin.com/company/growmify"
    ]
  };

  return (
    <>
      <SEO
        title="Premium Software Development & AI Integration Services"
        description="Accelerate business growth with Growmify's industry-leading software development, customized AI integration, low-latency architectures, and high-performance digital products."
        keywords="software development, AI integrations, custom systems, WebGL development, business automation, tech consultants"
        canonical="https://growmify.com/"
        schema={[schema, orgSchema]}
      />
      <Hero />
      <Services />
      <Showcase />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Blogs />
    </>
  );
}
