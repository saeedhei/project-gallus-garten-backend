# User Registration 

## Endpoint
POST /v1/create

## Description
Creates a new user in the system after validating input, checking for uniqueness, and hashing the password.

---

## Steps

### 1. Receive Request
- A POST request is made to the /v1/create endpoint.
- The request body must contain name, email, password, and fullName.

### 2. Extract Fields
- Extract the input fields from the request body.

### 3. Check Username Uniqueness
- Verify that the provided name is not already taken.
- If it is, respond with an error: Username already taken.

### 4. Check Email Uniqueness
- Verify that the provided email is not already registered.
- If it is, respond with an error: Email already registered.

### 5. Validate Password
- Ensure that a password is provided.
- Ensure the password is at least 8 characters long.
- If invalid, respond with an appropriate error message.

### 6. Hash the Password
- Securely hash the password before storing it.

### 7. Set User Role
- Assign the default role: user.

### 8. Create User Object
- Generate a unique user ID.
- Create the full user object with timestamps.

### 9. Validate User Schema
- Validate the user object using a schema.
- If validation fails, respond with a descriptive error.

### 10. Insert into Database
- Save the validated user object to the database.
- If insertion fails, respond with an error: User creation failed.

### 11. Respond with User Data
- Return a JSON object with public user information:
  - _id, name, fullName, role, createdAt, and updatedAt.
- Use HTTP status 201 Created.

---