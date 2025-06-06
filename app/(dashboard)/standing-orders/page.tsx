import { StandingOrder } from "@/shared/types/standing-order";
import { createClient } from "@/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <div>Error fetching standing orders</div>;
  }

  const userStandingOrders = await supabase
    .from("profiles")
    .select("standing_orders")
    .eq("id", data.user.id);

  if (userStandingOrders.error) {
    return <div>You did not set up any standing orders yet.</div>;
  }

  const { standing_orders: standingOrders } = userStandingOrders.data[0];

  return (
    <div>
      {standingOrders.map((order: StandingOrder) => (
        <div key={order.id}>
          <h3>{order.name}</h3>
          <p>{order.date}</p>
          {/* <p>Frequency: {order.frequency}</p> */}
          <p>{order.type}</p>
          {/* <p>Status: {order.status}</p> */}
          <p>{order.amount}</p>
        </div>
      ))}
    </div>
  );
}
