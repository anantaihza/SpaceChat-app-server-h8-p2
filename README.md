# group-project-server-p2-h8

Group Project Phase Hactiv8 Server

# SpaceChat API Documentation

#### Link Access

```json
https://graded1p2.farhanrosidi.online/pub/cuisines
```

## Endpoint:

List of available endpoints:

- <code>POST /register</code> 1
- <code>POST /login</code> 2
- <code>GET /groups</code> 3
- <code>GET /myGroups</code> 4
- <code>POST /myGroups/:groupId</code> 5
- <code>GET /myGroups/:groupId/detail</code> 6
- <code>DELETE /myGroups/:groupId</code> 7
- <code>POST /chats/openai</code> 8
- <code>GET /profile</code> 9
- <code>PUT /profile/:id</code> 10

## 1. POST /register

Description:

- Register

Request:

- body:

```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

_Response (201 - CREATED)_

```json
{
  "id": integer,
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password is required"
}
OR
{
    "message": [
        "Email is already in use"
    ]
}
OR
{
    "message": [
        "Username is required"
    ]
}
OR
{
    "message": [
        "Name is required"
    ]
}
OR
{
    "message": [
        "Email is required"
    ]
}
OR
{
    "message": [
        "Password is required"
    ]
}
```

&nbsp;

## 2. POST /login

Description:

- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email / password"
}
```

&nbsp;

## 3. GET /groups

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response:

_Response (200 - OK)_

```json
[
  {
    "id": integer,
    "name": "string",
    "description": "string",
    "imgGroupUrl": "string"
  },
  {
    "id": integer,
    "name": "string",
    "description": "string",
    "imgGroupUrl": "string"
  },
  ...
]
```

&nbsp;

## 4. GET /myGroups

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response:

_Response (200 - OK)_

```json
[
  {
    "UserId": integer,
    "GroupId": integer,
    "Group": {
      "id": integer,
      "name": "string",
      "description": "string",
      "imgGroupUrl": "string"
    },
    "User": {
      "id": integer,
      "username": "string",
      "email": "string",
      "password": "string",
      "imgUrl": null,
      "name": "string"
    }
  },
  {
    "UserId": integer,
    "GroupId": integer,
    "Group": {
      "id": integer,
      "name": "string",
      "description": "string",
      "imgGroupUrl": "string"
    },
    "User": {
      "id": integer,
      "username": "string",
      "email": "string",
      "password": "string",
      "imgUrl": null,
      "name": "string"
    }
  },
  ...
]
```

&nbsp;

## 5. POST /myGroups/:groupId

Description:

- Join group

Request:

- params:

```json
{
  "id": integer
}
```

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response:

_Response (200 - OK)_

```json
{
  "UserId": integer,
  "GroupId": integer
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You're Already Join"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data is not found"
}
```

&nbsp;

## 6. GET /myGroups/:groupId/detail

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "groupId": integer
}
```

Response:

_Response (200 - OK)_

```json
{
    "UserId": integer,
    "GroupId": integer,
    "Group": {
        "id": integer,
        "name": "string",
        "description": "string",
        "imgGroupUrl": "string"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data is not found"
}
```

&nbsp;

## 7. DELETE /myGroups/:groupId

Description:

- Delete group by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "groupId": integer
}
```

_Response (200 - OK)_

```json
{
  "message": "Group successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 8. POST /chats/openai

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- body:

```json
{
  "inputPrompt": "string"
}
```

Response:

_Response (200 - OK)_

```json
{
  "result": "string"
}
```

&nbsp;

## 9. GET /profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response:

_Response (200 - OK)_

```json
{
  "id": integer,
  "username": "string",
  "name": "string",
  "email": "string",
  "img": "string"
}
```

&nbsp;

## 10. PUT /profile/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": integer
}
```

- body:

```json
{
  "name": "string",
  "username": "string",
  "avatar": file
}
```

_Response (200 - OK)_

```json
{
    "id": integer,
    "username": "string",
    "email": "string",
    "imgUrl": "string",
    "name": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
