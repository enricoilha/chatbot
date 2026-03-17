"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const SignOutForm = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignOut();
      }}
    >
      <button
        className="w-full px-1 py-0.5 text-left text-red-500"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
};
