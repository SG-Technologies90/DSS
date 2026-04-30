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