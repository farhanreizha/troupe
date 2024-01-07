import { NextRequest, NextResponse } from "next/server";
import { middlewareCreateClient } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = await middlewareCreateClient(request);
    await supabase.auth.getSession();
    // console.log(data);

    return response;
  } catch (error) {
    return NextResponse.next({ request: { headers: request.headers } });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
