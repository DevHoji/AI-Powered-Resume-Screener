import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Mock result data for testing
    const mockResult = {
      score: 85,
      feedback: {
        content: {
          score: 88,
          strengths: [
            "Clear and concise writing style",
            "Strong action verbs used",
            "Key achievements highlighted",
          ],
          areas_for_improvement: [
            "More quantifiable metrics needed",
            "Some technical skills could be more detailed",
          ],
          suggestions: [
            "Add specific numbers to achievements (e.g., 'increased sales by 25%')",
            "List relevant certifications and versions of technical tools",
            "Include a brief technical skills section",
          ],
        },
        format: {
          score: 82,
          strengths: [
            "Professional layout",
            "Consistent formatting",
            "Good use of white space",
          ],
          areas_for_improvement: [
            "Section headers could be more prominent",
            "Bullet point alignment inconsistent",
          ],
          suggestions: [
            "Make section headers bold and slightly larger",
            "Ensure all bullet points are aligned consistently",
            "Consider adding subtle dividing lines between sections",
          ],
        },
        additionals: {
          score: 85,
          strengths: [
            "Contact information complete",
            "Professional email address",
            "Location included",
          ],
          areas_for_improvement: [
            "Missing LinkedIn profile",
            "No portfolio links",
          ],
          suggestions: [
            "Add LinkedIn profile URL",
            "Include GitHub or relevant portfolio links",
            "Consider adding a brief professional summary",
          ],
        },
      },
    };

    // Simulate a slight delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(mockResult, { status: 200 });
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Error fetching result" },
      { status: 500 }
    );
  }
}
