import AddPaymentForm from "@/features/recurring-payments/components/AddPaymentForm";
import BackButton from "@/shared/components/BackButton";

export default function Page() {
  return (
    <>
      <BackButton />
      <h3>Add new recurring payment</h3>
      <AddPaymentForm />
    </>
  );
}
