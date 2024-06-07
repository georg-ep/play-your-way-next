"use client";
import React from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { TableProps } from "@/interfaces/components/Table";

export default function Table({ headers, rows, onRowClick }: TableProps) {
  return (
    <NextUITable isCompact width={"100%"} color={"success"} aria-label="table">
      <TableHeader>
        {headers &&
          headers.map((header, index) => (
            <TableColumn key={`header_${index}`}>
              <div className="text-white">{header}</div>
            </TableColumn>
          ))}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {rows &&
          rows.map((row, rowIdx) => (
            <TableRow
              className="cursor-pointer hover:outline hover:outline-1 hover:outline-gray-700 box-border transition-all"
              onClick={() => onRowClick && onRowClick(rowIdx)}
              key={`row_${rowIdx}`}
            >
              {row.cells &&
                row.cells.map((cell, cellIdx) => (
                  <TableCell key={`cell_${cellIdx}`}>
                    {typeof cell === "symbol" ? cell : cell}
                  </TableCell>
                ))}
            </TableRow>
          ))}
      </TableBody>
    </NextUITable>
  );
}
