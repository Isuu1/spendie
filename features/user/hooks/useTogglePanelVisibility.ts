"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePanelVisibility } from "@/features/user/lib/actions/togglePanelVisibility";
import { toast } from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { UserSettings } from "../types/user";

interface TogglePanelArgs {
  panelId: string;
  visible: boolean;
}

export function useTogglePanelVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ panelId, visible }: TogglePanelArgs) => {
      const result = await togglePanelVisibility(panelId, visible);
      if (!result.success) throw new Error("Failed to update panel");
      return { panelId, visible };
    },

    // ✅ Optimistic update
    onMutate: async ({ panelId, visible }) => {
      await queryClient.cancelQueries({ queryKey: ["userSettings"] });

      const previousSettings = queryClient.getQueryData<UserSettings>([
        "userSettings",
      ]);

      queryClient.setQueryData(
        ["userSettings"],
        (old: UserSettings | undefined) => {
          if (!old) return old;

          const layout = old.dashboard_layout || [];

          const newLayout = layout.map((panel) => {
            if (panel.id === panelId) {
              return { ...panel, visible: visible! };
            }
            return panel;
          });
          return { ...old, dashboard_layout: newLayout };
        },
      );

      return { previousSettings };
    },

    // ❌ Rollback if failed
    onError: (_err, _vars, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(["userSettings"], context.previousSettings);
      }
      toast.error("Failed to update panels settings", toastStyle);
    },

    // 🔄 Revalidate in background after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
}
