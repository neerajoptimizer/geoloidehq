import type { StaticImageData } from "next/image";
import automationHand from "@/assets/images/business-automation-robotic-hand.jpg";
import biDashboard from "@/assets/images/business-intelligence-dashboard.jpg";
import skyscrapers from "@/assets/images/corporate-skyscrapers.jpg";
import marketingDashboard from "@/assets/images/digital-marketing-analytics-dashboard.jpg";
import earthAtNight from "@/assets/images/earth-at-night-global-network.jpg";
import indiaGate from "@/assets/images/india-gate-new-delhi.jpg";
import marketingLaptop from "@/assets/images/marketing-performance-laptop.jpg";
import mobileApp from "@/assets/images/mobile-app-development-smartphone.jpg";
import seoReport from "@/assets/images/seo-search-performance-report.jpg";
import strategyWorkshop from "@/assets/images/strategy-workshop-sticky-notes.jpg";
import teamLaptops from "@/assets/images/team-collaborating-laptops.jpg";
import teamDesk from "@/assets/images/team-desk-laptops-top-view.jpg";
import teamMeeting from "@/assets/images/team-meeting-modern-office.jpg";
import teamPresentation from "@/assets/images/team-presentation-planning.jpg";
import teamTogether from "@/assets/images/team-working-together-office.jpg";
import codeLaptop from "@/assets/images/web-development-code-laptop.jpg";
import webWorkspace from "@/assets/images/website-development-workspace.jpg";
import workflowBoard from "@/assets/images/workflow-process-mapping-board.jpg";
import type { ServiceSlug } from "./site";

export type SiteImage = { src: StaticImageData; alt: string };

// Stock photography (Unsplash licence: free for commercial use). Alt text describes each scene for
// accessibility and image search — swap in real team/office photos over time for stronger local SEO.
export const images = {
  heroTeam: {
    src: teamLaptops,
    alt: "Business team collaborating on laptops to plan a digital growth strategy",
  },
  globalNetwork: {
    src: earthAtNight,
    alt: "Earth at night from space showing city lights connected across continents — global business growth",
  },
  strategyWorkshop: {
    src: strategyWorkshop,
    alt: "Strategy workshop with sticky notes on a whiteboard during a business planning session",
  },
  teamDesk: {
    src: teamDesk,
    alt: "Top view of a team working together at a shared desk with laptops and notebooks",
  },
  skyscrapers: {
    src: skyscrapers,
    alt: "Modern corporate skyscrapers representing enterprise growth",
  },
  teamMeeting: {
    src: teamMeeting,
    alt: "Team meeting in a modern office discussing business solutions",
  },
  indiaGate: {
    src: indiaGate,
    alt: "India Gate in New Delhi at sunset, close to Geoloide's registered office on KG Marg",
  },
  teamTogether: {
    src: teamTogether,
    alt: "Colleagues working together around a table in a bright office",
  },
  teamPresentation: {
    src: teamPresentation,
    alt: "Project planning presentation to a team in an open-plan office",
  },
} satisfies Record<string, SiteImage>;

export const serviceImages: Record<ServiceSlug, { card: SiteImage; hero: SiteImage; detail: SiteImage }> = {
  "digital-marketing": {
    card: {
      src: marketingDashboard,
      alt: "Digital marketing analytics dashboard showing website traffic and conversion metrics",
    },
    hero: {
      src: marketingLaptop,
      alt: "Laptop displaying marketing performance charts for SEO and paid advertising campaigns",
    },
    detail: {
      src: seoReport,
      alt: "SEO search performance report showing clicks, impressions, CTR and average position",
    },
  },
  "website-and-app-development": {
    card: {
      src: codeLaptop,
      alt: "Laptop screen with website source code during web development",
    },
    hero: {
      src: webWorkspace,
      alt: "Web developer workspace with a laptop showing code for a responsive website",
    },
    detail: {
      src: mobileApp,
      alt: "Smartphone showing a mobile app interface during iOS and Android app development",
    },
  },
  "business-automation": {
    card: {
      src: automationHand,
      alt: "Robotic hand representing business process automation and AI",
    },
    hero: {
      src: biDashboard,
      alt: "Business intelligence dashboard with real-time KPIs from automated reporting",
    },
    detail: {
      src: workflowBoard,
      alt: "Workflow and process mapping board used to redesign and automate business operations",
    },
  },
};
