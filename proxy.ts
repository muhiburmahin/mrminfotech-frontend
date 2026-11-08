import { NextRequest, NextResponse } from "next/server";
import { middleware as baseMiddleware, config as baseConfig } from "./src/middleware";

export async function proxy(request: NextRequest) {
  return baseMiddleware(request);
}

export const config = baseConfig;

export default proxy;
