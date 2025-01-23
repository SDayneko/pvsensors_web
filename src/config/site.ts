type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "PV Sensors",
  description:
    "An Open source Technical Blog platform with Next.js 14 with shadcn/ui, prisma and markdown support.",
  url: "https://pvsensors.com/",
  ogImage: "https://pvsensors.com/og",
  links: {
    twitter: "https://x.com/sergey_dayneko",
    github: "https://github.com/SDayneko/pvsensors_web",
  },
};
