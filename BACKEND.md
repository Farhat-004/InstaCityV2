# InstaCityV2 API Documentation

This document describes the REST API implemented in the `backend` folder.

## Quick Start

- Development server: `http://localhost:4000`
- Configure the frontend with `VITE_BACKEND_URL`, for example:
  `VITE_BACKEND_URL=http://localhost:4000`
- Send JSON request bodies with the header `Content-Type: application/json`.
- Protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

The access token is returned by `POST /auth/login`. It is signed with the
server's `AUTH_TOKEN` secret and currently expires after 20 minutes. The
authentication middleware puts the token's `id` and `name` on `req.id` and
`req.name`.

## Authentication

### `POST /auth/signup`

Creates a user account.

Request body:

```json
{
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "password": "secret"
}
```

All three fields are required. The frontend also sends `username`, but the
backend does not store or return that field.

Success: `201 Created`

```json
{
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "id": "<userId>"
}
```

Missing data returns `401` with `{ "message": "provide all the infos required" }`.

### `POST /auth/login`

Authenticates a user and creates access and refresh tokens.

Request body:

```json
{
    "email": "ada@example.com",
    "password": "secret"
}
```

Success: `200 OK`

```json
{
    "user": {
        "_id": "<userId>",
        "name": "Ada Lovelace",
        "email": "ada@example.com"
    },
    "accessToken": "<accessToken>",
    "refreshToken": "<refreshToken>"
}
```

Invalid credentials return `401` with `{ "message": "invalid credentials" }`.

### `POST /auth/token`

Requests a new access token using a refresh token.

Request body:

```json
{
    "refreshToken": "<refreshToken>"
}
```

The intended success response is `200 OK`:

```json
{
    "name": "Ada Lovelace",
    "accessToken": "<newAccessToken>",
    "refreshToken": "<refreshToken>"
}
```

Known implementation behavior: the route currently returns `403` when the
refresh token is found in the database because its `isAvailable` condition is
reversed. It also returns an empty `404` response when JWT verification fails.

## Users

### `GET /users/`

Returns all users. No authentication is required.

Sensitive and relationship fields such as `password`, `token`, `posts`,
`friends`, and `notifications` are excluded from each result.

Success: `200 OK` with an array of user documents.

### `GET /users/me`

Returns the currently authenticated user's profile. Requires a bearer token.

Success: `200 OK` with the user document. `posts` and `token` are excluded.

### `GET /users/:userId`

Returns a user profile by MongoDB user ID. The reachable handler does not
require authentication and excludes `posts`, `token`, `friends`,
`notifications`, and `password`.

Success: `200 OK` with the user document.

Note: the source contains a second authenticated `GET /users/:userId` handler
later in the router. It is shadowed by this earlier route and is not reached.

### `PATCH /users/me`

Updates the authenticated user's profile. Requires a bearer token.

Request body fields:

```json
{
    "name": "Ada Lovelace",
    "bio": "Mathematician and writer",
    "website": "https://example.com",
    "gender": "female"
}
```

The route writes `name`, `bio`, `website`, and `gender`. The response is the
updated user with `posts`, `token`, and `password` excluded.

Success: `200 OK`.

### `PATCH /users/me/avatar`

Changes the authenticated user's avatar. Requires a bearer token.

Request body:

```json
{
    "avatar": "https://cdn.example.com/avatar.jpg"
}
```

The value is stored as a string, so the image must be uploaded elsewhere first.

Success: `200 OK`

```json
{
    "message": "Changed profile successfully"
}
```

### `PATCH /users/me/password`

Changes the authenticated user's password. Requires a bearer token.

Request body:

```json
{
    "currentPassword": "old-secret",
    "newPassword": "new-secret"
}
```

Success: `200 OK`

```json
{
    "message": "password changes successfully"
}
```

The current implementation does not verify whether the update matched a user
before returning success.

### `PATCH /users/me/friends`

Adds a friend relationship for the authenticated user and the target user.
Requires a bearer token.

Request body:

```json
{
    "userId": "<otherUserId>",
    "roomId": "<chatRoomId>"
}
```

Success: `200 OK` with `{ "sender": <updatedUser>, "receiver": <updatedUser> }`.

### `GET /users/me/friends`

Returns the authenticated user's friend list. Requires a bearer token.

