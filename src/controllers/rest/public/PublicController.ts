import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/public")
export class PublicController {
  @Get("/")
  async getPublic() {
    return "Hello, Guest! This route is open for everyone.";
  }
}
