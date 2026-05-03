-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resumes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "resumes_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resumes" ("content", "createdAt", "id", "isPublic", "templateId", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "isPublic", "templateId", "title", "updatedAt", "userId" FROM "resumes";
DROP TABLE "resumes";
ALTER TABLE "new_resumes" RENAME TO "resumes";
CREATE INDEX "resumes_userId_idx" ON "resumes"("userId");
CREATE INDEX "resumes_templateId_idx" ON "resumes"("templateId");
CREATE TABLE "new_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "category" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_templates" ("category", "createdAt", "description", "id", "isActive", "name", "slug", "style", "thumbnail", "updatedAt") SELECT "category", "createdAt", "description", "id", "isActive", "name", "slug", "style", "thumbnail", "updatedAt" FROM "templates";
DROP TABLE "templates";
ALTER TABLE "new_templates" RENAME TO "templates";
CREATE UNIQUE INDEX "templates_slug_key" ON "templates"("slug");
CREATE INDEX "templates_category_idx" ON "templates"("category");
CREATE INDEX "templates_slug_idx" ON "templates"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
