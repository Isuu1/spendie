"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
//Styles
import styles from "./AccountsList.module.scss";
import { EmblaCarouselType } from "embla-carousel";
//Icons
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
//Utils
import { generateAccountBackground } from "../utils/generateAccountBackground";
//Types
import { Account } from "@/shared/types/account";

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
    <div ref={emblaRef} className={styles.emblaContainer}>
      <div className={styles.accounts}>
        {accounts.map((account) => (
          <div
            key={account.account_id}
            className={`${styles.account}`}
            style={{ background: generateAccountBackground(account.subtype) }}
          >
            <div className={styles.details}>
              <h4>{account.official_name}</h4>
              <p className={styles.type}>{account.subtype}</p>
              <p>**** **** **** {account.mask}</p>
            </div>
            <p className={styles.balance}>
              <span>Current balance</span>
              <span>£{account.balances.current}</span>
            </p>
            <div className={styles.shape}></div>
          </div>
        ))}
      </div>
      <div
        className={`${styles.buttons} 
    ${!prevBtnDisabled ? `${styles.blur} ${styles.left}` : ""} 
    ${!nextBtnDisabled ? `${styles.blur} ${styles.right}` : ""}`}
      >
        <button
          className={`${prevBtnDisabled ? styles.disabled : ""} ${styles.button}`}
          onClick={scrollPrev}
        >
          <FaArrowLeft />
        </button>
        <button
          className={`${nextBtnDisabled ? styles.disabled : ""} ${styles.button}`}
          onClick={scrollNext}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AccountsList;
