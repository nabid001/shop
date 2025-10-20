import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";

export const PortableTextComponent: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url;
      if (!imageUrl) return null;

      return (
        <div className="relative w-full h-[400px] my-6 rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={value?.alt || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover rounded-xl"
          />
        </div>
      );
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold my-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-muted-foreground my-3">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <Link
          href={href}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : ""}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </Link>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 my-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 my-4 space-y-1">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};
