"use client";

import { useState } from "react";
import PropTypes from "prop-types";

// Font Awesome
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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

// Supabase
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

// ⚙️ FontAwesome config
config.autoAddCss = false;
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

// ✅ Providers global
export function Providers({ children }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node,
};
