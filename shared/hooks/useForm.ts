"use client";

import { useState } from "react";
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

  //Validate a single field on change
  const validateField = (
    id: keyof z.infer<T>,
    value: string | number | Date
  ) => {
    const fieldSchema = objectSchema.shape[id as string];
    const result = fieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [id]: result.success ? [] : result.error.issues.map((e) => e.message),
    }));
  };

  //Validate the entire form
  const validateForm = (updated: z.infer<T>) => {
    const result = schema.safeParse(updated);

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
      return false;
    } else {
      // Clear all errors if valid
      setErrors(
        Object.keys(objectSchema.shape).reduce(
          (acc, key) => ({ ...acc, [key]: [] }),
          {} as SchemaErrors<T>
        )
      );
      return true;
    }
  };

  const handleChange = (
    id: keyof z.infer<T>,
    value: string | number | Date
  ) => {
    const updated = { ...formData, [id]: value };
    setFormData(updated);
    validateField(id, value);
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

  return {
    formData,
    errors,
    handleChange,
    resetForm,
    setErrors,
    validateForm,
    validateField,
  };
}
