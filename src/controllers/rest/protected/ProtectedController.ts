import { Context } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Delete, Get, Post } from "@tsed/schema";
import { ApiKeyAuth } from "src/decorators/ApiKeyAuth";
import { User } from "src/domain/user/User";

@Controller("/protected")
export class ProtectedController {
  @Get("/")
  @ApiKeyAuth()
  async getProtected(@Context() ctx: Context) {
    const user = ctx.get("user") as User;
    return `Hi, ${user.username}!\nYou've accessed the protected area.\nUser info:\n${JSON.stringify(user)}`;
  }

  @Post("/")
  @ApiKeyAuth({ permissions: ["data.write"] })
  async postProtected(@Context() ctx: Context) {
    const user = ctx.get("user") as User;
    return `Hi, ${user.username}!\nYou can now modify data.\nUser info:\n${JSON.stringify(user)}`;
  }

  @Delete("/")
  @ApiKeyAuth({ permissions: ["data.delete"] })
  async deleteProtected(@Context() ctx: Context) {
    const user = ctx.get("user") as User;
    return `Hi, ${user.username}!\nYou can delete data.\nUser info:\n${JSON.stringify(user)}`;
  }
}
