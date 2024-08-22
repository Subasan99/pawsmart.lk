import * as React from "react";
import { cn } from "@/lib/utils"; // Adjust import path as needed
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

interface Props {
  options: any[];
  selectedValues: any[];
  onChange: (values: any[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
}: Props) {
  const handleSelect = (value: string) => {
    const numericValue = value;

    if (selectedValues.includes(numericValue)) {
      onChange(selectedValues.filter((v: string) => v !== numericValue));
    } else {
      onChange([...selectedValues, numericValue]);
    }
  };

  console.log(selectedValues);

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        {selectedValues.length > 0
          ? selectedValues.join(", ")
          : placeholder || "Select options"}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          {options.map((option: any) => (
            <SelectItem key={option} value={option.toString()}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  className="mr-2"
                  readOnly
                />
                {option}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
