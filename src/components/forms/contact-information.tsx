"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RootState } from "@/utils/store";
import { updateContactInfo } from "@/utils/store/reducers/contact-information";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ContactInformationForm = () => {
  const dispatch = useDispatch();

  const { linkedIn, portfolio, other } = useSelector(
    (state: RootState) => state.contactInfo
  );

  const { control, watch } = useForm({
    defaultValues: {
      linkedIn,
      portfolio,
      other,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(updateContactInfo(data));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <motion.div
      key="contact-information"
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <h2 className="text-4xl font-semibold">Your Contact Information</h2>
      <p className="text-muted-foreground">
        Include additional contact details and social media links to showcase
        your professional presence.
      </p>
      <div className="grid grid-cols-12 gap-5">
        {/* LinkedIn */}
        <Controller
          name="linkedIn"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                {...field}
                size="lg"
                placeholder="Enter your LinkedIn profile URL"
              />
            </div>
          )}
        />

        {/* Portfolio */}
        <Controller
          name="portfolio"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor="portfolio">Personal Website/Portfolio</Label>
              <Input
                {...field}
                size="lg"
                placeholder="Enter your personal website or portfolio URL"
              />
            </div>
          )}
        />

        {/* Other Social Media */}
        <Controller
          name="other"
          control={control}
          render={({ field }) => (
            <div className="col-span-12 flex flex-col gap-2">
              <Label htmlFor="other">Other Social Media</Label>
              <Input
                {...field}
                size="lg"
                placeholder="Enter other social media profiles (optional)"
              />
            </div>
          )}
        />
      </div>
    </motion.div>
  );
};

export default ContactInformationForm;
