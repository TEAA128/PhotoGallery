# Project Name
>Project description

# PhotoGallery

## Server API

### Get rooms info
  * GET `/api/rooms/:roomId`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "room_id": "Number",
      "title": "String",
      "address": "String",
      "room_photos": [{imageUrl: "String", description: "String"}...]
    }
```

### Get user info
  * GET `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "lists":[{name: "String"} ...]
    }
```


### Add rooms
  * POST `/api/rooms`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "title": "String",
      "address": "String",
      "room_photos": [{imageUrl: "String", description: "String"}...]
    }
```

### Add image to rooms
  * POST `/api/rooms/:roomId/images`

**Path Parameters:**

  * `roomId` room id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "image": "image URL",
      "description": "String",
    }
```


### Add lists
  * POST `/api/users/:userId/lists`

**Path Parameters:** `201`

  * `userId` user id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the folowing keys.

```json
    {
      "name": "String"
    }
```

### Add rooms to list
  * POST `/api/users/:userId/lists/:listId`

**Path Parameters:**
  * `userId` user id
  * `listId` list id


**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "room_Id": "Number"
    }
```

### Update rooms info
  * PATCH `/api/rooms/:roomId`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "title": "String",
      "address": "String",
      "room_photos": [{imageUrl: "String", description: "String"}...]
    }
```


### Delete rooms
  * DELETE `/api/rooms/:roomId`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `204`

### Delete rooms to list
  * DELETE `/api/users/:userId/lists/:listId/listRooms/:listRoomId`

**Path Parameters:**
  * `listRoomId` list rooms id
  * `userId` user id
  * `listId` list id

**Success Status Code:** `204`

