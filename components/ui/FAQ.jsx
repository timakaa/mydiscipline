import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="relative w-full max-w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>Yes. It's free.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why do I need this?</AccordionTrigger>
        <AccordionContent>
          Well, if you want to see your progress.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Simply build your charts, update your data, and watch as your progress
          is visualized in real-time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How many charts can I have?</AccordionTrigger>
        <AccordionContent>You can create up to 10 charts.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Is it automatized somehow?</AccordionTrigger>
        <AccordionContent>
          No, you have to update the data manually.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
