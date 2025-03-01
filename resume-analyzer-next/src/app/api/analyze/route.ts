import { NextResponse } from 'next/server';
import { processFile } from '@/lib/fileProcessing';
import { analyzeResume } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Extract text from the resume
    const fileContent = await processFile(file);

    // Analyze the resume using Gemini
    const analysis = await analyzeResume(fileContent);

    return NextResponse.json({
      analysis,
      fileName: file.name,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Error analyzing resume' },
      { status: 500 }
    );
  }
}