Success: `200 OK` with an array of friend entries. Each populated friend has
`_id`, `name`, and `avatar`; each entry also includes its `roomId`.

## Posts

### `POST /posts/`

Creates a post for the authenticated user. Requires a bearer token.

Request body:

```json
{
    "caption": "A day in the city",
    "image": "https://cdn.example.com/post.jpg"
}
```

`image` is stored as a string URL. The backend does not upload files.

Success: `201 Created`

```json
{
    "post": { "_id": "<postId>" },
    "user": { "_id": "<userId>" }
}
```

The complete created post and updated user documents are returned; the example
only shows their identifying fields.

### `GET /posts/?page=1&limit=10`

Returns posts and a pagination indicator. No authentication is required.

Query parameters:

- `page`: page number, default `1`.
- `limit`: number used in the limit calculation, default `10`.

The current implementation uses `limit * page` as the MongoDB limit; it does
not skip earlier pages.

Success: `200 OK`

```json
{
    "posts": [
        {
            "_id": "<postId>",
            "caption": "A day in the city",
            "image": "https://cdn.example.com/post.jpg",
            "likesCount": 2,
            "commentsCount": 1,
            "author": { "_id": "<userId>", "name": "Ada Lovelace" },
            "likes": []
        }
    ],
    "hasMore": true
}
```

The `author` and `likes` references are populated with `_id`, `name`, and
`avatar`.

### `GET /posts/user/:userId`

Returns a user's profile together with that user's posts. No authentication is
required.

Success: `200 OK`

```json
{
    "user": { "_id": "<userId>", "name": "Ada Lovelace" },
    "posts": []
}
```

### `GET /posts/:postId`

Returns one post with its author, likes, and comments populated. No
authentication is required.

Success: `200 OK` with the post document.

### `PATCH /posts/:postId`

Updates a post. Requires a bearer token.

Request body:

```json
{
    "caption": "Updated caption",
    "image": "https://cdn.example.com/new-image.jpg"
}
```

Success: `200 OK` with the updated post.

Although the route is described as an owner-only operation in the source, the
current implementation checks authentication only and does not verify that the
authenticated user owns the post.

### `DELETE /posts/:postId`

Deletes a post. Requires a bearer token.

Success: `200 OK` with the deleted post document.

The current implementation does not verify post ownership or remove the post
ID from the author's `posts` array.

### `POST /posts/:postId/like`

Toggles the authenticated user's like on a post. Requires a bearer token.

No request body is required.

Success: `200 OK`

```json
{
    "likeState": true
}
```

`true` means the post was liked and `false` means the existing like was
removed.

## Comments

Comments are mounted on the `/posts` router.

### `POST /posts/:postId/comment`

Adds a comment to a post. Requires a bearer token.

Request body:

```json
{
    "text": "This is beautiful."
}
```

Success: `201 Created`

```json
{
    "message": "comment added"
}
```

### `PATCH /posts/comment/:commentId`

Updates a comment. Requires a bearer token.

Request body:

```json
{
    "text": "Updated comment text"
}
```

Success: `200 OK`

```json
{
    "message": "comment updated"
}
```

The current implementation authenticates the request but does not verify that
the authenticated user authored the comment.

### `DELETE /posts/:postId/comment/:commentId`

Deletes a comment and removes its ID from the post's `comments` array.
Requires a bearer token.

Success: `200 OK`

```json
{
    "message": "comment deleted"
}
```

The current implementation does not verify comment ownership.

## Common Errors

- `401 Unauthorized`: missing bearer token, missing required signup data, or
  invalid login credentials.
- `403 Forbidden`: invalid or expired access token, or a database/route error
  handled by one of the protected routes.
- `404 Not Found`: token verification failure in the refresh-token route.
- `500 Internal Server Error`: database or user-route failures.

Error responses generally use this shape:

```json
{
    "message": "Description of the error"
}
```

## Socket.IO Events

The backend also creates a Socket.IO server on the same server and port. These
are not REST endpoints.

- `join_room`: client sends a room ID string to join a room.
- `send_message`: client sends an object containing at least `roomId`; the
  object is emitted to the other clients in that room as `receive_message`.
- `typing`: client sends `{ "username": "Ada", "roomId": "<roomId>" }`; other
  clients receive the username as `user_typing`.
