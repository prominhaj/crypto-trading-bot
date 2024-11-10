import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import User from '@/modals/user-modal';

export async function POST(req) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        });
    }

    // Do something with the payload
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
        const { id, email_addresses, image_url, first_name, last_name } = evt.data;

        const user = {
            clerkId: id,
            email: email_addresses[0].email_address,
            photo_url: image_url,
            firstName: first_name,
            lastName: last_name
        };

        const newUser = await User.create(user);

        return NextResponse.json({ message: 'New user created', user: newUser });
    }

    if (eventType === 'user.updated') {
        const { id, email_addresses, image_url, first_name, last_name } = evt.data;

        // Find the user by clerkId and update their information
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                email: email_addresses[0].email_address,
                photo_url: image_url,
                firstName: first_name,
                lastName: last_name
            },
            { new: true }
        );

        if (user) {
            return NextResponse.json({ message: 'User updated', user });
        }

        return new Response('User not found for update', { status: 404 });
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data;

        // Remove the user from the database by clerkId
        const deletedUser = await User.findOneAndDelete({ clerkId: id });

        if (deletedUser) {
            return NextResponse.json({ message: 'User deleted', user: deletedUser });
        }

        return new Response('User not found for deletion', { status: 404 });
    }

    return new Response('', { status: 200 });
}
