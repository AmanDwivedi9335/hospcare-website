import LoginContent from "./LoginContent";

export const metadata = {
        title: "LADWA Dealer Login | Access Partner Portal",
        description:
                "Sign in to the LADWA dealer portal to manage safety product orders, track projects, and access partner-only resources and pricing.",
        alternates: { canonical: "/login" },
};

export default function LoginPage() {
        return <LoginContent />;
}
