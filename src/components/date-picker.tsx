"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function DatePicker({
  value,
  onChange,
}: {
  value: Date | string | undefined;
  onChange: (date: Date) => void;
}) {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="m-0 w-full text-left !p-4 justify-between"
          id={id}
          variant={"outline"}
          size="lg"
        >
          <span className={cn("truncate", !date && "text-muted-foreground")}>
            {date ? format(date, "PPP") : "Pick a date"}
          </span>
          <CalendarIcon
            aria-hidden="true"
            className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
            size={16}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <Calendar
          mode="single"
          onSelect={(date) => {
            setDate(date);
            if (date) {
              onChange(date);
            }
          }}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
