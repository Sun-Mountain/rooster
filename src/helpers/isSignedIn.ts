import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { forbidden, redirect } from "next/navigation";

export async function isSignedIn() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/sign-in")
    }
}

export async function isAdmin() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session || session.user.role === "ADMIN" || session.user.role !== "SUPER") {
      forbidden();
    }
}