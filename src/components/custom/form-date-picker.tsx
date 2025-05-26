"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormDatePickerProps {
  id?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholder?: string;
}

const FormDatePicker: FC<FormDatePickerProps> = ({
  id,
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <DatePicker
      id={id}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      selected={value}
      onChange={onChange}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      placeholderText={placeholder || "Select date"}
    />
  );
};

export default FormDatePicker;
