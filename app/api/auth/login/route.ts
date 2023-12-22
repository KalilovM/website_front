import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const {username, password} = await req.json(); // TODO: typing for this
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  const res = await response.json();
  // TODO: add access and refresh tokens to cookies
  return NextResponse.json(res, {
    status: response.status,
    statusText: response.statusText
  });
}