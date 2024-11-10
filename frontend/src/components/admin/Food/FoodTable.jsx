import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Pencil, ArrowUpDown, Check, ChevronsUpDown, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { foods, types } from './fetchingData';
import { Link } from "react-router-dom";

export default function FoodTable() {
  const [data, setData] = React.useState(foods)
  const [type, setType] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleInfo = (id) => {

  }
  const handleChooseCategory = (id) => {
    if (!id || id === "" || id === 'All') {
      setData(foods);
      return;
    } else {
      const filteredProducts = foods.filter((prd) =>
        String(prd.FoodType.TypeId) == id || String(prd.FoodType.ParentId) == id
      );
      setData(filteredProducts); // Cập nhật danh sách với sản phẩm đã lọc
    }
  }
  const columns = useMemo(
    () => [
      {
        Header: "Food ID",
        accessor: "FoodId",
        cell: ({ row }) => {
          return(
            <div className="flex justify-center items-center text-center">
              {row.getValue("FoodId")}
            </div>
          )
        }
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Type",
        accessor: "FoodType.NameType",
      },

      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Item Left
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "ItemLeft",
      },
      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "Rating",
      },
      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            NoR
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "NumberRating",
      },
      {
        id: "action",
        Cell: ({ row }) => (
          <Link to={`/admin/food/detail`} 
          state={{food:row.original,types:types}}>
            <div className="flex justify-center items-center mr-4 p-0">

              <Info 
                className="h-[22px] w-[22px] text-gray-700 cursor-pointer hover:text-gray-500 active:scale-95 active:shadow-lg transition duration-150 ease-in-out " />
            </div>
          </Link>

        ),
      },
    ],
    []
  );

  // Thêm usePagination vào cấu hình
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Dùng page thay cho rows để chỉ hiển thị dữ liệu của trang hiện tại
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  return (
    <div className=''>
      <div className='flex mb-4 pl-2'>
        <Link to="add">
        <Button className="bg-blue-500 hover:bg-blue-400 active:scale-95 ease-in-out transition font-semibold text-white">Add Food</Button>
        </Link>
      <div className='ml-auto mr-4'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[180px] justify-between"
            >
              {type
                ? types.find((item) => String(item.TypeId) === type)?.NameType
                : "All"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {types.map((item) => (
                    <CommandItem
                      key={item.TypeId}
                      value={String(item.TypeId)}
                      onSelect={(currentValue) => {
                        if (currentValue === type) {
                          handleChooseCategory("All")
                        }
                        else {
                          handleChooseCategory(currentValue)
                        }
                        setType(currentValue === type ? "" : currentValue)
                        setOpen(false)


                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          type === String(item.TypeId) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.NameType} {item.ParentId ? ("(" + types.find((a) => a.TypeId == item.ParentId)?.NameType + ")") : ('')}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      </div>

     
      <div className=" bg-white border h-[500px]  pt-2 relative rounded-lg shadow-lg">
        <Table   {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow className='pr-6' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead
                    className="items-center text-center justify-center"
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow  {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell
                      className="items-center text-center justify-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Phần phân trang */}
        <div className="flex items-center  space-x-2 py-4 justify-center absolute  left-1/2 transform -translate-x-1/2 bottom-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()} disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <span>
            {pageIndex + 1} / {pageOptions.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()} disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>




    </div>
  );
}