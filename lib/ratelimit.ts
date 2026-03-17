// Rate limiting is now handled via getMessageCountByUserId in lib/db/queries.ts
// The per-user message count check in the chat route replaces the Redis-based IP rate limit
