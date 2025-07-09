// components/atoms/Input.tsx
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  type?: string;
  defaultInputValue?: PathValue<T, Path<T>>
  showLabel?: boolean
}

function AppInputField<T extends FieldValues>({ name, control, label, error, type = "text", defaultInputValue, showLabel= false }: InputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium sr-only">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultInputValue ?? undefined}
        render={({ field }) => (
          <>
          { showLabel && <label className="text-gray-400">{label}</label>}
          <Input
            id={name}
            type={type}
            placeholder={label}
            {...field}
            value={field.value ?? ''}
            />
          </>
        )}
      />

      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default AppInputField;
