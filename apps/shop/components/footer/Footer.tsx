import Link from "next/link";
import { customerService, info, shopLinks } from "./constant";

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            FASHION FORWARD
          </h2>
          <p className="text-muted-foreground mb-4">
            Premium clothing for modern lifestyle. Discover the latest trends
            and timeless classics.
          </p>
          <div className="flex space-x-4 mt-2">
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-accent transition-colors"
            >
              <svg width="20" height="20" fill="currentColor">
                <path d="M18 0h-16c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8v-7h-2v-3h2v-2c0-2.2 1.3-3.4 3.3-3.4.9 0 1.7.1 1.9.1v2.2h-1.3c-1 0-1.2.5-1.2 1.2v1.9h2.5l-.3 3h-2.2v7h4c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2z" />
              </svg>
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-accent transition-colors"
            >
              <svg width="20" height="20" fill="currentColor">
                <circle cx="10" cy="10" r="4" />
                <rect x="2" y="2" width="16" height="16" rx="4" />
                <circle cx="15" cy="5" r="1" />
              </svg>
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-accent transition-colors"
            >
              <svg width="20" height="20" fill="currentColor">
                <path d="M20 3.8c-.7.3-1.4.6-2.1.7.8-.5 1.3-1.2 1.6-2.1-.7.4-1.5.8-2.3 1-1.3-1.4-3.5-1.2-4.7.4-1.1 1.3-1.1 3.1-.1 4.4-3.2-.2-6.1-1.7-8-4.1-.3.6-.5 1.3-.5 2 0 1.4.7 2.7 1.8 3.4-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.2-1 .2-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.7 2.7-1.4 1.1-3.2 1.7-5.1 1.7-.3 0-.6 0-.9-.1 1.8 1.2 3.9 1.9 6.2 1.9 7.4 0 11.5-6.1 11.5-11.5v-.5c.8-.6 1.4-1.2 1.9-2z" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Shop</h3>
          <ul className="space-y-2 text-muted-foreground">
            {shopLinks.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    className="hover:text-accent transition-colors"
                    prefetch={false}
                    href={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">
            Customer Service
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {customerService.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    className="hover:text-accent transition-colors"
                    prefetch={false}
                    href={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Legal & Info */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Info</h3>
          <ul className="space-y-2 text-muted-foreground">
            {info.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    className="hover:text-accent transition-colors"
                    prefetch={false}
                    href={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-muted-foreground">
        &copy; 2025 Fashion Forward. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
