Here is the .md file documentation in English without the implementation:

# Middleware: Role and User Authorization

## checkAdminRole

Checks if the user making the request has an "administrator" role and only allows the action if the user's role is administrator.

### Description

- If the user's role is not administrator, a 403 Forbidden error is returned.
- If the user's role is administrator, the request is passed to the next middleware with next().

### Usage

`ts
import { checkAdminRole } from '../middleware/checkAdminRole';

router.post('/create',authenticateJWT,checkAdminRole, createUserController);

Example Error (if user is not an administrator)

{
  "error": "Forbidden: Only administrators can perform this action"
}


---

checkSelfOrAdmin

Checks if the user can perform the action:

If the user is an administrator, they are allowed to perform any action.

If the user is trying to update their own profile, the request is allowed.

If the user tries to update another user's profile, a 403 Forbidden error is returned.


Description

If the user's role is administrator or if the user is trying to update their own profile, the request is passed to the next middleware with next().

If the user is not an administrator and is trying to update another user's profile, a 403 Forbidden error is returned.


Usage

import { checkSelfOrAdmin } from '../middleware/checkAdminRole';

router.put('/update/:id', authenticateJWT,checkSelfOrAdmin, updateUserDetailsController);

Example Error (if user cannot update another user's account)

{
  "message": "You can update only your own account"
}


---

Possible Errors


---

Verification

1. For checkAdminRole:

Test with a user with the administrator role.

Test with a user who is not an administrator and verify they receive a 403 Forbidden response.



2. For checkSelfOrAdmin:

Test with an administrator user to check they can update any profile.

Test with a user updating their own profile to ensure it works.

Test with a user trying to update another user's profile and verify they receive a 403 Forbidden response.




This `.md` file provides the necessary documentation in English, including the usage of the middleware functions and possible responses, without the implementation code.