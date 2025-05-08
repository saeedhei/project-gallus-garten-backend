# User Registration (Admin Only)

## Overview

Only users with the role administrator can create new user accounts via a protected API route.

## Steps

1. Authentication Required  
   The request must include a valid JWT token. Only authenticated users are allowed.

2. Admin Role Check  
   Middleware verifies that the authenticated user has the role administrator.

3. API Endpoint  
   POST /v2/create

4. Request Body  
   Must contain the following fields:
   - name – unique username  
   - email – unique user email  
   - password – minimum 8 characters  
   - fullName – full name of the user  
   - role – one of: user, member, admin, administrator

5. Validation
   - name and email must be unique  
   - role must be from the allowed list  
   - password must be at least 8 characters  

6. User Creation  
   If all checks pass, the user is created in the database.

7. Response  
   Returns the newly created user's basic data:  
   _id, name, fullName, role, createdAt, updatedAt

8. Failure Cases
   - 403 Forbidden if not an administrator  
   - 400/500 errors for validation or creation issues