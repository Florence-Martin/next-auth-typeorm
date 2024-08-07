// Protection des routes
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authentification/signin",
  },
});
