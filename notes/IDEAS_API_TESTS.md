# Ideas API Test Walkthrough

This file walks through testing the `ideas` API using `curl` and `jq`.

## Prerequisites

Make sure:

- the backend server is running
- MongoDB is connected
- `curl` is available
- `jq` is installed

Check `jq`:

```bash
jq --version
```

If that works, you're good.

---

## Base URL

```bash
http://localhost:5001
```

You can optionally save that in a shell variable:

```bash
BASE_URL="http://localhost:5001"
```

Then you can use `"$BASE_URL"` in the commands below.

---

## 1. Health check

Test that the API is running:

```bash
curl "$BASE_URL/api/health" | jq
```

Expected response:

```json
{
  "message": "API is running"
}
```

---

## 2. Get all ideas

Fetch all ideas currently in the database:

```bash
curl "$BASE_URL/api/ideas" | jq
```

If the database is empty, expected response:

```json
[]
```

---

## 3. Create a new idea

Create a test idea:

```bash
curl -X POST "$BASE_URL/api/ideas" \
-H "Content-Type: application/json" \
-d '{
    "title": "Generate a 3d cube box re-creation",
    "description": "All those boxes you got rid of, they now live virtually her. Inside them, markdown of what is on the box.",
    "category": "productivity",
    "tags": ["organize", "clutter", "remember"],
    "isStarred": true
}' | jq
```

Expected response will be the created object, something like:

```json
{
  "_id": "67f33d9d1c2a8b4d12345678",
  "title": "Habit tracker for dragons",
  "description": "Track hoarding, flying, and fire practice.",
  "category": "fun",
  "tags": ["weird", "productivity", "game"],
  "isStarred": true,
  "createdAt": "2026-04-07T20:00:00.000Z",
  "updatedAt": "2026-04-07T20:00:00.000Z",
  "__v": 0
}
```

---

## 4. Save the created idea ID into a shell variable

This is very useful for the next tests.

```bash
IDEA_ID=$(curl -s -X POST "$BASE_URL/api/ideas" \
-H "Content-Type: application/json" \
-d '{
    "title": "Potion reminder app for witches",
    "description": "Track brew time and potion inventory.",
    "category": "magic",
    "tags": ["fun", "fantasy"],
    "isStarred": false
}' | jq -r '._id')
```

Print it to confirm:

```bash
echo "$IDEA_ID"
```

You should see something like:

```bash
67f33d9d1c2a8b4d12345678
```

---

## 5. Get one idea by ID

Use the saved ID:

```bash
curl "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

Expected response:

```json
{
  "_id": "67f33d9d1c2a8b4d12345678",
  "title": "Potion reminder app for witches",
  "description": "Track brew time and potion inventory.",
  "category": "magic",
  "tags": ["fun", "fantasy"],
  "isStarred": false,
  "createdAt": "2026-04-07T20:00:00.000Z",
  "updatedAt": "2026-04-07T20:00:00.000Z",
  "__v": 0
}
```

---

## 6. Update an idea

Update the idea using `PUT`:

```bash
curl -X PUT "$BASE_URL/api/ideas/$IDEA_ID" \
-H "Content-Type: application/json" \
-d '{
    "title": "Potion reminder and spell tracker",
    "description": "Track brew time, potion inventory, and active spells.",
    "category": "magic-tools",
    "tags": ["fun", "fantasy", "tools"],
    "isStarred": true
}' | jq
```

Expected response: the updated idea object.

---

## 7. Confirm the update

Fetch the same idea again:

```bash
curl "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

You should now see the updated values.

---

## 8. Delete an idea

Delete the idea by ID:

```bash
curl -X DELETE "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

Expected response:

```json
{
  "message": "Idea deleted successfully",
  "deletedIdeaId": "67f33d9d1c2a8b4d12345678"
}
```

---

## 9. Confirm deletion

Try fetching it again:

```bash
curl "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

Expected response:

```json
{
  "message": "Idea not found"
}
```

---

## 10. Get all ideas again

Check the collection after deletion:

```bash
curl "$BASE_URL/api/ideas" | jq
```

The deleted idea should no longer be in the array.

---

## Error test cases

These are useful for confirming validation and error handling.

### Invalid ID format

```bash
curl "$BASE_URL/api/ideas/not-a-real-id" | jq
```

Expected response:

```json
{
  "message": "Invalid idea ID"
}
```

### Missing title on create

```bash
curl -X POST "$BASE_URL/api/ideas" \
-H "Content-Type: application/json" \
-d '{
    "description": "This should fail because title is missing."
}' | jq
```

Expected response:

```json
{
  "message": "Title is required"
}
```

### Empty title on update

```bash
curl -X PUT "$BASE_URL/api/ideas/$IDEA_ID" \
-H "Content-Type: application/json" \
-d '{
    "title": ""
}' | jq
```

Expected response:

```json
{
  "message": "Title cannot be empty"
}
```

Note: this test should be run before deleting the item, or against a different valid idea ID.

---

## Handy one-line workflow

If you want a quick workflow:

### Create and save ID

```bash
IDEA_ID=$(curl -s -X POST "$BASE_URL/api/ideas" \
-H "Content-Type: application/json" \
-d '{"title":"Test idea","description":"Testing CRUD flow"}' | jq -r '._id')
```

### Read it

```bash
curl "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

### Update it

```bash
curl -X PUT "$BASE_URL/api/ideas/$IDEA_ID" \
-H "Content-Type: application/json" \
-d '{"title":"Updated test idea","isStarred":true}' | jq
```

### Delete it

```bash
curl -X DELETE "$BASE_URL/api/ideas/$IDEA_ID" | jq
```

---

## Notes

- `curl` sends the HTTP request
- `jq` formats the JSON response nicely
- `-s` means silent mode for `curl`, useful when capturing output into variables
- `-X` sets the HTTP method like `POST`, `PUT`, or `DELETE`
- `-H "Content-Type: application/json"` tells the server you're sending JSON
- `-d` sends the JSON body

---

## Current idea routes

These are the endpoints this file tests:

- `GET /api/ideas`
- `GET /api/ideas/:id`
- `POST /api/ideas`
- `PUT /api/ideas/:id`
- `DELETE /api/ideas/:id`
