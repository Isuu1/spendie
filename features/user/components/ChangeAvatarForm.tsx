import Image from "next/image";
import Button from "@/shared/components/ui/Button";
import { UserProfile } from "../types/user";
import { Trash2 } from "lucide-react";

interface ChangeAvatarFormProps {
  user: UserProfile;
}

const ChangeAvatarForm = ({ user }: ChangeAvatarFormProps) => {
  const avatarUrl = user?.avatar;

  return (
    <div className="relative mt-7 flex flex-col justify-between gap-4">
      <Image
        className="rounded-full"
        src={avatarUrl || "https://i.pravatar.cc/150?img=3"}
        alt=""
        width={150}
        height={150}
      />
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="bg-background">
          Edit photo
        </Button>
        <Button
          className="bg-background"
          variant="secondary"
          size="sm"
          icon={<Trash2 />}
        />
      </div>
    </div>
  );
};

export default ChangeAvatarForm;
