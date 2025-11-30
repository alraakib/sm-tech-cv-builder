"use client";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "@/utils/store";
import {
  addCertificateInfo,
  updateCertificateInfo,
  type CertificateEntry,
} from "@/utils/store/reducers/certificate";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const CertificateForm = () => {
  const dispatch = useDispatch();
  const certificate = useSelector((state: RootState) => state.certificate);
  const entries = certificate?.entries ?? [];
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (entries.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      dispatch(addCertificateInfo());
    }
  }, [dispatch, entries.length]);

  return (
    <div className="flex flex-col gap-6">
      {entries.map((entry: CertificateEntry) => (
        <CertificateEntryForm key={entry.id} entry={entry} />
      ))}
      <Button
        variant="link"
        onClick={() => {
          dispatch(addCertificateInfo());
        }}
        className="p-0 w-fit"
      >
        <Plus /> Add Another Certificate
      </Button>
    </div>
  );
};

const CertificateEntryForm = ({ entry }: { entry: CertificateEntry }) => {
  const dispatch = useDispatch();

  const { control, watch } = useForm({
    defaultValues: {
      title: entry.title,
      issuingOrganization: entry.issuingOrganization,
      issueDate: entry.issueDate,
      expiryDate: entry.expiryDate,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const changes: Partial<Omit<CertificateEntry, "id">> = {};

      if (data.title !== undefined) changes.title = data.title;
      if (data.issuingOrganization !== undefined)
        changes.issuingOrganization = data.issuingOrganization;

      if (data.issueDate !== undefined) {
        const issue = data.issueDate as string | Date;
        changes.issueDate = issue instanceof Date ? issue.toISOString() : issue;
      }
      if (data.expiryDate !== undefined) {
        const expiry = data.expiryDate as string | Date;
        changes.expiryDate =
          expiry instanceof Date ? expiry.toISOString() : expiry;
      }

      dispatch(
        updateCertificateInfo({
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
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`title-${entry.id}`}>Certification Title</Label>
              <Input {...field} size="lg" placeholder="Certification Title" />
            </div>
          )}
        />

        {/* Issuing Organization */}
        <Controller
          name="issuingOrganization"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor={`organization-${entry.id}`}>
                Issuing Organization
              </Label>
              <Input {...field} size="lg" placeholder="Issuing Organization" />
            </div>
          )}
        />

        <div className="col-span-12 grid grid-cols-2 gap-2">
          <Label htmlFor={`date-${entry.id}`} className="col-span-2">
            Certificate Issue
          </Label>

          {/* Issue Date */}
          <Controller
            name="issueDate"
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

          {/* Expiry Date */}
          <Controller
            name="expiryDate"
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

export default CertificateForm;
