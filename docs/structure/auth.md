src/
├── app.ts                 # Main entry file
├── routes/
│   └── auth.ts            # Login route (creates JWT)
│   └── protected.ts       # JWT-protected route
├── strategies/
│   └── jwt.ts             # Passport JWT strategy
├── middleware/
│   └── authenticateJWT.ts # Optional: manual JWT middleware