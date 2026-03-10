import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function requireAdmin() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) return null;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.role === "admin" ? decoded : null;
    } catch (err) {
        console.error("Auth error:", err.message);
        return null;
    }
}
