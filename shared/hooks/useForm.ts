"use client";

import { useEffect, useState } from "react";
import { z, ZodRawShape } from "zod";

// Generic type for schema-based errors
type SchemaErrors<T extends z.ZodTypeAny> = {
  [K in keyof z.infer<T>]: string[];
};

export function useForm<T extends z.ZodTypeAny>(
  schema: T,
  defaultValues: z.infer<T>
) {
  console.log("Schema in useForm:", schema);
  console.log("Default values in useForm:", defaultValues);

  useEffect(() => {
    validate(formData); // validate immediately on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unwrap schema if it's a ZodEffects
  const objectSchema = (
    schema instanceof z.ZodEffects ? schema._def.schema : schema
  ) as z.ZodObject<ZodRawShape>;

  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState<SchemaErrors<T>>(
    Object.keys(objectSchema.shape).reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {} as SchemaErrors<T>
    )
  );

  console.log("Initial errors state:", errors);

  const validate = (updated: z.infer<T>) => {
    const result = schema.safeParse(updated);
    //const result = { success: true, data: updated }; // Temporarily disable validation
    console.log("Validation errors:", result);
    if (!result.success) {
      const fieldErrors = Object.keys(objectSchema.shape).reduce(
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
        Object.keys(objectSchema.shape).reduce(
          (acc, key) => ({ ...acc, [key]: [] }),
          {} as SchemaErrors<T>
        )
      );
    }
  };

  const handleChange = (id: keyof z.infer<T>, value: string | Date) => {
    const updated = { ...formData, [id]: value };
    setFormData(updated);
    validate(updated);
  };

  const resetForm = () => {
    setFormData(defaultValues);
    setErrors(
      Object.keys(objectSchema.shape).reduce(
        (acc, key) => ({ ...acc, [key]: [] }),
        {} as SchemaErrors<T>
      )
    );
  };

  return { formData, errors, handleChange, resetForm, setErrors };
}
