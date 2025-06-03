import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/db"

// Use a default secret for development if environment variable is not set
const secret = process.env.NEXTAUTH_SECRET || "development-secret-do-not-use-in-production"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { db } = await connectToDatabase()
          const user = await db.collection("users").findOne({ email: credentials.email })

          if (!user) {
            // For development, create a default admin user if none exists
            if (
              process.env.NODE_ENV !== "production" &&
              credentials.email === "admin@example.com" &&
              credentials.password === "admin123"
            ) {
              return {
                id: "default-admin-id",
                email: "admin@example.com",
                name: "Admin User",
              }
            }
            return null
          }

          // Simple string comparison for password
          const isPasswordValid = user.password === credentials.password

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || "Admin User",
          }
        } catch (error) {
          console.error("Authentication error:", error)

          // For development, allow a default admin login if database connection fails
          if (
            process.env.NODE_ENV !== "production" &&
            credentials.email === "admin@example.com" &&
            credentials.password === "admin123"
          ) {
            return {
              id: "default-admin-id",
              email: "admin@example.com",
              name: "Admin User",
            }
          }

          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  secret: secret,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
