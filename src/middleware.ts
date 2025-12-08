import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "supersecretkey123",
});

export const config = {
    matcher: ["/admin/:path*"],
};
