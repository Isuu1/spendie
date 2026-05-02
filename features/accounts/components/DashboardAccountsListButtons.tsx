import { useCallback, useEffect, useState } from "react";
//Types
import { EmblaCarouselType } from "embla-carousel";
//Icons
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

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
      <button
        //className={`${styles.button} ${prevBtnDisabled ? styles.disabled : ""}`}
        className={cn(
          "cursor-pointer relative border-0",
          prevBtnDisabled ? "opacity-50 cursor-not-allowed" : "",
        )}
        onClick={scrollPrev}
      >
        {/* <TbArrowBigLeftLinesFilled /> */}
        <ChevronLeft />
      </button>
      <button
        //className={`${nextBtnDisabled ? styles.disabled : ""} ${styles.button}`}
        className={cn(
          "cursor-pointer relative border-0",
          nextBtnDisabled ? "opacity-50 cursor-not-allowed" : "",
        )}
        onClick={scrollNext}
      >
        {/* <TbArrowBigRightLinesFilled /> */}
        <ChevronRight />
      </button>
    </div>
  );
};

export default DashboardAccountsListButtons;
