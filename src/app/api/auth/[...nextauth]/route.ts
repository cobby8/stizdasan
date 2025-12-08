import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Simple hardcoded auth for now - Move to ENV later
                const validUsername = process.env.ADMIN_USERNAME || "admin";
                const validPassword = process.env.ADMIN_PASSWORD || "stiz1234!";

                if (
                    credentials?.username === validUsername &&
                    credentials?.password === validPassword
                ) {
                    return { id: "1", name: "Admin", email: "admin@stiz.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "supersecretkey123",
});

export { handler as GET, handler as POST };
