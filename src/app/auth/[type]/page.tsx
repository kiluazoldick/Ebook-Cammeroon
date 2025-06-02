"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="hidden lg:block w-1/2 bg-orange-600 p-12 text-white">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center mb-8 lg:mb-12 group">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="ml-3 text-2xl font-bold">Ebook Cameroon</span>
          </Link>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Votre bibliothèque numérique personnelle
          </h2>
          <p className="text-orange-100 mb-6">
            Accédez à des livres, fiches et supports d apprentissage à tout
            moment.
          </p>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex items-start">
              📚 Accès illimité à des livres numériques
            </li>
            <li className="flex items-start">
              🤖 Recommandations intelligentes
            </li>
            <li className="flex items-start">
              📱 Utilisable sur tous vos appareils
            </li>
          </ul>
          <p className="text-orange-200 text-xs">
            © {new Date().getFullYear()} Ebook Cameroon. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 px-4">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-500 text-sm">
              Pas de compte ?{" "}
              <Link
                href="/auth/inscription"
                className="text-orange-600 font-semibold"
              >
                S’inscrire
              </Link>
            </p>
          </div>

          {/* Google Button */}
          <div>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-6 py-3.5
                border border-gray-300 rounded-xl text-base font-medium
                text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Image
                src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_48dp.png"
                alt="Google Logo"
                width={20}
                height={20}
                className="mr-3"
              />
              Se connecter avec Google
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-gray-400 text-sm">OU</span>
            </div>
          </div>

         <form onSubmit={handleLogin} className="space-y-5">
  {error && <p className="text-red-600 text-sm">{error}</p>}

  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Email
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
      placeholder="votre@email.com"
      required
    />
  </div>

  <div>
    <div className="flex justify-between items-center mb-1">
      <label
        htmlFor="password"
        className="text-sm font-medium text-gray-700"
      >
        Mot de passe
      </label>
      <Link
        href="/auth/mot-de-passe-oublie"
        className="text-orange-600 text-sm hover:underline"
      >
        Mot de passe oublié ?
      </Link>
    </div>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
      placeholder="••••••••"
      required
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-orange-600 text-white py-3.5 px-6 rounded-xl
             font-medium hover:bg-orange-700 transition-colors"
  >
    {loading ? "Connexion..." : "Se connecter"}
  </button>
</form>
        </div>
      </div>
    </div>
  );
}
