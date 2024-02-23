/*
  Warnings:

  - Added the required column `acessToken` to the `GithubUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubUser" ADD COLUMN     "acessToken" TEXT NOT NULL;
