import { Button } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Bedge from "../../Components/Bedge/Bedge";
import { IoIosSearch } from "react-icons/io";

// Example data (replace with your API data)
const rows = [
  {
    orderId: "PAY98765",
    product: "Wheelchair",
    name: "John Doe",
    phone: "+123456789",
    address: "123 Main St, NY",
    pincode: "10001",
    amount: 250,
    email: "john@example.com",
    userId: "USR123",
    status: "pending",
    date: "2025-08-05",
    products: [
      {
        productId: "123458808089",
        title: "Pink Ethnic Kurta Set",
        image:
          "https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp",
        qty: 1,
        price: 1300,
      },
    ],
  },
  // Add more orders if needed
];

const Order = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [isOpenOrderProducts, setIsOpenOrderProducts] = useState(null);

  const isShowOrderProducts = (index) => {
    setIsOpenOrderProducts(isOpenOrderProducts === index ? null : index);
  };

  const filteredRows = rows.filter((row) => {
    if (!priceFilter) return true;
    return row.amount >= Number(priceFilter);
  });

  return (
    <div className="card my-3 shadow-md sm:rounded-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg w-[25%] bg-gray-100 px-1">
          <IoIosSearch className="absolute cursor-pointer text-[20px] text-[rgba(0,0,0,0.2)] hover:text-[rgba(0,0,0,0.3)]" />
          <input
            type="text"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            placeholder="Filter by price"
            className="px-7 w-full py-2 px-1 bg-transparent outline-none text-[14px] text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4 relative pb-5">
        <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-900 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">&nbsp;</th>
              <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
              <th className="px-6 py-3 whitespace-nowrap">Product</th>
              <th className="px-6 py-3 whitespace-nowrap">Name</th>
              <th className="px-6 py-3 whitespace-nowrap">Phone</th>
              <th className="px-6 py-3 whitespace-nowrap">Address</th>
              <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
              <th className="px-6 py-3 whitespace-nowrap">Amount</th>
              <th className="px-6 py-3 whitespace-nowrap">Email</th>
              <th className="px-6 py-3 whitespace-nowrap">User Id</th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, index) => (
              <>
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">
                    <Button
                      className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]"
                      onClick={() => isShowOrderProducts(index)}
                    >
                      {isOpenOrderProducts === index ? (
                        <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] rotate-180" />
                      ) : (
                        <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      )}
                    </Button>
                  </td>
                  <td className="px-6 py-4 text-primary font-[500]">{row.orderId}</td>
                  <td className="px-6 py-4">{row.product}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.phone}</td>
                  <td className="px-6 py-4">{row.address}</td>
                  <td className="px-6 py-4">{row.pincode}</td>
                  <td className="px-6 py-4">${row.amount}</td>
                  <td className="px-6 py-4">{row.email}</td>
                  <td className="px-6 py-4 text-primary font-[500]">{row.userId}</td>
                  <td className="px-6 py-4">
                    <Bedge status={row.status} />
                  </td>
                  <td className="px-6 py-4">{row.date}</td>
                </tr>

                {/* Expandable Product Rows */}
                {isOpenOrderProducts === index && (
                  <tr>
                    <td colSpan="12" className="pl-24">
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full min-w-[600px] text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                              <th className="px-6 py-3">Product Id</th>
                              <th className="px-6 py-3">Title</th>
                              <th className="px-6 py-3">Image</th>
                              <th className="px-6 py-3">Qty</th>
                              <th className="px-6 py-3">Price</th>
                              <th className="px-6 py-3">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.products.map((p, i) => (
                              <tr key={i} className="bg-white border-b">
                                <td className="px-6 py-4">{p.productId}</td>
                                <td className="px-6 py-4">{p.title}</td>
                                <td className="px-6 py-4">
                                  <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-[40px] h-[40px] rounded-md object-cover"
                                  />
                                </td>
                                <td className="px-6 py-4">{p.qty}</td>
                                <td className="px-6 py-4">{p.price}</td>
                                <td className="px-6 py-4">{p.price * p.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
