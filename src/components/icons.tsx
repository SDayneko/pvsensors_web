import {
    Rss,
    Command,
    ArrowRight,
    Icon as LucidIcon,
  } from "lucide-react";

import { FaSquareXTwitter, FaSquareGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa6";

export type Icon = typeof LucidIcon;

export const Icons = {
    logo: Command,
    rss: Rss,
    arrowRight: ArrowRight,
    X: FaSquareXTwitter,
    gitHub: FaSquareGithub,
    Linkedin: FaLinkedin,
    Sun: FaSun,
    Moon: FaMoon,
  };