-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "githubUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "faviconUrl" TEXT NOT NULL,
    "githubUserId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_githubUserId_fkey" FOREIGN KEY ("githubUserId") REFERENCES "GithubUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
