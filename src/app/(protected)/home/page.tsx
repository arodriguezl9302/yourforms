import React from "react";
import { auth, signOut } from "@/auth";

const HomePage = async () => {
  const user = await auth();
  return (
    <div>
      {JSON.stringify(user)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">salir</button>
      </form>
    </div>
  );
};

export default HomePage;
