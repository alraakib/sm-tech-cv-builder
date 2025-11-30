import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { RootState } from "@/utils/store";
import { updateCareerInfo } from "@/utils/store/reducers/career-summary";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const CareerOverviewForm = () => {
  const dispatch = useDispatch();

  const { jobTitle, jobDescription } = useSelector(
    (state: RootState) => state.careerSummary
  );

  const { control, watch } = useForm({
    defaultValues: {
      jobTitle,
      jobDescription,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(updateCareerInfo(data));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <motion.div
      key="career-overview"
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <h2 className="text-4xl font-semibold">Your Career Overview</h2>
      <p className="text-muted-foreground">
        A strong career summary will make a lasting impression on recruiters.
        Let’s create a summary that highlights your experience and goals.
      </p>
      <div className="grid gap-5">
        {/* Job Title */}
        <Controller
          name="jobTitle"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">Job Title</Label>
              <Input {...field} size="lg" placeholder="Job Title" />
            </div>
          )}
        />

        {/* Job Description */}
        <Controller
          name="jobDescription"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Job Description</Label>
              <Textarea {...field} rows={5} placeholder="Job Description" />
            </div>
          )}
        />
      </div>
    </motion.div>
  );
};

export default CareerOverviewForm;
