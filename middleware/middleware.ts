// Protection des routes
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authentification/signin",
  },
  callbacks: {
    async authorized({ req, token }) {
      // ajout de restriction
      return !!token;
    },
  },
});
export const config = { matcher: ["/hello-page", "/autres-pages-protegees"] };
