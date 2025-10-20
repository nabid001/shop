"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SetQueryDataProps = {
  linkUrl: string;
  stateName: string;
  stateValue: string;
  linkName: string;
};

export const SetQueryData = ({
  linkUrl,
  stateName,
  stateValue,
  linkName,
}: SetQueryDataProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`${linkUrl}?${stateName}=${stateValue}`);
  };

  return (
    <Button
      variant="secondary"
      className="bg-white/90 text-black hover:bg-white transition-colors w-fit"
      onClick={handleClick}
    >
      {linkName}
    </Button>
  );
};
