import { useEffect, useMemo, useRef, useState } from "react";

export interface InfinityPaginationArgs<T> {
  dataList: T[];
  elementsPerPage: number;
  observerOptions?: IntersectionObserverInit;
}

export const useInfinityPagination = <T>({
  dataList,
  elementsPerPage,
  observerOptions,
}: InfinityPaginationArgs<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const numberOfPages = Math.ceil(dataList.length / elementsPerPage);

  const pageData = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * elementsPerPage;
    return dataList.slice(startIndex, endIndex);
  }, [dataList, currentPage, elementsPerPage]);

  useEffect(() => {
    const detectObservableElement = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[entries.length - 1];
      if (entry.isIntersecting && currentPage < numberOfPages)
        setCurrentPage((prev) => prev + 1);
    };

    const observer = new IntersectionObserver(
      detectObservableElement,
      observerOptions
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [pageData]);

  return [containerRef, pageData] as const;
};
