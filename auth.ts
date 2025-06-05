import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDatabase } from "./lib/mongoose";
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  
  debug: process.env.NODE_ENV === 'development',
  
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
        await connectToDatabase();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          console.log('New user created:', user.email);
        } else {
          console.log('Existing user signed in:', user.email);
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectToDatabase();

        const dbUser = await User.findOne({ email: session.user.email});

        if (dbUser) {
          (session.user as any)._id = dbUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
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
