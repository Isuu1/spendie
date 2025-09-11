"use client";

import { Account } from "@/shared/types/account";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
//Styles
import styles from "./AccountsList.module.scss";
import { EmblaCarouselType } from "embla-carousel";
//Icons
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

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

  // const generateAccountBackground = (accountType: string) => {
  //   switch (accountType.toLowerCase()) {
  //     case "credit card":
  //       return "linear-gradient(135deg, rgba(20, 30, 48, 0.7) 0%, rgba(36, 59, 85, 0.7) 100%)";
  //     case "checking":
  //       return "linear-gradient(263deg,rgba(131, 58, 180, 0.42) 0%, rgba(171, 72, 97, 0.35) 54%, rgba(222, 93, 13, 0.41) 100%)";
  //     case "savings":
  //       return "linear-gradient(135deg, rgba(15, 32, 39, 0.7) 0%, rgba(44, 83, 100, 0.7) 100%)";
  //     case "investment":
  //       return "linear-gradient(135deg, rgba(255, 153, 102, 0.7) 0%, rgba(255, 94, 98, 0.7) 100%)";
  //     default:
  //       return "linear-gradient(135deg, rgba(67, 67, 67, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)";
  //   }
  // };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const generateAccountBackground = (accountType: string) => {
    switch (accountType.toLowerCase()) {
      case "credit card":
        return "#3875bb5d";
      case "checking":
        return "#835cb97e";
      case "savings":
        return "#0f20277c";
      case "investment":
        return "#ff996673";
      default:
        return "#4343437a";
    }
  };

  return (
    <div ref={emblaRef} className={styles.outerWrapper}>
      {/* <h4>Sort by</h4> */}
      <div className={styles.accounts}>
        {accounts.map((account) => (
          <div key={account.account_id} className={styles.accountWrapper}>
            <div
              className={`${styles.account}`}
              style={{ background: generateAccountBackground(account.subtype) }}
            >
              <div className={styles.details}>
                <h4>{account.official_name}</h4>
                <p className={styles.type}>{account.subtype}</p>
                <p>**** **** **** {account.mask}</p>
              </div>
              {/* <em className={styles.number}>****** {account.mask}</em> */}
              <p className={styles.balance}>
                <span>Current balance</span>
                <span>£{account.balances.current}</span>
              </p>
            </div>
            <div className={styles.shape}></div>
            {/* <div className={styles.bgcover}>
              <div className={styles.circle}></div>
            </div> */}
          </div>
        ))}
      </div>
      <div
        className={`${styles.buttons} ${prevBtnDisabled ? "" : styles.blurLeft} ${nextBtnDisabled ? "" : styles.blurRight}`}
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
