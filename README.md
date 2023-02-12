# About this application

![](https://i.imgur.com/5bWXohw.png)

## SOURCE STRUCTURE:
- `api-gateway`: Gateway to handle all incoming request from the client, and send event to services.
- `*-service`: Service, to handle request from `api-gateway`.
  - `user-service`: Communicate with user table in the database, to create, update, or get an user from the database.
  - `auth-service`: Just handle logic reference to authenticate or authorize, in this scope, it just checks password and encrypted password is the same.
  - `terminal-service`: Like `user-service`, it handles everything (CRUD) with `terminal`.
