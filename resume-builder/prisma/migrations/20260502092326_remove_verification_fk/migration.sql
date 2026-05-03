-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_verification_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_verification_tokens" ("createdAt", "email", "expires", "id", "token") SELECT "createdAt", "email", "expires", "id", "token" FROM "verification_tokens";
DROP TABLE "verification_tokens";
ALTER TABLE "new_verification_tokens" RENAME TO "verification_tokens";
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");
CREATE INDEX "verification_tokens_email_idx" ON "verification_tokens"("email");
CREATE INDEX "verification_tokens_token_idx" ON "verification_tokens"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
