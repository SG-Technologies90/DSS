import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db"; // Adjust this path if your lib folder is elsewhere
import User from "@/models/User"; // Adjust this path if your models folder is elsewhere

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // 2. Connect to database
        await connectDB();

        // 3. Find user and explicitly select the hidden password field
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // 4. Check if password matches
        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        // 5. If successful, return the user object (this gets saved in the NextAuth JWT)
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  session: {
    strategy: "jwt", // NextAuth uses JWTs under the hood for Credentials provider
  },
  callbacks: {
    // This passes the user ID from the authorize function to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // This passes the user ID from the JWT token to the frontend session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login", // Tells NextAuth where your custom login page is
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// In Next.js App Router, you must export the handler as both GET and POST
export { handler as GET, handler as POST };