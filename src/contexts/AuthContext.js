"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { user: clerkUser, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && clerkUser) {
            setUser({
                id: clerkUser.id,
                name: clerkUser.fullName || clerkUser.firstName || 'User',
                email: clerkUser.primaryEmailAddress?.emailAddress,
                purchasedCourses: clerkUser.unsafeMetadata.purchasedCourses || []
            });
        } else if (isLoaded && !clerkUser) {
            setUser(null);
        }
    }, [clerkUser, isLoaded]);

    const logout = async () => {
        await signOut();
        router.push('/');
    };

    const buyCourse = async (courseId) => {
        if (!clerkUser) {
            router.push('/signup');
            return;
        }

        const currentPurchased = clerkUser.unsafeMetadata.purchasedCourses || [];
        if (currentPurchased.includes(courseId)) return;

        const updatedPurchased = [...currentPurchased, courseId];
        await clerkUser.update({
            unsafeMetadata: {
                ...clerkUser.unsafeMetadata,
                purchasedCourses: updatedPurchased
            }
        });
    };

    const buyPackage = async (packageObj) => {
        if (!clerkUser) {
            router.push('/signup');
            return;
        }

        const currentPurchased = clerkUser.unsafeMetadata.purchasedCourses || [];
        const uniqueNewCourses = packageObj.courseIds.filter(id => !currentPurchased.includes(id));

        if (uniqueNewCourses.length === 0) return;

        const updatedPurchased = [...currentPurchased, ...uniqueNewCourses];
        await clerkUser.update({
            unsafeMetadata: {
                ...clerkUser.unsafeMetadata,
                purchasedCourses: updatedPurchased
            }
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading: !isLoaded,
            login: () => router.push('/login'),
            signup: () => router.push('/signup'),
            logout,
            buyCourse,
            buyPackage
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
