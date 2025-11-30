"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { RootState } from "@/utils/store";
import {
  addEntry,
  updateEntry,
  type ExperienceEntry,
} from "@/utils/store/reducers/experience-skill";
import { ChevronRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../date-picker";
import { Separator } from "../ui/separator";
import { TagInput } from "../ui/tag-input";

const ExperienceSkillForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { entries }: { entries: ExperienceEntry[] } = useSelector(
    (state: RootState) => state.experience
  );
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (entries.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      dispatch(addEntry());
    }
  }, []);

  return (
    <motion.div
      key="experience-skill"
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <div className="flex gap-5 justify-between">
        <div>
          <h2 className="text-4xl font-semibold">
            Your Work Experience & Skills
          </h2>
          <p className="text-muted-foreground">
            Highlight your work experience and skills. The more detail you
            provide, the better the AI can tailor your resume to match job
            opportunities.
          </p>
        </div>
        <Button
          variant="filled"
          onClick={() => {
            router.push("/onboarding/education-certifications");
          }}
        >
          Skip <ChevronRight />
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {entries.map((entry, index) => (
          <ExperienceEntryForm key={entry.id} entry={entry} />
        ))}
        <Button
          variant="link"
          onClick={() => {
            dispatch(addEntry());
          }}
          className="p-0 w-fit"
        >
          <Plus /> Add Another Work Experience
        </Button>
      </div>
    </motion.div>
  );
};

const ExperienceEntryForm = ({ entry }: { entry: ExperienceEntry }) => {
  const dispatch = useDispatch();

  const { control, watch } = useForm({
    defaultValues: {
      jobTitle: entry.jobTitle,
      companyName: entry.companyName,
      durationStart: entry.durationStart,
      durationEnd: entry.durationEnd,
      description: entry.description,
      skills: entry.skills,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const changes: Partial<Omit<ExperienceEntry, "id">> = {};

      if (data.jobTitle !== undefined) changes.jobTitle = data.jobTitle;
      if (data.companyName !== undefined)
        changes.companyName = data.companyName;

      if (data.durationStart !== undefined) {
        const start = data.durationStart as string | Date;
        changes.durationStart =
          start instanceof Date ? start.toISOString() : start;
      }
      if (data.durationEnd !== undefined) {
        const end = data.durationEnd as string | Date;
        changes.durationEnd = end instanceof Date ? end.toISOString() : end;
      }

      if (data.description !== undefined)
        changes.description = data.description;
      if (data.skills !== undefined) {
        changes.skills = data.skills.filter(
          (skill): skill is string => skill !== undefined
        );
      }

      dispatch(
        updateEntry({
          id: entry.id,
          changes,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, entry.id]);

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {/* Job Title */}
        <Controller
          name="jobTitle"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`jobTitle-${entry.id}`}>Job Title</Label>
              <Input {...field} size="lg" placeholder="Software Engineer" />
            </div>
          )}
        />

        {/* Company Name */}
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor={`companyName-${entry.id}`}>Company Name</Label>
              <Input {...field} size="lg" placeholder="Tech Corp" />
            </div>
          )}
        />

        <Label htmlFor={`duration-${entry.id}`} className="col-span-12">
          Duration
        </Label>
        {/* Duration start */}
        <Controller
          name="durationStart"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <DatePicker
                value={field.value ? new Date(field.value) : ""}
                onChange={field.onChange}
              />
            </div>
          )}
        />
        {/* Duration end*/}
        <Controller
          name="durationEnd"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <DatePicker
                value={field.value ? new Date(field.value) : ""}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`description-${entry.id}`}>
                Job Description/Responsibilities
              </Label>
              <Textarea
                {...field}
                placeholder="Describe your role and responsibilities..."
                rows={4}
              />
            </div>
          )}
        />

        {/* Skills */}
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`skills-${entry.id}`}>Skills</Label>
              <TagInput
                tags={field.value || []}
                setTags={field.onChange}
                size="lg"
                placeholder="React, TypeScript, Node.js, etc."
              />
            </div>
          )}
        />
      </div>
      <Separator />
    </>
  );
};

export default ExperienceSkillForm;
