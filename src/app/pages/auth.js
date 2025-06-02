import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-sidebar">
        <h2>Bienvenue sur Ebook Cameroun</h2>
        <p>Accédez à une vaste bibliothèque numérique pour vos études.</p>
      </div>
      <div className="auth-form">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          theme="default"
        />
      </div>
    </div>
  );
}
