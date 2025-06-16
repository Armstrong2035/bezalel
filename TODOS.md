# Bezalel Codebase TODOs and Current State

## Context Management Evolution

### Current Implementation

- Context data is stored in Firestore
- Each prompt request requires:
  1. Query Firestore to get user's context
  2. Use context to create prompt
- This creates O(n²) complexity with unnecessary database reads

### Proposed Optimizations

#### Option 1: Direct Context ID Access

- Store `contextId` and `userId` in client
- Send these IDs with each request
- Server uses `contextId` to directly fetch context
- Reduces to O(1) but still requires Firestore read

#### Option 2: Client-Side Context Storage

- Store full context data in client
- Send context directly with requests
- Eliminates Firestore reads
- Concerns about data security and integrity

#### Option 3: Encrypted Client-Side Context (Recommended)

- Encrypt context data on client
- Store encrypted data in client
- Send encrypted context with requests
- Server decrypts before use
- Benefits:
  - O(1) performance
  - No Firestore reads
  - Secure data storage
  - Data integrity through encryption

## Current Hardcoded Values

### In `src/routes/context.js`

```javascript
// Hardcoded userId for testing
const userId = "mock-user-1710864000000";
```

### In `src/scripts/testPrompt.js`

```javascript
// Hardcoded contextId for testing
const contextId = "mock-user-1710864000000";
```

## Implementation TODOs

### 1. Security Improvements

- [ ] Implement context encryption/decryption
- [ ] Set up secure encryption key management
- [ ] Add data validation for encrypted context
- [ ] Implement context versioning for updates

### 2. Code Cleanup

- [ ] Remove hardcoded user IDs
- [ ] Implement proper user authentication
- [ ] Add proper error handling for encryption/decryption
- [ ] Add logging for debugging

### 3. Performance Optimizations

- [ ] Implement client-side context storage
- [ ] Add context update mechanism
- [ ] Implement context versioning
- [ ] Add cache invalidation strategy

### 4. Testing

- [ ] Add tests for encryption/decryption
- [ ] Add tests for context updates
- [ ] Add tests for prompt generation
- [ ] Add integration tests

## Proposed Architecture

### Client Side

```javascript
// Context Management
const context = {
  // ... context data
};
const encryptedContext = encryptContext(context);
localStorage.setItem("context", JSON.stringify(encryptedContext));

// Making Requests
const requestBody = {
  encryptedContext: JSON.parse(localStorage.getItem("context")),
  userId: currentUser.id,
  segment: selectedSegment,
};
```

### Server Side

```javascript
// Route Handler
router.post("/canvas/prompt", async (req, res) => {
  const { encryptedContext, userId, segment } = req.body;
  const context = decryptContext(encryptedContext);
  const prompt = createPrompt(context, segment);
  res.json({ prompt });
});
```

## Security Considerations

### Encryption

- Use AES-256-GCM for encryption
- Store encryption key securely
- Implement proper IV management
- Add authentication tags

### Data Integrity

- Validate context structure
- Check for tampering
- Implement version control
- Handle update conflicts

### Performance

- Minimize encryption overhead
- Implement efficient storage
- Handle large contexts
- Manage memory usage

## Next Steps

1. Implement basic encryption/decryption
2. Remove hardcoded values
3. Add proper error handling
4. Implement context versioning
5. Add comprehensive testing
6. Document the new architecture

## Route Structure and Function Hierarchy

### Context Routes (`src/routes/context.js`)

#### 1. POST `/api/context`

**Purpose**: Save new context data

```javascript
router.post("/", async (req, res) => {
  // Input: onBoardData from req.body
  // Output: savedContext object
});
```

Function Call Tree:

- `saveToMemory(userId, onBoardData)` in `src/engines/decisionEngine/decisionContext.js`
  - `mapDecisionContext(onBoardData)` - Maps input data to context structure
  - `saveContext(userId, context)` in `src/services/contextService.js`
    - Creates new document in Firestore `contexts` collection
    - Returns saved context with ID

#### 2. POST `/api/context/canvas/prompt`

**Purpose**: Generate prompt for canvas segment

```javascript
router.post("/canvas/prompt", async (req, res) => {
  // Input: { contextId, segment } from req.body
  // Output: { prompt: string }
});
```

Function Call Tree:

- `getUserContexts(userId)` in `src/services/contextService.js`
  - Queries Firestore for user's contexts
  - Returns array of contexts sorted by createdAt
- `createPrompt(contextId, segment)` in `src/engines/canvasEngine/canvasSchema.js`
  - `getContext(contextId)` in `src/services/contextService.js`
    - Fetches specific context from Firestore
  - Uses context data to build prompt string
  - Returns formatted prompt

### User Routes (`src/routes/users.js`)

#### 1. POST `/api/users`

**Purpose**: Create new user

```javascript
router.post("/", async (req, res) => {
  // Input: userData from req.body
  // Output: created user object
});
```

Function Call Tree:

- `createUser(uid, userData)` in `src/services/userService.js`
  - Creates new document in Firestore `users` collection
  - Returns created user object

### Health Routes (`src/routes/health.js`)

#### 1. GET `/api/health`

**Purpose**: Check API health status

```javascript
router.get("/", (req, res) => {
  // Output: { status: "ok" }
});
```

## File Dependencies

### Core Files

```
src/
├── app.js                    # Main application setup
├── config/
│   └── firebase.js          # Firebase configuration
├── routes/
│   ├── context.js           # Context-related endpoints
│   ├── users.js             # User-related endpoints
│   └── health.js            # Health check endpoint
├── services/
│   ├── contextService.js    # Context database operations
│   └── userService.js       # User database operations
├── engines/
│   ├── decisionEngine/
│   │   └── decisionContext.js  # Context mapping and saving
│   └── canvasEngine/
│       └── canvasSchema.js     # Prompt generation
└── utils/
    └── encryption.js        # Encryption utilities
```

### Data Flow

1. **Context Creation**

   ```
   Client Request
   → POST /api/context
   → saveToMemory()
   → mapDecisionContext()
   → saveContext()
   → Firestore
   ```

2. **Prompt Generation**

   ```
   Client Request
   → POST /api/context/canvas/prompt
   → getUserContexts()
   → createPrompt()
   → getContext()
   → Firestore
   → Response with prompt
   ```

3. **User Creation**
   ```
   Client Request
   → POST /api/users
   → createUser()
   → Firestore
   → Response with user
   ```

## Current Implementation Notes

### Database Structure

- **Firestore Collections**:
  - `contexts`: Stores user context data
  - `users`: Stores user information

### Authentication Flow

- Uses Firebase Authentication
- Token verification in `src/middleware/auth.js`
- User ID extracted from token for context operations

### Context Data Structure

```javascript
{
  id: string,
  userId: string,
  idea: string,
  experienceLevel: string,
  goal: string,
  timeAvailability: string,
  capital: string,
  archetype: string,
  createdAt: string,
  updatedAt: string
}
```
