# Password Recovery Process

## 1. Request Password Reset
- The user submits a request to reset the password via the API at /v1/request-reset.
- The request body must include the *email* of the user.
- The system searches for the user in the database based on the provided email.
- If the user is found, a *reset token* is generated using JWT.
- A password reset link, containing the generated token, is sent to the user's email. The link directs to the frontend page where the user can enter a new password.

## 2. Reset Password
- After clicking the reset link and entering a new password, the user submits a request to reset the password via the API at /v1/reset-password.
- The request body must include the *token* and the *new password*.
- The token is validated to ensure it's associated with a valid user, and the new password must be at least 8 characters long.
- If the provided data is valid, the user's password is updated and the changes are saved to the database.

## 3. Limitations
- In *development* mode, the system sends an email via the mailer service.
- In other environments, emails are not sent.

## 4. RequestPasswordReset Functionality
- The requestPasswordReset function is responsible for finding the user by their email in the database.
- If the user exists, a JWT token is generated and sent to the user's email with a link for password reset.
- If the user does not exist or an error occurs, an exception is thrown, and an error message is returned.