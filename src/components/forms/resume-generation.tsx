"use client";
import { generateResume } from "@/app/actions/generateResume";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { RootState } from "@/utils/store";
import { setGeneratedResume } from "@/utils/store/reducers/resume";
import { CircleAlert, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Progress } from "../ui/progress";

const ResumeGenerationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const careerSummary = useSelector((state: RootState) => state.careerSummary);
  const experience = useSelector((state: RootState) => state.experience);
  const education = useSelector((state: RootState) => state.education);
  const contactInfo = useSelector((state: RootState) => state.contactInfo);
  const certificate = useSelector((state: RootState) => state.certificate);

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const resume = await generateResume({
        personalInfo,
        careerSummary,
        experience,
        education,
        contactInfo,
        certificate,
      });

      dispatch(setGeneratedResume(resume));
      router.push("/onboarding/review-download");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isGenerating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 94) {
            clearInterval(interval);
            return 94;
          }
          return prev + Math.random() * 10;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <motion.div
      key="resume-generation"
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <h2 className="text-4xl font-semibold">AI Resume Magic</h2>
      <p className="text-muted-foreground">
        Now, let’s turn all the information you’ve provided into a professional
        resume! Our AI will generate a polished version that showcases your
        strengths and matches industry standards.
      </p>

      <div className="flex flex-col gap-6 items-center justify-center py-5">
        {!isGenerating && !error && (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Lightbulb size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">Ready to Generate</h3>
            <p className="text-muted-foreground max-w-md">
              Click the button below to let our AI create your professional
              resume based on all the information you've provided.
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-lg font-medium">AI is refining your resume...</p>
            <Progress value={progress} />
          </div>
        )}

        {error && (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <CircleAlert size={32} className="text-destructive" />
            </div>
            <h3 className="text-2xl font-semibold text-destructive">
              Generation Failed
            </h3>
            <p className="text-muted-foreground max-w-md">{error}</p>
          </div>
        )}

        <Button
          size="lg"
          onClick={handleGenerateResume}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Spinner className="mr-2" />
              Generating...
            </>
          ) : (
            "Generate Resume with AI"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ResumeGenerationForm;
