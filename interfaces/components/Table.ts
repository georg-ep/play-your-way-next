import { ButtonProps } from "@nextui-org/react";

export interface TableAction {
  label: string;
  onClick: Function;
  color?: ButtonProps["color"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
}

export interface TableRowData {
  cells: (string | React.ReactNode)[];
}

export interface TableProps {
  headers: string[];
  rows: TableRowData[];
  onRowClick?: (rowIdx: number) => void;
}

