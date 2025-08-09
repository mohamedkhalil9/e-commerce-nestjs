/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");
