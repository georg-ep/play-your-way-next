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
  styling?: string;
}

export interface TableHeader {
  label: string;
  width?: string;
}

export interface TableProps {
  headers: string[] | TableHeader[];
  rows: TableRowData[];
  onRowClick?: (rowIdx: number) => void;
}

