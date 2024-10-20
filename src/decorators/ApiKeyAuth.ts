import { In, Returns, Security } from "@tsed/schema";
import { UseAuth } from "@tsed/platform-middlewares";
import { useDecorators } from "@tsed/core";
import { ApiKeyAuthMiddleware } from "../guards/ApiKeyAuthMiddleware";

export interface AuthOptions extends Record<string, unknown> {
  permissions?: string[];
}

export function ApiKeyAuth(options: AuthOptions = {}): Function {
  return useDecorators(
    UseAuth(ApiKeyAuthMiddleware, options),
    Security("apiKey", ...(options.permissions || [])),
    In("header").Name("Authorization").Type(String).Required(true),
    Returns(401),
    Returns(403)
  );
}
