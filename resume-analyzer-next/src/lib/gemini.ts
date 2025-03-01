import fetch from 'node-fetch';

export async function analyzeResume(resumeText: string): Promise<string> {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional resume analyzer. Please analyze the following resume and provide detailed feedback in this specific format:

SUMMARY:
[Brief overview of the resume]

STRENGTHS:
- [Key strength 1]
- [Key strength 2]
...

AREAS FOR IMPROVEMENT:
- [Area 1]
- [Area 2]
...

RECOMMENDATIONS:
- [Specific recommendation 1]
- [Specific recommendation 2]
...

OVERALL ASSESSMENT:
[Final thoughts and score out of 10]

Here's the resume to analyze:
${resumeText}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    throw new Error('Failed to analyze resume');
  }
}
