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
import EditPaymentForm from "./EditPaymentForm";
//Types
import { RecurringPayment } from "../types/recurringPayment";

type EditPaymentDrawerProps = {
  payment: RecurringPayment;
};

const EditPaymentDrawer = ({ payment }: EditPaymentDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="bg-card-foreground" size="sm">
          Edit payment
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-fit">
        <DrawerHeader>
          <DrawerTitle>Edit recurring payment</DrawerTitle>
          <DrawerDescription>
            Modify an existing recurring payment definition.
          </DrawerDescription>
        </DrawerHeader>
        <EditPaymentForm payment={payment} onCancel={onCancel} />
      </DrawerContent>
    </Drawer>
  );
};

export default EditPaymentDrawer;
