# `checkAdminRole` Middleware

Middleware to check if the user making the request has the `administrator` role.

---

## Endpoint: `POST /api/user/create`

Creates a new user. **Only accessible to administrators**.

---

### Required Headers

| Header        | Description                                 |
|---------------|---------------------------------------------|
| `x-user-id`   | The `_id` of the administrator (authenticated user) |

---

### Request Example

**URL:**

```
POST http://localhost:3333/api/user/create
```

**Headers:**

```http
Content-Type: application/json
x-user-id: 649b8e0d123456abcdef1234
```

**Body:**

```json
{
  "name": "newuser1",
  "email": "newuser1@example.com",
  "password": "verysecurepass",
  "fullName": "New User One",
  "role": "user"
}
```

---

### Possible Responses

| Status | Description                                   |
|--------|-----------------------------------------------|
| `201`  | User successfully created                     |
| `401`  | Missing `x-user-id` header                    |
| `403`  | User does not have administrator rights       |
| `500`  | Error while creating the user                 |

---

### Response Examples

**Success:**

```json
{
  "_id": "65a1bcaef3d2e9a788123456",
  "name": "newuser1",
  "fullName": "New User One",
  "role": "user",
  "createdAt": "2025-04-06T12:34:56.789Z",
  "updatedAt": "2025-04-06T12:34:56.789Z"
}
```

**Unauthorized (missing x-user-id):**

```json
{
  "error": "Unauthorized: Missing user ID"
}
```

**Forbidden (not an admin):**

```json
{
  "error": "Forbidden: Only administrators can perform this action"
}
```

---

### Verification

1. Create a user with the role `administrator`.
2. Get the user's `_id`.
3. Use the user's `_id` as the value for the `x-user-id` header in Postman.
4. Make sure that a non-administrator user receives the `403 Forbidden` error.
