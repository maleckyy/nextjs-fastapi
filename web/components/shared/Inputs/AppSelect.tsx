import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";


type SelectOptions = {
  name: string,
  value: number | string
}

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  selectOptions: SelectOptions[];
  label: string;
  error?: string;
}

function AppSelect<T extends FieldValues>({ name, control, label, error, selectOptions }: InputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium sr-only">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((option) => {
                return <SelectItem key={option.value} value={option.value as string}>{option.name}</SelectItem>
              })}
            </SelectContent>
          </Select>
        )}
      />

      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default AppSelect;
