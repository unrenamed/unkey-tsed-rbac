# RBAC API Key Authentication with Ts.ED and Unkey API

This project showcases an RBAC mechanism with API key authentication in a [Ts.ED](https://tsed.io/) backend, using [Unkey API](https://www.unkey.com/docs/api-reference/overview) for secure key management. It enables role-based access control with time-limited API keys, allowing fine-grained permission handling across different user roles.

## Route Overview

| Method | Endpoint          | Required Headers                | Required Permissions | Description                                     |
| ------ | ----------------- | ------------------------------- | -------------------- | ----------------------------------------------- |
| GET    | `/`               | None                            | None                 | Index page with a link to Swagger documentation |
| GET    | `/rest/public`    | None                            | None                 | Returns the public message                      |
| GET    | `/rest/protected` | `Authorization: Bearer <token>` | None                 | Returns the protected GET message               |
| POST   | `/rest/protected` | `Authorization: Bearer <token>` | `data.write`         | Returns the protected POST message              |
| DELETE | `/rest/protected` | `Authorization: Bearer <token>` | `data.delete`        | Returns the protected DELETE message            |

## Getting started

### Create a Unkey Root Key

1. Navigate to [Unkey Root Keys](https://app.unkey.com/settings/root-key) and click **"Create New Root Key"**.
2. Name your root key.
3. Select the following workspace permissions:
   - `create_key`
   - `read_key`
   - `encrypt_key`
   - `decrypt_key`
4. Click **"Create"** and save your root key securely.

### Create a Unkey API

1. Go to [Unkey APIs](https://app.unkey.com/apis) and click **"Create New API"**.
2. Enter a name for the API.
3. Click **"Create"**.

### Create Unkey permissions

1. Go to [Unkey Permissions](https://app.unkey.com/authorization/permissions) and click **"Create New Permission"**.
2. Enter a name for the first permission: `data.write`
3. Click **"Create"**.
4. Repeat the above steps for the second permission: `data.delete`

### Create an Unkey role

> This is required since you can assign permissions to a key that are attached to some role

1. Go to [Unkey Roles](https://app.unkey.com/authorization/roles) and click **"Create New Role"**.
2. Enter any name for the role.
3. Select both permissions to link with this role.
4. Click **"Create"**.

### Generate 3 Unkey API keys

1. From the [Unkey APIs](https://app.unkey.com/apis) page, select your newly created API.
2. Click **"Create Key"** in the top right corner.
3. Fill out the form with the following suggested values:

   - Owner: `superuser`

     _If you don't provide this value, the API will welcome you as Anonymous._

4. Click **"Create"** and copy the generated key. You'll use it instead of `<token>` in `/rest/protected` routes.
5. Repeat these steps 2 more times.

### Add permissions to Unkey API keys

1. From the [Unkey APIs](https://app.unkey.com/apis) page, select your newly created API.
2. Head over **Keys** tab.
3. You will now assign different permissions to different keys:

   1. Omit key #1; it won't have any permissions.
   2. For key #2, select `data.write` permission.
   3. For key #3, select `data.delete` permission.

   To select permissions:

   1. Click on a key row in the **Keys** table.
   2. Scroll down to **Permissions** section.
   3. Expand the tree.
   4. Select the checbox with the permission you want to assign.

### Clone the repository to your local machine:

```bash
git clone git@github.com:unrenamed/unkey-tsed-rbac
cd unkey-tsed-rbac
```

Create a `.env.local` file in the root directory and populate it with the following environment variables:

```env
UNKEY_ROOT_KEY=your-unkey-root-key
UNKEY_API_ID=your-unkey-api-id
```

Ensure you replace `your-unkey-*` with your actual Unkey credentials.

_If you want to run tests, use `.env.test` file._

### Set up the example

> **Important!** Ts.ED requires Node >= 14, Express >= 4 and TypeScript >= 4.

```batch
# install dependencies
$ pnpm install

# serve
$ pnpm start

# build for production
$ pnpm build
$ pnpm start:prod
```

### Docker

```
# build docker image
docker compose build

# start docker image
docker compose up
```

### Test endpoints

Use cURL or Postaman to make requests to the endpoints. Go to [Route Overview](#route-overview) to see the available routes and the required permissions. If you use a key with insufficient permissions, you will receive `403 Forbidden` exception.
