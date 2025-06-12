import AddPaymentForm from "@/features/recurring-payments/components/AddPaymentForm";
import PageWrapper from "@/shared/components/PageWrapper";

export default function Page() {
  return (
    <PageWrapper>
      <h2>Add new recurring payment</h2>
      <AddPaymentForm />
    </PageWrapper>
  );
}
