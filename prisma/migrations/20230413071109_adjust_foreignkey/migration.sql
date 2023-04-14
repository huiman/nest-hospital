/*
  Warnings:

  - A unique constraint covering the columns `[organization]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_no]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone_no` on table `Phone` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_patientId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Email" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Hospital" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "phone_no" SET NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hospitalId" INTEGER,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_organization_key" ON "Address"("organization");

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_name_key" ON "Hospital"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_phone_no_key" ON "Phone"("phone_no");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;
