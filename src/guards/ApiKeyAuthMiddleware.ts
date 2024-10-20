import { Context, Inject, Req } from "@tsed/common";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { Forbidden, Unauthorized } from "@tsed/exceptions";
import { User } from "src/domain/user/User";
import { UnkeyService } from "src/services/UnkeyService";

@Middleware()
export class ApiKeyAuthMiddleware implements MiddlewareMethods {
  @Inject()
  private unkeyService: UnkeyService;

  public async use(@Req() request: Req, @Context() ctx: Context) {
    const token = this.extractToken(request.headers.authorization);

    const permissions = this.getPermissions(ctx);
    const { result, error } = await this.unkeyService.verify(
      token,
      permissions
    );

    if (error || !result.valid) {
      throw new Forbidden(
        "The token is either invalid, expired, or lacks sufficient permissions."
      );
    }

    const user: User = {
      username: (result.meta?.username as string) || "Anonymous",
      keyId: result.keyId || "No key in Unkey response",
    };

    ctx.set("user", user);
  }

  private extractToken(authHeader?: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Unauthorized("Unauthorized");
    }
    return authHeader.split(" ")[1];
  }

  private getPermissions(ctx: Context): string[] {
    return ctx.endpoint.get(ApiKeyAuthMiddleware)?.permissions || [];
  }
}
