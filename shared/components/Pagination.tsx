import React from "react";
//Styles
import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            className={`${styles.pageButton} ${page === pageNum ? styles.active : ""}`}
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
