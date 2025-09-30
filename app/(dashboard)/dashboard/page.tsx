//Components
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import PanelsControls from "@/features/dashboard/components/PanelsControls";
//Icons
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
//Supabase
import { createClient } from "@/supabase/server";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";

export default async function Page() {
  const supabase = await createClient();

  //await new Promise(() => {}); // Simulate a delay for demonstration purposes

  const user = await supabase.auth.getUser();

  const { settings, error } = await getUserSettingsServer();

  const visiblePanels = settings?.visible_panels;

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
      <div style={{ display: "none" }}>
        {user?.data.user && <PlaidLink userId={user.data.user.id} />}
      </div>

      <PanelsControls settings={settings} />

      {panelsLibrary
        .filter((panel) => visiblePanels.includes(panel.name))
        .map((panel) => {
          const PanelComponent = panel.component;
          return (
            <TileWrapper key={panel.name} name={panel.name}>
              <PanelComponent />
            </TileWrapper>
          );
        })}
    </>
  );
}
