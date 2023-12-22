import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode"

type LoginResponse = {
  username: string;
  tokens: {
    refresh: string;
    access: string;
  };
  avatar: string;
  email: string;
}

type tokenType = {
  token_type: "access" | "refresh";
  exp: number,
  iat: number,
  jti: string,
  // TODO: user_id will change to uuid or other one
  user_id: number,
}

export async function POST(req: NextRequest) {
  const {username, password} = await req.json(); // TODO: typing for this
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  const res: LoginResponse = await response.json();
  const accessTokenPayload = jwtDecode<tokenType>(res.tokens.access);
  const refreshTokenPayload = jwtDecode<tokenType>(res.tokens.refresh);
  // TODO: add path and secure to cookies
  cookies().set(accessTokenPayload.token_type, res.tokens.access, {expires: new Date(accessTokenPayload.exp * 1000), httpOnly: true, sameSite: "strict"});
  cookies().set(refreshTokenPayload.token_type, res.tokens.refresh, {expires: new Date(refreshTokenPayload.exp * 1000), httpOnly: true, sameSite: "strict"});
  // decode header by passing in options (useful for when you need `kid` to verify a JWT):
  // const decodedHeader = jwtDecode(token, { header: true });

  return NextResponse.json(res, {
    status: response.status,
    statusText: response.statusText
  });
}