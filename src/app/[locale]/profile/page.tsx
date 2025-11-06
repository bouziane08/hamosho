//file: shamosho/src/app/[locale]/profile/page.tsx
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileContent from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
