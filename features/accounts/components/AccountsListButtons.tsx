import React, { useCallback, useEffect, useState } from "react";
//Styles
import styles from "./AccountsListButtons.module.scss";
//Types
import { EmblaCarouselType } from "embla-carousel";
//Icons
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";

interface AccountsListButtonsProps {
  emblaApi: EmblaCarouselType | null;
}

const AccountsListButtons = ({ emblaApi }: AccountsListButtonsProps) => {
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
    <div className={styles.buttons}>
      <button
        className={`${styles.button} ${prevBtnDisabled ? styles.disabled : ""}`}
        onClick={scrollPrev}
      >
        <TbArrowBigLeftLinesFilled />
      </button>
      <button
        className={`${nextBtnDisabled ? styles.disabled : ""} ${styles.button}`}
        onClick={scrollNext}
      >
        <TbArrowBigRightLinesFilled />
      </button>
    </div>
  );
};

export default AccountsListButtons;
