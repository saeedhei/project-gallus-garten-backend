# User Management Code Documentation

This file contains logic for managing users in a CouchDB database. It includes functions to create, update, delete, and retrieve users, as well as handle validation checks like field uniqueness. The code interacts with a User model, schema validation (userSchema), and utility functions for password hashing and ID generation.

## Imports

- useDatabase: Function to initialize and interact with the CouchDB database.
- User: The User model, defining the structure and types for a user document.
- hashPassword: A utility function to hash passwords before storing them in the database.
- generateId: A utility function to generate unique user IDs.
- userSchema: A Joi schema used to validate user data before saving or updating in the database.

## Functions

### checkFieldUniqueness(field: string, value: string, excludeId: string): Promise<boolean>

- Purpose: Checks if a field (e.g., name, email) has a unique value in the database, excluding a particular user ID to allow updates to the current user.
- Parameters:
  - field: The field to check for uniqueness (e.g., name, email).
  - value: The value to check for uniqueness.
  - excludeId: The user ID to exclude from the uniqueness check (usually the ID of the current user being updated).
- Returns: A boolean indicating whether the field value is unique or not.

---

### findUserByIdFromDb(id: string): Promise<User | null>

- Purpose: Finds a user by their _id in the CouchDB database.
- Parameters:
  - id: The user's _id to search for.
- Returns: The User object if found, or null if the user does not exist.

---

### findUserByLogin(login: string): Promise<User | null>

- Purpose: Finds a user by their login (either email or username).
- Parameters:
  - login: The email or username used to log in.
- Returns: The User object if found, or null if the user does not exist.
- Logic: Determines if the login is an email or username and searches accordingly.

---

### createUser(name: string, email: string, password: string, fullName: string, role: User['role'] = 'user'): Promise<Pick<User, '_id' | 'name' | 'fullName' | 'role' | 'createdAt' | 'updatedAt'>>

- Purpose: Creates a new user in the database.
- Parameters:
  - name: The username of the user.
  - email: The user's email address.
  - password: The user's password (will be hashed).
  - fullName: The user's full name.
  - role: The user's role (defaults to user).
- Returns: A summary object with essential user fields (_id, name, fullName, role, createdAt, updatedAt).
- Logic:
  - Checks if the username or email already exists.
  - Ensures the password is at least 8 characters long.
  - Hashes the password.
  - Validates the user data against the userSchema.
  - Inserts the user into the database.

---

### findUserById(id: string): Promise<User | null>

- Purpose: Finds a user by their ID, ensuring that the required fields are present.
- Parameters:
  - id: The user's _id to search for.
- Returns: The User object if found, or null if not found or missing required fields.

---

### updateUserDetails(id: string, updateData: { name?: string; email?: string; fullName?: string; password: string }): Promise<User | null>

- Purpose: Updates the details of an existing user.
- Parameters:
  - id: The user's _id.
  - updateData: The data to update (can include name, email, fullName, or password).
- Returns: The updated User object.
- Logic:
  - Validates the new name, email, or fullName for uniqueness.
  - Ensures the password, if provided, is at least 8 characters long and hashes it.
  - Validates the updated data against the userSchema.

---

### deleteUser(id: string): Promise<User | null>
- Purpose: Deletes a user by their ID from the database.
- Parameters:
  - id: The user's _id to delete.
- Returns: The deleted User object, or null if the user does not exist.
- Logic:
  - Verifies the _id and _rev are present.
  - Deletes the user from the database using db.destroy().

---

### getAllUsers(): Promise<User[]>

- Purpose: Retrieves all users from the database.
- Returns: An array of User objects.