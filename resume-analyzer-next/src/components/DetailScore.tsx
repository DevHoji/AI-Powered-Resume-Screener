"use client";
import { FeedbackDetails } from "@/app/result/[id]/_components/ResultPresentation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DetailScoreComponent({
  feedbackName,
  feedback,
}: {
  feedbackName: string;
  feedback: FeedbackDetails;
}) {
  return (
    <section className="bg-backgorund p-4 border rounded-lg text-foreground">
      <h1 className="font-bold pt-8 pb-4 pl-1">{feedbackName}</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-1">Strengths</AccordionTrigger>
          {feedback.strengths.map((strength, index) => (
            <AccordionContent className="pl-2" key={index}>
              {strength}
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="pl-1">
            Areas for improvement
          </AccordionTrigger>
          {feedback.areas_for_improvement.map((area, index) => (
            <AccordionContent className="pl-2" key={index}>
              {area}
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="pl-2">Suggestions</AccordionTrigger>
          {feedback.suggestions.map((suggestion, index) => (
            <AccordionContent className="pl-2" key={index}>
              {suggestion}
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </section>
  );
}
