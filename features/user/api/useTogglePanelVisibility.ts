"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePanelVisibility } from "@/features/user/actions/togglePanelVisibility";
import { toast } from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { UserSettings } from "../types/user";

interface TogglePanelArgs {
  panelName: string;
  isActive: boolean;
}

export function useTogglePanelVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ panelName, isActive }: TogglePanelArgs) => {
      const result = await togglePanelVisibility(panelName, isActive);
      if (!result.success) throw new Error("Failed to update panel");
      return { panelName, isActive };
    },

    // ✅ Optimistic update
    onMutate: async ({ panelName, isActive }) => {
      await queryClient.cancelQueries({ queryKey: ["userSettings"] });

      const previousSettings = queryClient.getQueryData<UserSettings>([
        "userSettings",
      ]);

      queryClient.setQueryData(
        ["userSettings"],
        (old: UserSettings | undefined) => {
          if (!old) return old;
          const visible = old.visible_panels ?? [];
          const newPanels = isActive
            ? visible.filter((p) => p !== panelName)
            : [...visible, panelName];
          return { ...old, visible_panels: newPanels };
        }
      );

      return { previousSettings };
    },

    // ❌ Rollback if failed
    onError: (_err, _vars, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(["userSettings"], context.previousSettings);
      }
      toast.error("Failed to update panel settings", toastStyle);
    },

    // 🔄 Revalidate in background after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
}
