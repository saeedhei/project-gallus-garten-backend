
# User Management API Documentation

## Overview
This API provides endpoints for managing user-related operations such as creating, updating, deleting, and retrieving user data from a CouchDB database.

### Features:
- Create a new user
- Find user by ID
- Update user details
- Delete user
- Get all users

## Database Operations

### checkFieldUniqueness(field: string, value: string, excludeId: string): Promise<boolean>
This function checks if a given field (e.g., name, email) is unique in the database, excluding the current user if an excludeId is provided.

#### Parameters:
- field (string): The field to check for uniqueness (e.g., name, email).
- value (string): The value to check against the database.
- excludeId (string): The ID of the user to exclude from the uniqueness check.

#### Returns:
- Promise<boolean>: Resolves to true if the field value already exists, false otherwise.

### findUserByIdFromDb(id: string): Promise<User | null>
Find a user in the database by their ID.

#### Parameters:
- id (string): The unique identifier of the user.

#### Returns:
- Promise<User | null>: The user object if found, otherwise null.

### createUser(name: string, email: string, password: string, fullName: string, role: string): Promise<Pick<User, '_id' | 'name' | 'fullName' | 'role' | 'createdAt' | 'updatedAt'>>
Creates a new user in the database.

#### Parameters:
- name (string): The username of the user.
- email (string): The email address of the user.
- password (string): The password for the user.
- fullName (string): The full name of the user.
- role (string): The role of the user. Default is 'user'.

#### Returns:
- Promise<Pick<User, '_id' | 'name' | 'fullName' | 'role' | 'createdAt' | 'updatedAt'>>: The created user object with essential fields.

### updateUserDetails(id: string, updateData: { name?: string, email?: string, fullName?: string, password: string }): Promise<User | null>
Updates an existing user's details in the database.

#### Parameters:
- id (string): The ID of the user to update.
- updateData (object): The data to update. At least one field must be provided, and password, if included, must be at least 8 characters long.

#### Returns:
- Promise<User | null>: The updated user object, or null if the user is not found.

### deleteUser(id: string): Promise<User | null>
Deletes a user from the database by their ID.

#### Parameters:
- id (string): The ID of the user to delete.

#### Returns:
- Promise<User | null>: The deleted user object, or null if the user is not found.

### getAllUsers(): Promise<User[]>
Fetches all users from the database.

#### Returns:
- Promise<User[]>: An array of all users in the database.

---

## API Endpoints

### POST /create
Creates a new user.

#### Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "role": "string"
}
```

#### Response:
- 201 Created: Returns the created user object.
- 500 Internal Server Error: If user creation fails.

### GET /:id
Finds a user by their ID.

#### Parameters:
- id (string): The unique identifier of the user.

#### Response:
- 200 OK: Returns the user object if found.
- 404 Not Found: If the user is not found.

### PUT /update/:id
Updates a user's details by their ID.

#### Parameters:
- id (string): The ID of the user to update.

#### Request Body:
```json
{
  "name": "string",
  "email": "string",
  "fullName": "string",
  "password": "string"
}
```

#### Response:
- 200 OK: Returns the updated user object.
- 500 Internal Server Error: If the update fails.

### DELETE /:id
Deletes a user by their ID.

#### Parameters:
- id (string): The ID of the user to delete.

#### Response:
- 200 OK: Returns a message indicating the user was deleted.
- 404 Not Found: If the user is not found.

### GET /getall
Fetches all users.

#### Response:
- 200 OK: Returns an array of all users.
- 500 Internal Server Error: If fetching users fails.

## Example Code for Controller Functions

### createUserController(req: Request, res: Response)
Handles the user creation process.

#### Example:
```typescript
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, fullName, role } = req.body;
  try {
    const user = await createUser(name, email, password, fullName, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
```

### findUserByIdController(req: Request, res: Response)
Fetches a user by their ID.

#### Example:
```typescript
export const findUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
```

### updateUserDetailsController(req: Request, res: Response)
Updates user details.

#### Example:
```typescript
export const updateUserDetailsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, fullName, password } = req.body;
  try {
    const updatedUser = await updateUserDetails(id, { name, email, fullName, password });
    res.status(200).json({ message: 'User details updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};
```

### deleteUserController(req: Request, res: Response)
Deletes a user by ID.

#### Example:
```typescript
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} not found` });
      return;
    }
    res.status(200).json({ message: 'User deleted', deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
```

## Conclusion
This API allows for efficient management of user data, including user creation, modification, and deletion, all backed by a CouchDB database. The validation and error handling ensure robustness while managing user accounts.
