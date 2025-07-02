"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const syncProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/connexion");
        return;
      }

      // Vérifie si l'utilisateur existe dans la table Profile
      const { data: profile } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        // Créer une nouvelle ligne dans Profile
        await supabase.from("Profile").insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name ?? "",
        });
      }

      // Redirection après synchronisation
      router.push("/dashboard");
    };

    syncProfile();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Connexion sécurisée...
    </div>
  );
}
