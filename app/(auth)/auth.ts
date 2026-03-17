import "server-only";

import { createClient } from "@/lib/supabase/server";

export type UserType = "guest" | "regular";

export type SessionUser = {
  id: string;
  email: string | undefined;
  type: UserType;
};

export type Session = {
  user: SessionUser;
} | null;

export const auth = async (): Promise<Session> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const isAnonymous = user.is_anonymous ?? false;

  return {
    user: {
      id: user.id,
      email: user.email,
      type: isAnonymous ? "guest" : "regular",
    },
  };
};
