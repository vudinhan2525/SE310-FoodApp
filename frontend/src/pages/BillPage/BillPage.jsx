import { Button } from 'antd';
import { Link } from 'lucide-react';
import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import BillContent from './BillContent';
const bills = [
  { id: 1, status: 'Hoàn thành', paymentDate: '12/09/2024', address: '21 LeeSin di rung' },
  { id: 2, status: 'Đang giao hàng', paymentDate: '15/09/2024', address: '13 Garen lane' },
  { id: 3, status: 'Thất bại', paymentDate: '18/09/2024', address: '19 Lux avenue' },
];
const statuses  = [
  {id: 1, status: 'Hoàn thành'},
  {id: 2, status: 'Đang giao hàng'},
  {id: 3, status: 'Thất bại'},
  {id: 4, status: 'Đang xử lý'},
]

function BillPage() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleBillClick = (bill) => {
    setSelectedBill(bill.id === selectedBill?.id ? null : bill);
  };
  const handleStatusClick = (status) => {
    setSelectedStatus(status.status === selectedStatus ? null : status.status);
    setSelectedBill(null); // Clear selected bill when changing status
  };
    return (
        <div className="px-24 bg-gray-100 pb-24 mt-14">
          <h2 className="pt-6 text-xl mb-4">Lịch sử thanh toán</h2>
          <div className="status flex justify-between bg-white p-3 rounded-xl my-3">
            <div className="title">
              <p>Tình trạng đơn hàng</p>
            </div>
            <div className="status-controller flex gap-5">
            {statuses.map((sta) => (
              <Button
                key={sta.id}
                type={selectedStatus === sta.status ? 'primary' : 'default'}
                onClick={() => handleStatusClick(sta)}
              >
                {sta.status}
              </Button>
            ))}
            </div>
          </div>
          <div className="">
          {bills
            .filter((bill) => !selectedStatus || bill.status === selectedStatus)
            .map((bill) => (
              <div key={bill.id} className="rounded-lg mb-2">
                <div
                  className={`px-5 items-center rounded-xl flex justify-between p-4 cursor-pointer ${
                    selectedBill?.id === bill.id
                      ? 'bg-orange-200 hover:opacity-80'
                      : 'bg-white hover:shadow-lg'
                  }`}
                  onClick={() => handleBillClick(bill)}
                >
                  <p className="basis-1/4">Đơn hàng {bill.id}</p>
                  <p className="basis-1/4 text-center">{bill.status}</p>
                  <p className="basis-1/4 text-center">{bill.paymentDate}</p>
                  <p className="basis-1/4 text-end">{bill.address}</p>
                </div>
                {/* Show BillContent directly below the selected bill */}
                {selectedBill?.id === bill.id && <BillContent bill={selectedBill} />}
              </div>
            ))}
          </div>
        </div>
      );
}

export default BillPage