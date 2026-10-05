import React from "react";
//Components
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Button from "@/shared/components/ui/Button";
import AddPaymentForm from "./AddPaymentForm";
//Icons
import { IdCard } from "lucide-react";
//Types
import { RecurringPaymentFormValues } from "../types/recurringPaymentForm";
import { useGroupedAccounts } from "@/features/accounts/hooks/useGroupedAccounts";

type AddPaymentDrawerProps = {
  defaultValues?: Partial<RecurringPaymentFormValues>;
  triggerName?: string;
};

const AddPaymentDrawer = ({
  defaultValues,
  triggerName,
}: AddPaymentDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const { data: institutions = [] } = useGroupedAccounts();

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          icon={<IdCard />}
          iconPosition="left"
          variant="secondary"
          className="bg-background"
        >
          {triggerName || "Add payment"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-sm:w-full! max-sm:rounded-none!">
        <DrawerHeader>
          <DrawerTitle>Add recurring payment</DrawerTitle>
          <DrawerDescription>
            Create a new recurring payment definition.
          </DrawerDescription>
        </DrawerHeader>
        <AddPaymentForm
          onCancel={onCancel}
          defaultValues={defaultValues}
          institutions={institutions}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default AddPaymentDrawer;
