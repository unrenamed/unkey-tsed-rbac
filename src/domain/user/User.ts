import { Description, Example, Format, Property, Required } from "@tsed/schema";

export class User {
  @Property()
  @Description("Username")
  @Format("email")
  @Required()
  username: string;

  @Property()
  @Description("Unkey Key ID")
  @Example("key_eEv9NJ8ThIrNqys")
  keyId: string;

  constructor(options: Partial<User>) {
    options.username && (this.username = options.username);
    options.keyId && (this.keyId = options.keyId);
  }
}
