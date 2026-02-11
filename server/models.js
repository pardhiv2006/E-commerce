import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function createUser(db, userData) {
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
}

export async function findUserByEmail(db, email) {
    return await db.collection('users').findOne({ email });
}

export async function validatePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}
