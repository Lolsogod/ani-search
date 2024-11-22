import { AnimeDataTable } from "@/types/anime";
import { VisibleColumns } from "../types";

export interface ColumnProps {
  item: AnimeDataTable;
}

export interface TableRowProps {
  item: AnimeDataTable;
  index: number;
  visibleColumns: VisibleColumns;
}

export interface MobileColumnsProps extends ColumnProps {
  visibleColumns: VisibleColumns;
}
