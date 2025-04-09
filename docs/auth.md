
# User Management API Documentation

This API provides a secure way to manage user-related operations such as authentication, user creation, update, deletion, and retrieval.

## Table of Contents

- [Authentication](#authentication)
- [JWT Middleware](#jwt-middleware)
- [Authorization Middleware](#authorization-middleware)
- [Token Utilities](#token-utilities)

---

## Authentication

### `POST /login`

Authenticates a user with email||name and password. If credentials are valid, a JWT token is returned.

**Request Body:**
```json
{
  "login": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `401 Invalid credentials`
- `500 Server error during login`

---

## JWT Middleware

JWT authentication is handled using Passport.js and `passport-jwt` strategy.

### Middleware: `authenticateJWT`

Extracts JWT from the `Authorization` header, validates it, and attaches the user to the `req.user` object.

---

## Authorization Middleware

### `checkAdminRole`

Allows access only to users with the `administrator` role.

**Response on failure:**
```json
{ "error": "Forbidden: Only administrators can perform this action" }
```

### `checkSelfOrAdmin`

Allows access if the authenticated user is the same as the target user or has an admin role.

**Response on failure:**
```json
{ "message": "You can update only your own account" }
```

---

## Token Utilities

### `generateToken(payload)`

Generates a signed JWT token with the following payload structure:

```ts
interface JwtPayload {
  id: string;
  name: string;
  role: string;
}
```

Token is valid for 1 hour.

### `verifyToken(token)`

Verifies a JWT and returns the payload.

---

## Environment Variables

- `JWT_SECRET`: Secret key used for signing JWT tokens.

---

## Notes

- Make sure Passport.js is initialized in your Express app.
- Use bearer token format: `Authorization: Bearer <token>` in all protected routes.
