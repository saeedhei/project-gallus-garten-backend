# Login API

## Endpoint
POST v1/login

## Description
Authenticates a user using their login and password, and returns a signed JWT token if the credentials are valid.

---

## Steps

### 1. Receive Request
- A POST request is made to /login with login and password fields in the body.

### 2. Authenticate with Local Strategy
- Passport's Local Strategy is used to verify the credentials.

#### 2.1 Find User by Login
- The system looks for a user by their login (username or email).

#### 2.2 Handle Missing User
- If the user is not found, authentication fails with the message: Incorrect login.

#### 2.3 Verify Password
- The submitted password is compared with the stored hashed password.

#### 2.4 Handle Password Mismatch
- If the password is incorrect, authentication fails with the message: Incorrect password.

#### 2.5 Sanitize User
- If authentication succeeds, the password hash is excluded from the user object before passing it on.

### 3. Generate JWT Token
- A JWT token is generated using the user's _id, name, and role.

### 4. Return Token to Client
- The token is returned in the response body with status 200 OK.

---

## JWT Configuration

- The token includes:
  - id: User ID
  - name: Username
  - role: User role
- Default token expiry: 1 hour
- The token is signed using a secret key defined in environment variables.

---