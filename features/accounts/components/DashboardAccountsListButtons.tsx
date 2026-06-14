import { useCallback, useEffect, useState } from "react";
//Types
import { EmblaCarouselType } from "embla-carousel";
//Icons
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import Button from "@/shared/components/ui/Button";

type DashboardAccountsListButtonsProps = {
  emblaApi: EmblaCarouselType | null;
};

const DashboardAccountsListButtons = ({
  emblaApi,
}: DashboardAccountsListButtonsProps) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex items-center gap-3 justify-between">
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "bg-background rounded-2xl",
          prevBtnDisabled
            ? "opacity-50 cursor-not-allowed hover:bg-background"
            : "",
        )}
        onClick={scrollPrev}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "bg-background rounded-2xl",
          nextBtnDisabled
            ? "opacity-50 cursor-not-allowed hover:bg-background"
            : "",
        )}
        onClick={scrollNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default DashboardAccountsListButtons;
