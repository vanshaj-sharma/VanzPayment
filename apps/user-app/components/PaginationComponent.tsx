"use client";

import { Button } from "@repo/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex gap-2">
      <Button
        // className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `${pathname}/?page=${Number(page) - 1}&per_page=${per_page}`
          );
        }}
      >
        Prev Page
      </Button>

      <div>
        {page}/{Math.ceil(10 / Number(per_page))}
      </div>

      <Button
        disabled={!hasNextPage}
        // className="bg-blue-500 text-white p-1"
        onClick={() => {
          router.push(
            `${pathname}/?page=${Number(page) + 1}&per_page=${per_page}`
          );
        }}
      >
        Next Page
      </Button>
    </div>
  );
};

export default PaginationControls;
