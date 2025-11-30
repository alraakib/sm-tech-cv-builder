"use client";
import CareerOverviewForm from "@/components/forms/career-overview";
import ContactInformationForm from "@/components/forms/contact-information";
import EducationCertificationsForm from "@/components/forms/education-certifications/education";
import ExperienceSkillsForm from "@/components/forms/experience-skills";
import PersonalInfoForm from "@/components/forms/personal-info";
import ResumeGenerationForm from "@/components/forms/resume-generation";
import ReviewDownloadForm from "@/components/forms/review-download";
import OnboardingStepper from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const OnBoarding = ({ params }: { params: Promise<{ step: string[] }> }) => {
  const { step } = use(params);

  const routes: string[] = [
    "personal-info",
    "career-summary",
    "skill-experience",
    "education-certifications",
    "contact-information",
    "resume-generation",
    "review-download",
  ];

  if (!step || step.length === 0 || !routes.includes(step[0])) {
    notFound();
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(
    routes.indexOf(step[0]) + 1
  );

  const stepContent = [
    {
      step: "01",
      title: "Personal Info",
      description: "Basic personal details",
    },
    {
      step: "02",
      title: "Career Summary",
      description: "Professional overview",
    },
    {
      step: "03",
      title: "Skill & Experience",
      description: "Work history and skills",
    },
    {
      step: "04",
      title: "Education & Certifications",
      description: "Academic background",
    },
    {
      step: "05",
      title: "Contact Information",
      description: "Professional links",
    },
    {
      step: "06",
      title: "AI Resume Generation",
      description: "Generate with AI",
    },
    {
      step: "07",
      title: "Review & Download",
      description: "Final review",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    setCurrentStepIndex(routes.indexOf(step[0]) + 1);
  }, [step]);

  const renderForm = () => {
    switch (step[0]) {
      case routes[0]:
        return <PersonalInfoForm key="personal-info" />;
      case routes[1]:
        return <CareerOverviewForm key="career-overview" />;
      case routes[2]:
        return <ExperienceSkillsForm key="experience-skills" />;
      case routes[3]:
        return <EducationCertificationsForm key="education-certifications" />;
      case routes[4]:
        return <ContactInformationForm key="contact-information" />;
      case routes[5]:
        return <ResumeGenerationForm key="resume-generation" />;
      case routes[6]:
        return <ReviewDownloadForm key="review-download" />;
      default:
        return notFound();
    }
  };

  const showNavigation = currentStepIndex >= 1 && currentStepIndex <= 5;

  return (
    <div className="container overflow-hidden mx-auto py-8 flex flex-col gap-14">
      <OnboardingStepper currentStep={currentStepIndex} steps={stepContent} />
      <div className="flex flex-col gap-14 w-9/12 mx-auto">
        <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
        {showNavigation && (
          <div className="grid grid-cols-2 gap-5">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                if (currentStepIndex === 1) {
                  router.push("/");
                } else {
                  router.push(`/onboarding/${routes[currentStepIndex - 2]}`);
                }
              }}
            >
              <ArrowLeft /> Back
            </Button>
            <Button
              size="lg"
              disabled={currentStepIndex === routes.length}
              onClick={() => {
                router.push(`/onboarding/${routes[currentStepIndex]}`);
              }}
            >
              Next <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
