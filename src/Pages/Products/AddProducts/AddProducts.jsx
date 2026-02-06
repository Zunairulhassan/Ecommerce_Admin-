import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
const AddProducts = () =>{
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
     const [productFeature, setProductFeature] = useState('');
     const [productCatRAM, setProductCatRAM] = useState('');
     const [productCatWeight, setProductCatWeight] = useState('');
    const [productSize, setProductSize] = useState('');

     
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
    const handleChangeProductFeature = (event) => {
    setProductFeature(event.target.value);
  };
   const handleChangeProductRAM = (event) => {
    setProductCatRAM(event.target.value);
  };
   const handleChangeProductWeight = (event) => {
    setProductCatWeight(event.target.value);
  };
   const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

    return(
        <>
            <section className="p-5 bg-gray-50">
                <form action="" className="form p-8 py-3" >
                <div className="scroll max-h-[70vh] overflow-y-scroll">
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Product Name</h3>
                            <input type="text" className="w-full h-[40px] bg-[#fafafa] border-2 border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className=" text-balck mb-1 text-[14px] font-[500]">Product Description</h3>
                            <textarea type="text" className="w-full h-[140px] bg-[#fafafa] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-3 gap-5">
                        <div className="col">
                            <h3 className="mb-1 text-[14px] font-[500]">Product Category</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productCat}
                              label="Category"
                              onChange={handleChangeProductCat}
                            >
                              <MenuItem value={''}>None</MenuItem>
                              <MenuItem value={10}>Feshion</MenuItem>
                              <MenuItem value={20}>Beauity</MenuItem>
                              <MenuItem value={30}>Wellness</MenuItem>
                              <MenuItem value={40}>Electronic</MenuItem>
                              <MenuItem value={50}>Bags</MenuItem>
                            
                            </Select>

                        </div>
                        <div className="col">
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Product Sub Category</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productSubCat}
                              label="Category"
                              onChange={handleChangeProductSubCat}
                            >
                              <MenuItem value={''}>None</MenuItem>
                              <MenuItem value={10}>Men</MenuItem>
                              <MenuItem value={20}>Women</MenuItem>
                              <MenuItem value={30}>Kids</MenuItem>                            
                            </Select>

                        </div>
                        <div className="col">
                            <h3 className=" text-black mb-1 text-[14px] font-[500]">Product Price</h3>
                            <input type="number" className="w-full h-[40px] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm [appearence:textField] [&::-webkit-outer-spin-button] :appearence-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="col">
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Old Price</h3>
                            <input type="number" className="w-full h-[40px] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm [appearence:textField] [&::-webkit-outer-spin-button] :appearence-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-3 gap-5">
                        <div className="col">
                            <h3 className="mb-1 text-[14px] font-[500]">Is Featured</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productFeature}
                              label="Category"
                              onChange={handleChangeProductFeature}
                            >
                              <MenuItem value={10}>True</MenuItem>
                              <MenuItem value={20}>False</MenuItem>
                            </Select>

                        </div>
                        <div className="col">
                            <h3 className=" text-black mb-1 text-[14px] font-[500]">Product Stock</h3>
                            <input type="number" className="w-full h-[40px] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm [appearence:textField] [&::-webkit-outer-spin-button] :appearence-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="col">
                            <h3 className=" text-black mb-1 text-[14px] font-[500]">BRAND</h3>
                            <input type="text" className="w-full h-[40px] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm [appearence:textField] [&::-webkit-outer-spin-button] :appearence-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="col">
                            <h3 className=" text-black mb-1 text-[14px] font-[500]">DISCOUNT</h3>
                            <input type="number" className="w-full h-[40px] border-2  border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm [appearence:textField] [&::-webkit-outer-spin-button] :appearence-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-3 gap-4">
                        <div className="col">
                            <h3 className="mb-1 text-[14px] font-[500]">Product Category</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productCatRAM}
                              label="Category"
                              onChange={handleChangeProductRAM}
                            >
                              <MenuItem value={'2GB'}>2GB</MenuItem>
                              <MenuItem value={'4GB'}>4GB</MenuItem>
                              <MenuItem value={'6GB'}>8GB</MenuItem>
                            
                            </Select>

                        </div>
                        <div className="col">
                            <h3 className="mb-1 text-[14px] font-[500]">Product Weight</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productCatWeight}
                              label="Category"
                              onChange={handleChangeProductWeight}
                            >
                              <MenuItem value={''}>None</MenuItem>
                              <MenuItem value={'2GB'}>2KG</MenuItem>
                              <MenuItem value={'4GB'}>4Kg</MenuItem>
                              <MenuItem value={'6GB'}>5Kg</MenuItem>
                            
                            </Select>

                        </div>
                        <div className="col">
                            <h3 className="mb-1 text-[14px] font-[500]">Product Size</h3>
                            <Select
                              labelId="demo-simple-select-label"
                              id="ProductCatDrop"
                              className='w-full'
                              size='small'
                              value={productSize}
                              label="Category"
                              onChange={handleChangeProductSize}
                            >
                              <MenuItem value={''}>None</MenuItem>
                              <MenuItem value={'S'}>S</MenuItem>
                              <MenuItem value={'M'}>M</MenuItem>
                              <MenuItem value={'L'}>L</MenuItem>
                              <MenuItem value={'XL'}>XL</MenuItem>
                            
                            </Select>
                        </div>
                        <div className="col">
                            <h3 className="mb-3 text-black text-[14px] font-[500]">Rating</h3>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            
                        </div>
                    </div>

                    <div className="col w-full p-5 px-0">
                        <h3 className="font-[700] text-[18px] mb-4">Media Images</h3>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="uploadBoxWrapper relative">
                                <span className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 top-[-10px] right-[0px] flex items-center justify-center z-50 cursor-pointer"><IoMdClose className="text-white text-[20px]"/></span>
                                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                 <LazyLoadImage
                                    className='w-full h-full object-cover'
                                    effect="blur"
                                    alt={"images"}
                                    wrapperProps={{
                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                        style: {transitionDelay: "1s"},
                                    }}
                                    src={"https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"} // use normal <img> attributes as props
                                     />
                            </div>
                            </div>
                            
                            <UploadBox multiple={true}/>
                        </div>
                    </div>
                    
                </div>
                <hr/>
                <br/>

                    <Button type="submit" className="btn-blue btn-lg w-full"><FaCloudUploadAlt className='text-[22px] mr-3'/>Publish and View</Button>
                </form>
            </section>
        </>
    )
}
export default AddProducts;