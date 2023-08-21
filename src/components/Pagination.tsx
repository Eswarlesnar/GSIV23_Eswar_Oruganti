import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

interface MoviesPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}

const MoviesPagination: FC<MoviesPaginationProps> = ({
  page,
  onPageChange,
  pageCount,
}) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack sx={{ marginTop: "30px", marginBottom :"40px" ,display: "grid", justifyContent: "center" , width : "100%" }}>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default MoviesPagination;
