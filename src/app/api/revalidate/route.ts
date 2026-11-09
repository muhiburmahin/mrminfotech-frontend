import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Purge edge cache for all public routes
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/team');
    revalidatePath('/services');
    revalidatePath('/projects');
    revalidatePath('/products');
    revalidatePath('/blog');
    revalidatePath('/about');
    revalidatePath('/contact');

    // Purge specific data tags
    revalidateTag('homepage', 'max');
    revalidateTag('team', 'max');
    revalidateTag('projects', 'max');
    revalidateTag('services', 'max');
    revalidateTag('products', 'max');
    revalidateTag('blog', 'max');

    return NextResponse.json({
      success: true,
      message: 'Edge cache successfully purged and revalidated across all routes.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}

