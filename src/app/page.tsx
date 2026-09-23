import { redirect } from "next/navigation";

export default function RootPage() {
  // Deterministic root redirect foundation toward /department/login
  redirect("/department/login");
}
