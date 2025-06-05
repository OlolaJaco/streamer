import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  
  debug: process.env.NODE_ENV === 'development',
  
  // Use JWT strategy for Edge Runtime compatibility
  session: {
    strategy: "jwt"
  },
  
  // Configure one or more authentication providers incase i need them
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: null, // Will disable the new account creation screen
  // },

  callbacks: {
    async signIn({ user }) {
      try {
        // Move database operations to a separate API route
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/sync-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        if (!response.ok) {
          console.error('Failed to sync user to database');
        }
        
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return true; // Continue with sign in even if DB sync fails
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name as string || '';
        session.user.email = token.email as string || '';
        session.user.image = token.picture as string || '';
      }
      return session;
    },
  },
  
  logger: {
    error(error) {
      console.error('NextAuth Error:', error);
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.log('NextAuth Debug:', code, metadata);
    }
  }
});
