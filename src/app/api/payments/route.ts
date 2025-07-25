// src/app/api/payments/route.ts

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { amount, plan } = await req.json();

    // Base URL depuis l'environnement
    const BASE_URL = process.env.BASE_URL;

    const payload = {
      amount,
      shop_name: "Ebook Cameroun",
      message: `Abonnement ${plan} à Ebook Cameroun`,
      success_url: `${BASE_URL}/subscription/success`,
      failure_url: `${BASE_URL}/subscription/failure`,
      order_id: uuidv4(),
    };

    const res = await fetch("https://api.lygosapp.com/v1/gateway", {
      method: "POST",
      headers: {
        "api-key": process.env.LYGOS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Échec de création de session de paiement" },
        { status: 500 }
      );
    }

    return NextResponse.json({ link: data.link });
  } catch (error) {
    console.error("Erreur paiement Lygos :", error);
    return NextResponse.json(
      { error: "Erreur serveur Lygos" },
      { status: 500 }
    );
  }
}
