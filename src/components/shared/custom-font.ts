import { Poppins } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
export const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
