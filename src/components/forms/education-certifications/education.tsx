"use client";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "@/utils/store";
import {
  addEducationInfo,
  updateEducationInfo,
  type EducationEntry,
} from "@/utils/store/reducers/education";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const EducationForm = () => {
  const dispatch = useDispatch();
  const { entries }: { entries: EducationEntry[] } = useSelector(
    (state: RootState) => state.education
  );
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (entries.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      dispatch(addEducationInfo());
    }
  }, [dispatch, entries.length]);

  return (
    <div className="flex flex-col gap-6">
      {entries.map((entry) => (
        <EducationEntryForm key={entry.id} entry={entry} />
      ))}
      <Button
        variant="link"
        onClick={() => {
          dispatch(addEducationInfo());
        }}
        className="p-0 w-fit"
      >
        <Plus /> Add Another Education
      </Button>
    </div>
  );
};

const EducationEntryForm = ({ entry }: { entry: EducationEntry }) => {
  const dispatch = useDispatch();

  const { control, watch } = useForm({
    defaultValues: {
      degree: entry.degree,
      institutionName: entry.institutionName,
      major: entry.major,
      graduationStart: entry.graduationStart,
      graduationEnd: entry.graduationEnd,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const changes: Partial<Omit<EducationEntry, "id">> = {};

      if (data.degree !== undefined) changes.degree = data.degree;
      if (data.institutionName !== undefined)
        changes.institutionName = data.institutionName;
      if (data.major !== undefined) changes.major = data.major;

      if (data.graduationStart !== undefined) {
        const start = data.graduationStart as string | Date;
        changes.graduationStart =
          start instanceof Date ? start.toISOString() : start;
      }
      if (data.graduationEnd !== undefined) {
        const end = data.graduationEnd as string | Date;
        changes.graduationEnd = end instanceof Date ? end.toISOString() : end;
      }

      dispatch(
        updateEducationInfo({
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
        {/* Degree */}
        <Controller
          name="degree"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`degree-${entry.id}`}>Your Degree</Label>
              <Input
                {...field}
                size="lg"
                placeholder="e.g., Bachelor’s, Master’s"
              />
            </div>
          )}
        />

        {/* Institution Name */}
        <Controller
          name="institutionName"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor={`schoolName-${entry.id}`}>Institution Name</Label>
              <Input {...field} size="lg" placeholder="Institution Name" />
            </div>
          )}
        />

        {/* Major */}
        <Controller
          name="major"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor={`fieldOfStudy-${entry.id}`}>Major</Label>
              <Input {...field} size="lg" placeholder="Major" />
            </div>
          )}
        />

        <div className="col-span-12 grid grid-cols-2 gap-2">
          <Label htmlFor={`graduation-${entry.id}`} className="col-span-2">
            Graduation
          </Label>

          {/* Graduation Start */}
          <Controller
            name="graduationStart"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <DatePicker
                  value={field.value ? new Date(field.value) : ""}
                  onChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Graduation End */}
          <Controller
            name="graduationEnd"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <DatePicker
                  value={field.value ? new Date(field.value) : ""}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default EducationForm;
