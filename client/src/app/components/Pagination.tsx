import React, { useState } from "react";
import Button from "./Button";
import { ButtonType } from "../enums/ButtonType.enum";

interface PaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
}

const Pagination = <T extends unknown>({
  data,
  itemsPerPage,
  renderItem,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page: number) => setCurrentPage(page);

  const containerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "16px",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  };

  return (
    <>
      {currentPageData.map(renderItem)}

      {totalPages > 1 && (
        <div style={containerStyle}>
          <Button
            text="Previous"
            type={ButtonType.SECONDARY}
            width="10vw"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          ></Button>
          <Button
            text="Next"
            type={ButtonType.SECONDARY}
            width="10vw"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          ></Button>
        </div>
      )}
    </>
  );
};

export default Pagination;
