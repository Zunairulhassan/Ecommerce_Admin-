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

import { IoIosSearch } from "react-icons/io";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
const Users = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const columns = [
    { id: 'user img', label: 'USER IMAGE', minWidth: 100 },
    { id: 'UserName', label: 'USER NAME', minWidth: 180 },
    { id: 'UserEmail', label: 'USAR EMAIL', minWidth: 180 },
    { id: 'PhoneNo', label: 'Phone Number', minWidth: 180 },
    { id: 'date', label: 'CREATED', minWidth: 200 },
  ];

  // Dummy rows with price for filter
  const getTypeByIndex = (index) => {
    const types = ["success", "warning", "error"];
    return types[index % types.length];
  };
  const rows = [
    {
      id: 1,
      userName: "Faiza Jaweed",
      Email: "faize1123@gmail.com",
      PhoneNumber: "+92 324 5987126",
      img: "https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp",
      link: "/products/fashion-103",
      date: "12-7-2025"
    },
    { id: 2, date: "04-6-2025", userName: "Talha Jaweed", Email: "talha345@gmail.com", PhoneNumber: "+92 325 4876945", img: "data:image/jpeg;base64,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", link: "#" },
    { id: 3, date: "28-5-2025", userName: "Abdurahman Khan", Email: "AbdurahmanKhan345786@gmail.com", PhoneNumber: "+92 358 4769123", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQln3CMvx6DX8ab9YXhmNbg7vfm7e2f9A44ZT_R3Aeu4852dU08Q3A2sA1LX6S6kiAWBx4&usqp=CAU", link: "#" },
    { id: 4, date: "03-5-2025", userName: "Aysha Majeed", Email: "ayshaQueen2gmail.com", PhoneNumber: "+92 312 5478965", img: "data:image/jpeg;base64,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", link: "#" },
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
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 relative">
          <h2 className="text-[18px] font-[600]">
            User List
          </h2>
          <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg w-[25%] bg-gray-100 px-1">
            <IoIosSearch className='abfsolute cursor-pointer text-[20px] text-[rgba(0,0,0,0.2)] hover:text-[rgba(0,0,0,0.3)]' />
            <input
              type="text"
              placeholder='Enter the Text'
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full py-2 px-1 bg-transparent outline-none text-[12px] text-gray-800 placeholder-gray-500"
            />

          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440, }}>
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
                      <div className="flex items-center gap-4 w-[150px]">
                        <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                          <Link to={row.link}>
                            <img src={row.img} alt="" className="w-full group-hover:scale-105 transition-all" />
                          </Link>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>{row.userName}</TableCell>

                    {/* Subcategory */}

                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <MdOutlineMarkEmailRead className='text-[18px]' />{row.Email}
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <div className="flex items-center justify-start gap-1">
                        <MdOutlinePhoneInTalk className='text-[18px]' /><span className="text-primary text-[15px] font-[500]">{row.PhoneNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>{row.date}</TableCell>

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

export default Users;
