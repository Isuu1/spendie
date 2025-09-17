import { useState } from "react";
import { z, ZodRawShape } from "zod";

// Generic type for schema-based errors
type SchemaErrors<T extends z.ZodTypeAny> = {
  [K in keyof z.infer<T>]: string[];
};

export function useForm<T extends z.ZodObject<ZodRawShape>>(
  schema: T,
  defaultValues: z.infer<T>
) {
  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState<SchemaErrors<T>>(() =>
    Object.keys(schema.shape).reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {} as SchemaErrors<T>
    )
  );

  const validate = (updated: z.infer<T>) => {
    const result = schema.safeParse(updated);
    console.log(result);

    if (!result.success) {
      const fieldErrors = Object.keys(schema.shape).reduce(
        (acc, key) => ({ ...acc, [key]: [] }),
        {} as SchemaErrors<T>
      );

      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof z.infer<T>;
        fieldErrors[field].push(err.message);
      });

      setErrors(fieldErrors);
    } else {
      // Clear all errors if valid
      setErrors(
        Object.keys(schema.shape).reduce(
          (acc, key) => ({ ...acc, [key]: [] }),
          {} as SchemaErrors<T>
        )
      );
    }
  };

  const handleChange = (id: keyof z.infer<T>, value: string) => {
    const updated = { ...formData, [id]: value };
    console.log("Form data in handle change:", updated);
    setFormData(updated);
    validate(updated);
  };

  const resetForm = () => {
    setFormData(defaultValues);
    setErrors(
      Object.keys(schema.shape).reduce(
        (acc, key) => ({ ...acc, [key]: [] }),
        {} as SchemaErrors<T>
      )
    );
  };

  return { formData, errors, handleChange, resetForm };
}
