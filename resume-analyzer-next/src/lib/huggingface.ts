export async function analyzeResume(resumeText: string): Promise<string> {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: resumeText,
          parameters: {
            candidate_labels: [
              "strong technical skills",
              "good communication",
              "leadership experience",
              "project management",
              "education",
              "work experience",
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Format the analysis results
    const scores = result.scores;
    const labels = result.labels;
    
    let strengths: string[] = [];
    let improvements: string[] = [];
    
    // Analyze scores and create feedback
    labels.forEach((label: string, index: number) => {
      if (scores[index] > 0.6) {
        strengths.push(label);
      } else if (scores[index] < 0.4) {
        improvements.push(label);
      }
    });

    // Generate formatted feedback
    return `SUMMARY:
A comprehensive analysis of your resume has been completed.

STRENGTHS:
${strengths.map(s => `- Strong ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${improvements.map(i => `- Could improve ${i}`).join('\n')}

RECOMMENDATIONS:
${improvements.map(i => `- Consider adding more details about your ${i}`).join('\n')}

OVERALL ASSESSMENT:
Based on the analysis, your resume shows ${strengths.length > 2 ? 'strong' : 'moderate'} potential. 
Score: ${Math.round((strengths.length / labels.length) * 10)}/10`;

  } catch (error) {
    console.error('Error analyzing resume with HuggingFace:', error);
    throw new Error('Failed to analyze resume');
  }
}
