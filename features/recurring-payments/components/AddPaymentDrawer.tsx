import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Button from "@/shared/components/ui/Button";
import React from "react";
import AddPaymentForm from "./AddPaymentForm";
import { IdCard } from "lucide-react";

const AddPaymentDrawer = () => {
  const [open, setOpen] = React.useState(false);

  console.log("Drawer open:", open);

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button icon={<IdCard />} iconPosition="left" variant="secondary">
          Add payment
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-fit">
        <DrawerHeader>
          <DrawerTitle>Add recurring payment</DrawerTitle>
          <DrawerDescription>
            Create a new recurring payment definition.
          </DrawerDescription>
        </DrawerHeader>
        <AddPaymentForm onCancel={onCancel} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddPaymentDrawer;
