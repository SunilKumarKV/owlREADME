/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { AIPlatform } from '@/packages/ai-platform';

/** Maximum request body size we will proxy to Gemini (50 KB). */
const MAX_BODY_BYTES = 50 * 1024;

/** Allowed action identifiers. */
const ALLOWED_ACTIONS = new Set(['readme', 'roadmap', 'profile', 'improve']);

export async function POST(req: NextRequest) {
  try {
    // Guard against oversized bodies before parsing JSON
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large.' }, { status: 413 });
    }

    const body = await req.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large.' }, { status: 413 });
    }

    let parsed: { action?: unknown; payload?: unknown };
    try {
      parsed = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const { action, payload } = parsed;

    // Strict allowlist check
    if (typeof action !== 'string' || !ALLOWED_ACTIONS.has(action)) {
      return NextResponse.json({ error: 'Invalid action specified.' }, { status: 400 });
    }

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Missing or invalid payload.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API Key is not configured on the server.', useLocalFallback: true },
        { status: 200 } // Return 200 so client knows it is a planned fallback check
      );
    }

    try {
      const parsedResult = await AIPlatform.generate(action as any, payload as any);
      return NextResponse.json({ data: parsedResult });
    } catch (err: any) {
      console.error('AI Platform call failed:', err);
      return NextResponse.json(
        { error: 'Failed to communicate with AI platform.', useLocalFallback: true },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error('Error in secure AI Route handler:', err);
    return NextResponse.json(
      { error: err.message || 'An internal server error occurred.', useLocalFallback: true },
      { status: 500 }
    );
  }
}

