import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth"
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
import { loginUser } from "./api/auth/login/loginUser"
import { AuthUser } from "./types/authTypes/auth.type"
import { serverRefreshToken } from "./api/auth/refresh/serverRefreshToken";
import { tokenExpiresTime } from "./lib/tokenExpireTime";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      tokenExpiresTime: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiresTime: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiresTime: number;
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const refreshed = await serverRefreshToken(token.refreshToken)
    return {
      ...token,
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      tokenExpiresTime: tokenExpiresTime(token.tokenExpiresTime),
    }

  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 24 * 60 * 60, updateAge: 24 * 60 * 60, },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const formData = {
          email: credentials.username as string,
          password: credentials.password as string
        }
        const res = await loginUser(formData)

        if (!res) return null

        user = {
          ...res,
          id: res.id,
          name: res.username,
          email: res.email,
          image: res.image,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          tokenExpiresTime: res.tokenExpiresTime
        } satisfies User & AuthUser
        return user
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          tokenExpiresTime: tokenExpiresTime(user.tokenExpiresTime)
        }
      }

      if (Date.now() < (token.tokenExpiresTime as number)) {
        return refreshAccessToken(token)
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email as string,
        name: token.name,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenExpiresTime: token.tokenExpiresTime,
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
  }
})