import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

export default function OnboardingStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { step: string; title: string; description: string }[];
}) {
  return (
      <Stepper defaultValue={currentStep} value={currentStep}>
        {steps.map(({ step, title, description }) => (
          <StepperItem
            className="relative flex-1 flex-col!"
            key={step}
            step={Number(step)}
          >
            {/* <StepperTrigger className="flex-col gap-3 rounded"> */}
            <StepperIndicator />
            <div className="space-y-0.5 px-2 text-wrap w-1/2">
              <StepperTitle className="text-center text-muted-foreground">
                {title}
              </StepperTitle>
              {/* <StepperDescription className="max-sm:hidden">
                  {description}
                </StepperDescription> */}
            </div>
            {/* </StepperTrigger> */}
            {Number(step) < steps.length && (
              <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
  );
}
