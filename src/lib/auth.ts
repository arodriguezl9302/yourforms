import { auth } from "@/auth";

export const useServerCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};
