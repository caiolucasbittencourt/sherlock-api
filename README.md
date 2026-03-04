# Sherlock Holmes API

Free REST API for Sherlock Holmes quotes, cases, and characters from the public domain works of Sir Arthur Conan Doyle.

## Base URL

```
https://sherlockapi.co/api/v1
```

## Endpoints

### Random Quote

Get a random quote from the Sherlock Holmes canon.

```
GET /quotes/random
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "q001",
    "text": "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "character": "Sherlock Holmes",
    "book": "The Sign of the Four",
    "year": 1890
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0"
  }
}
```

### Cases

Get all 60 cases from the official canon (4 novels + 56 short stories).

```
GET /cases
GET /cases?type=Novel
GET /cases?type=Short%20Story
```

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| type      | string | Filter by `Novel` or `Short Story` |

### Characters

Get the list of main characters.

```
GET /characters
```

### Search

Search quotes by keyword.

```
GET /search?q=impossible
```

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| q         | string | Yes      | Search term |

### Health Check

```
GET /health
```

## Rate Limiting

- **100 requests per minute** per IP
- Headers included in responses:
  - `X-RateLimit-Limit` - Maximum requests allowed
  - `X-RateLimit-Remaining` - Requests remaining
  - `X-RateLimit-Reset` - Unix timestamp when limit resets

## Examples

### cURL

```bash
curl https://sherlockapi.co/api/v1/quotes/random
```

### JavaScript

```javascript
const response = await fetch("https://sherlockapi.co/api/v1/quotes/random");
const data = await response.json();
console.log(data.data.text);
```

### Python

```python
import requests

response = requests.get('https://sherlockapi.co/api/v1/quotes/random')
data = response.json()
print(data['data']['text'])
```

---

## Development

### Setup

```bash
git clone https://github.com/caiolucasbittencourt/sherlock-api.git
cd sherlock-api
npm install
npm run dev
```

### Project Structure

```
src/
├── api/           # Vercel serverless entry point
├── controllers/   # Endpoint logic
├── data/          # Static JSON data
├── middlewares/   # Rate limiter, error handler
├── models/        # Zod schemas and TypeScript types
├── repositories/  # Repository Pattern for data access
├── routes/        # Route definitions
├── app.ts         # Express configuration
└── server.ts      # Development entry point
```

### Deploy

```bash
vercel
```

## License

All data is from the works of **Arthur Conan Doyle**, which are in the **Public Domain**.

Source code is licensed under **MIT**.
