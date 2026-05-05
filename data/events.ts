import { Briefcase, PartyPopper, UtensilsCrossed } from "lucide-react";

export const eventOptions = [
  {
    id: "corporate-dinners",
    title: "Corporate Dinners",
    description:
      "A polished setting for client hosting, executive dinners, and private business meals.",
    capacity: "10-60 guests",
    icon: Briefcase
  },
  {
    id: "celebrations",
    title: "Celebrations",
    description:
      "Warm, elegant private dining for birthdays, anniversaries, milestones, and family gatherings.",
    capacity: "8-80 guests",
    icon: PartyPopper
  },
  {
    id: "chefs-table",
    title: "Chef's Table",
    description:
      "An intimate tasting experience built around seasonal ingredients and direct chef interaction.",
    capacity: "6-14 guests",
    icon: UtensilsCrossed
  }
] as const;
