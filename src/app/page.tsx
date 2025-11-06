import { redirect } from "next/navigation";

export default function RootPage() {
  // نحول مباشرة للغة الافتراضية
  redirect("/ar");
}
