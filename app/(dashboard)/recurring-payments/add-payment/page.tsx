import AddPaymentForm from "@/features/recurring-payments/components/AddPaymentForm";
import BackButton from "@/shared/components/BackButton";

export default function Page() {
  return (
    <div className="page">
      <BackButton />
      <h2>Add new recurring payment</h2>
      <AddPaymentForm />
    </div>
  );
}
