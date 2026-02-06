import { Button } from '@mui/material';
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
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { VscExport } from "react-icons/vsc";
import { MyContext } from '../../MyContext';

import Checkbox from '@mui/material/Checkbox';
const HomeSliderBanner = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 150 },
    { id: 'action', label: 'ACTION', minWidth: 800 },
  ];

  // Dummy rows with price for filter
  const getTypeByIndex = (index) => {
    const types = ["success", "warning", "error"];
    return types[index % types.length];
  };
  const rows = [
    {
      id: 1,
      img: "https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg",
    },
    {
      id: 2,
      img: "https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg",
    },
    {
      id: 3,
      img: "https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg",
    },
    {
      id: 4,
      img: "https://em-cdn.eatmubarak.pk/55554/web_splash/1725863168.png",
    },
    {
      id: 5,
      img: "https://em-cdn.eatmubarak.pk/55554/web_splash/1725860918.png",
    },
    {
      id: 6,
      img: "https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg",
    },

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
          <h1 className="font-[700] text-[20px]">Home Slider Banners</h1>

          {/* Number filter input */}
          <div className="button ml-auto flex items-center justify-between gap-4">
            <Button className="!bg-green-500 !px-6 !py-2 !text-white">
              <VscExport className="text-white text-[25px] mr-1" /> EXPORT
            </Button>

            <Button className="btn-blue" onClick={() => context.setIsOpenFullScreen({
              open: true,
              model: 'Add Home Slide'
            })}>
              <IoMdAdd className="text-white text-[20px]" /> Products
            </Button>
          </div>


        </div>
      </div>



      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Banner Slider(" ")<span className='font-[400] text-[14px]'>(Material UI Table)</span>
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
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>

                    {/* Product Info */}

                    <TableCell>
                      <div className="flex items-center gap-4 w-[300px]">
                        <div className="img w-[100rem] h-[70px] rounded-md overflow-hidden group">
                          <Link to={row.link}>
                            <img src={row.img} alt="" className="w-full h-full group-hover:scale-105 transition-all" />
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

export default HomeSliderBanner;
