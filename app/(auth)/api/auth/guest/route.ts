import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ensureUserInDb } from "@/lib/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  const supabase = await createClient();

  const {
    data: { user: existingUser },
  } = await supabase.auth.getUser();

  if (existingUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error || !data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  await ensureUserInDb({
    id: data.user.id,
    email: `guest-${Date.now()}`,
  });

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
