import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface UserData {
    id: string;
    email: string;
    name: string;
}

/**
 * Sync user data from Clerk to the database
 * Creates a new user or updates existing user
 */
export async function syncUserToDatabase(userData: UserData) {
    try {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.id, userData.id),
        });

        if (existingUser) {
            // Update existing user
            await db
                .update(users)
                .set({
                    email: userData.email,
                    name: userData.name,
                    updatedAt: new Date(),
                })
                .where(eq(users.id, userData.id));

            console.log('User updated:', userData.id);
        } else {
            // Create new user
            await db.insert(users).values({
                id: userData.id,
                email: userData.email,
                name: userData.name,
            });

            console.log('User created:', userData.id);
        }

        return { success: true };
    } catch (error) {
        console.error('Error syncing user to database:', error);
        return { success: false, error };
    }
}

/**
 * Get user from database by Clerk ID
 */
export async function getUserFromDatabase(userId: string) {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        return user;
    } catch (error) {
        console.error('Error getting user from database:', error);
        return null;
    }
}
