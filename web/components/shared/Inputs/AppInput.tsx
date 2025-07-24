import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  type?: "text" | "number" | "password" | "textarea";
  defaultInputValue?: PathValue<T, Path<T>>
  showLabel?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function AppInputField<T extends FieldValues>({ name, control, label, error, type = "text", defaultInputValue, showLabel = false }: InputProps<T>) {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block mb-1 font-medium sr-only">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultInputValue ?? undefined}
        render={({ field }) => (
          <>
            {showLabel && <label className="text-gray-400">{label}</label>}
            {type !== "textarea" &&
              <Input
                id={name}
                type={type}
                placeholder={label}
                {...field}
                value={field.value ?? ''}
                className={showLabel ? 'mt-2' : ''}
              />}

            {type === "textarea" &&
              <Textarea
                id={name}
                placeholder={label}
                {...field}
                value={field.value ?? ''}
              />
            }
          </>
        )}
      />

      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default AppInputField;
