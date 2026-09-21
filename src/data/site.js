export const site = {
  name: "Muhammad Arslan",
  alternateNames: ["Arslan Muhammad"],
  domain: "muhammad-arslan-portfolio.vercel.app",
  url: "https://muhammad-arslan-portfolio.vercel.app/",
  title: "Senior Software Engineer",
  role: "Senior Software Engineer & Full Stack Developer",
  city: "Lahore",
  country: "Pakistan",
  countryCode: "PK",
  email: "arslansaleem622@gmail.com",
  employer: "Devflovv",
  university: "The University of Lahore",
  description:
    "Muhammad Arslan is a Senior Software Engineer in Lahore, building full-stack products with React, Next.js, Node.js, and AWS.",
  metaDescription:
    "Muhammad Arslan is a Senior Software Engineer in Lahore, building full-stack web apps with React, Next.js, Node.js, and AWS.",
  profiles: [
    "https://github.com/arslanmuhammad-dev",
    "https://linkedin.com/in/muhammad-arslan-0624971b5",
  ],
  topSkills: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST APIs",
    "GraphQL",
    "WebSockets",
  ],
  ogImage: "og-image.svg",
};

export const absoluteUrl = (path = "") => new URL(path, site.url).toString();
