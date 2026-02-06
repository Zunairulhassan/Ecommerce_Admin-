import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { IoMdAdd } from "react-icons/io";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Process from '../../Components/ProgressBar/Progress'
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { VscExport } from "react-icons/vsc";
import { MyContext } from '../../MyContext';


const Products = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 150 },
    { id: 'category', label: 'CATEGORY', minWidth: 100 },
    { id: 'subcategory', label: 'SUB CATEGORY', minWidth: 150 },
    { id: 'price', label: 'PRICE', minWidth: 100 },
    { id: 'sales', label: 'SALES', minWidth: 130 },
    { id: 'action', label: 'ACTION', minWidth: 120 },
  ];

  // Dummy rows with price for filter
  const getTypeByIndex = (index) => {
    const types = ["success", "warning", "error"];
    return types[index % types.length];
  };
  const rows = [
    {
      id: 1,
      title: "Join our email subscription now to get updates on promotions and coupons.",
      category: "Clothes",
      subCategory: "Women",
      price: 58,
      oldPrice: 58,
      sales: 234,
      img: "https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp",
      link: "/products/fashion-103",
    },
    { id: 2, title: "Sample Product 2", category: "Books", subCategory: "Kids", price: 100, oldPrice: 120, sales: 120, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtlKH59974RIwxIptfvdE0lS0OyIka5A55aLueC_CqtBoLf2t_hRDVCHJ44Vq7xbuK5o&usqp=CAU", link: "#" },
    { id: 3, title: "Sample Product 3", category: "T-Shirt", subCategory: "Men", price: 40, oldPrice: 55, sales: 80, img: "https://api.spicezgold.com/download/file_1734526702391_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-2-202304131033.webp", link: "#" },
    { id: 4, title: "Sample Product 4", category: "Electronics", subCategory: "Camera", price: 75, oldPrice: 90, sales: 60, img: "https://api.spicezgold.com/download/file_1734528437173_conbre-multiplexr2-pro-upgraded-hd-smart-wifi-wireless-ip-cctv-security-camera-night-vision-2-way-audio-support-64-gb-micro-sd-card-slot-product-images-orvnkptvicq-p594015290-0-202304040248.webp", link: "#" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [priceFilter, setPriceFilter] = useState("");
  const context = useContext(MyContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter logic
  const filteredRows = rows.filter((row) => {
    if (!priceFilter) return true;
    return row.price >= Number(priceFilter);
  });

  return (
    <>
      <div className="flex flex-col p-5 card bg-white shadow-md pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-[700] text-[20px]">Products</h1>

          {/* Number filter input */}
          <div className="button ml-auto flex items-center justify-between gap-4">
            <Button className="!bg-green-500 !px-6 !py-2 !text-white">
              <VscExport className="text-white text-[25px] mr-1" /> EXPORT
            </Button>

            <Button className="btn-blue" onClick={() => context.setIsOpenFullScreen({
              open: true,
              model: 'Add Product'
            })}>
              <IoMdAdd className="text-white text-[20px]" /> Products
            </Button>
          </div>


        </div>
        <h4 className='text-[14px] mb-1'>Category By</h4>
        <input
          type="number"
          placeholder="Min Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border w-[20%] px-3 py-2 rounded-md border-gray-300"
        />
      </div>



      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products(" ")<span className='font-[400] text-[14px]'>(Material UI Table)</span>
          </h2>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell><Checkbox {...label} size='small' /></TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id} hover>
                    {/* Checkbox */}
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>

                    {/* Product Info */}
                    <TableCell>
                      <div className="flex items-center gap-4 w-[300px]">
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                          <Link to={row.link}>
                            <img src={row.img} alt="" className="w-full group-hover:scale-105 transition-all" />
                          </Link>
                        </div>
                        <div className="info w-[75%]">
                          <h3 className="font-[600] leading-4 text-[12px] hover:text-primary">
                            <Link to={row.link}>{row.title}</Link>
                          </h3>
                          <span>{row.category}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>{row.category}</TableCell>

                    {/* Subcategory */}
                    <TableCell>{row.subCategory}</TableCell>

                    {/* Price */}
                    <TableCell>
                      <div className="flex items-center gap-1 flex-col">
                        <span className="line-through text-gray-500 text-[15px] font-[500]">${row.oldPrice}</span>
                        <span className="text-primary text-[15px] font-[500]">${row.price}</span>
                      </div>
                    </TableCell>

                    {/* Sales */}
                    <TableCell>
                      <p className="text-[14px] w-[100px]">
                        <span className="font-[600]">{row.sales}</span> sale
                      </p>
                      <Process value={row.progress} type={getTypeByIndex(index)} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                          <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                          <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                          <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Products;
