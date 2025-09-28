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
import { tilesLibrary } from "@/features/dashboard/config/tilesLibrary";

export default async function Page() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  const { settings, error } = await getUserSettingsServer();

  const visibleTiles = settings?.visible_tiles;

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

      <PanelsControls />

      {tilesLibrary
        .filter((tile) => visibleTiles.includes(tile.name))
        .map((tile) => {
          const TileComponent = tile.component;
          return (
            <TileWrapper key={tile.name} name={tile.name}>
              <TileComponent />
            </TileWrapper>
          );
        })}
    </>
  );
}
