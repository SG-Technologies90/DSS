import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Gallery from '@/models/Gallery';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const deletedImage = await Gallery.findByIdAndDelete(id);
        if (!deletedImage) return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: deletedImage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        // Fetch all images and sort by newest first
        const images = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: images }, { status: 200 });
    } catch (error) {
        console.error("Gallery GET Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        
        if (!body.imageUrl) {
            return NextResponse.json({ success: false, message: 'Image URL is required' }, { status: 400 });
        }
        
        const newImage = await Gallery.create({ imageUrl: body.imageUrl });
        return NextResponse.json({ success: true, data: newImage }, { status: 201 });
    } catch (error) {
        console.error("Gallery POST Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}