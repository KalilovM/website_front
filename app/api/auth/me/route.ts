import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import userStore from "@/stores/userStore";
import {jwtDecode} from "jwt-decode"
import {tokenType} from "@/app/api/auth/login/route";

// TODO: change place of this type
export type responseType = {
  email: string;
  avatar: string;
  username: string;
}

type refreshResponseType = {
  access: string;
}

export async function GET(req: NextRequest) {
//   send request to backend to get user data
//   if success, return user data
//   if fail, return null
  const cookieStore = cookies();


  if (!cookieStore.get("refresh")) {
    return NextResponse.json({error: "No refresh token"}, {
      status: 401,
      statusText: "Unauthorized"
    });
  }

  if (!cookieStore.get("access")) {
    const refresh = await fetch(`${process.env.BACKEND_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({refresh: cookieStore.get("refresh")!.value})
    })
    const res: refreshResponseType = await refresh.json();
    const accessTokenPayload = jwtDecode<tokenType>(res.access);
    cookies().set(accessTokenPayload.token_type, res.access, {
      expires: new Date(accessTokenPayload.exp * 1000),
      httpOnly: true,
      sameSite: "strict",
      path: "/"
    });
  }
  const response = await fetch(`${process.env.BACKEND_URL}/auth/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieStore.get("access")!.value}`
    },
  })
  const res: responseType = await response.json();

  return NextResponse.json(res, {
    status: response.status,
    statusText: response.statusText
  });
}
