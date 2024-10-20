import { Service } from "@tsed/common";
import { Unkey } from "@unkey/api";

@Service()
export class UnkeyService {
  private readonly client: Unkey;
  private readonly apiId: string;

  constructor() {
    const rootKey = process.env.UNKEY_ROOT_KEY! || "test";
    this.apiId = process.env.UNKEY_API_ID!;
    this.client = new Unkey({ rootKey });
  }

  verify(key: string, permissions: string[] = []) {
    return this.client.keys.verify({
      key,
      apiId: this.apiId,
      ...(permissions.length > 0 && {
        authorization: {
          permissions: {
            and: permissions,
          },
        },
      }),
    });
  }
}
