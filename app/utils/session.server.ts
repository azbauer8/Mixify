import { createCookieSessionStorage } from "@remix-run/node"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.AUTH_SECRET ?? "s3cr3t"],
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
