import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient()

async function dbConnect(){
    try {
        await db.$connect()
        console.log('db', db)
    } catch (error) {
        console.log('error', error)
    }
}

console.log('db', db)
dbConnect()