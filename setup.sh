#!/bin/bash

# Crée les dossiers
mkdir -p src/app/marketing
mkdir -p src/app/auth
mkdir -p src/app/dashboard/resume
mkdir -p src/app/dashboard/quiz
mkdir -p src/app/dashboard/settings
mkdir -p src/app/api/auth
mkdir -p src/app/api/generate-pdf
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/features
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/fonts
mkdir -p src/styles
mkdir -p public

# Crée les fichiers vides
touch src/app/marketing/page.tsx
touch src/app/marketing/layout.tsx
touch src/app/auth/page.tsx
touch src/app/dashboard/page.tsx
touch src/app/dashboard/layout.tsx
touch src/app/dashboard/resume/page.tsx
touch src/app/dashboard/quiz/page.tsx
touch src/app/dashboard/settings/page.tsx
touch src/app/api/auth/route.ts
touch src/app/api/generate-pdf/route.ts
touch src/components/layout/Header.tsx
touch src/components/layout/Footer.tsx
touch src/components/ui/Button.tsx
touch src/components/features/ResumeForm.tsx
touch src/components/features/QuizForm.tsx
touch src/lib/auth.ts
touch src/lib/openai.ts
touch src/lib/pdf.ts
touch src/types/index.ts
touch src/fonts/DejaVuSans.ttf
touch src/styles/globals.css
touch public/favicon.ico

echo "✅ Arborescence créée avec succès !"
