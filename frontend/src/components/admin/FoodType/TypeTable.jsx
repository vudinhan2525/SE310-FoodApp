import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {ArrowUpDown, Pencil, Trash} from "lucide-react"
  import { useState } from 'react';
  import { ChevronDown } from 'lucide-react';
export default function TypeTable(props){
    const data = useMemo(() => props.types, [props.types]);
    const [name, setName] = React.useState("")
    const [selected, setSelected] = useState("")

  const columns = useMemo(
    () => [
      {
        Header: ({ column }) => (
            <Button variant="ghost" {...column.getSortByToggleProps()}>
             Id
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        accessor: 'TypeId',
      },
      {
        Header: 'Name Type',
        accessor: 'NameType',
      },
      {
        Header: 'Parent Id',
        accessor: 'ParentId',
        Cell: ({ value }) => (value ? value : 'No'),
      },
      {
        Header: ({ column }) => (
            <Button variant="ghost" {...column.getSortByToggleProps()}>
             Food count
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        accessor: "Foods",
      },
     
      {
        id: "action",
        Cell: ({ row }) => 
          {
            

            return  (
              <div className='flex mr-[-8px]'>
                 <Dialog>
          <DialogTrigger asChild>
          <Button variant="ghost" className="p-2"><Pencil color='gray' size={20} /></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Food Type Id {row.original.TypeId}</DialogTitle>
              <DialogDescription>
                Make changes to your type here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div>
                    <label >
                        Name Type
                    </label>
                    <input
                        type="text"
                        defaultValue={row.original.NameType}
                       
                        onChange={(a) => setName(a.target.value)}
                        
                        className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className="mt-4">
                    <label className="mb-3 block text-black dark:text-white">
                        Parent
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <select
    
                           
                            defaultValue={row.original.ParentId}
                            onChange={(e) => {
                                setSelected(e.target.value);
                            }}
                            className={`disabled:bg-whiter relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `} >
                            <option value="-1" className="text-gray-600 font-bold dark:text-bodydark">
                                No parent
                            </option>
                            {data.map((type) => {
                                return (
                                    <option value={type.TypeId} className="text-body dark:text-bodydark">
                                        {type.NameType}
                                    </option>
                                )
                            })}
                        </select>
                        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <ChevronDown color="gray" />
                        </span>
                    </div>
                </div>
            </div>
            <DialogFooter>
            <Button className="bg-blue-500 hover:bg-blue-400 active:scale-95 active:shadow-md transition ease-in-out text-base pt-1
                text-center font-semibold text-white ">Save changes</Button>
    
            </DialogFooter>
          </DialogContent>
        </Dialog>
                
    <AlertDialog>
              <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="p-2"><Trash color='gray' size={20} /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          food and remove your data from our servers.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel >Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-400">Delete</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
              </div> 
            )
          }
         
      },
    ],
    []
  );

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

    return(
        <div className=" bg-white border shadow-md  pt-5 relative h-full w-full rounded-lg px-4">
            <div className='font-bold text-lg mb-4 '>Food type</div>
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
    )
}