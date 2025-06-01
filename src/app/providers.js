// app/providers.js
"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileUpload,
  faScroll,
  faQuestionCircle,
  faChartLine,
  faRobot,
  faSyncAlt,
  faPlayCircle,
  faCheck,
  faTimes,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

// Configure Font Awesome
config.autoAddCss = false;

// Add icons to library
library.add(
  faFileUpload,
  faScroll,
  faQuestionCircle,
  faChartLine,
  faRobot,
  faSyncAlt,
  faPlayCircle,
  faCheck,
  faTimes,
  faStar,
  faStarHalfAlt,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
);

export function Providers({ children }) {
  return <>{children}</>;
}
