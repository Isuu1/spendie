import { Suspense } from "react";
//Components
import PanelWrapper from "@/features/dashboard/components/PanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";

export const revalidate = 60;

export default async function Page() {
  const { settings, error } = await getUserSettingsServer();

  const visiblePanels = settings?.visible_panels || [];

  if (error || !settings) {
    return (
      <>
        <h3>Account</h3>
        <ErrorMessage message="Failed to load your account settings from the server." />
      </>
    );
  }

  return (
    <>
      {panelsLibrary
        .filter((panel) => visiblePanels.includes(panel.name))
        .map((panel) => {
          const PanelComponent = panel.component;
          return (
            <PanelWrapper key={panel.name} name={panel.name}>
              <Suspense fallback={<DashboardPanelLoader />}>
                <PanelComponent />
              </Suspense>
            </PanelWrapper>
          );
        })}
      {visiblePanels.length === 0 && (
        <p>You have no panels visible. Go to settings to enable some.</p>
      )}
    </>
  );
}
