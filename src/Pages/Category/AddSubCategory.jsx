import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const AddSubCategory = () => {
    const [productCat, setProductCat] = useState('');
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };
    return(
        <>
            <section className="p-5 bg-gray-50">
                <form action="" className="form p-8 py-3" >
                    <div className="scroll max-h-[70vh]">
                        <div className="grid grid-cols-4 mb-3 gap-4">
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
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Sub Category Name</h3>
                            <input type="text" className="w-full h-[40px] bg-[#fafafa] border-2 border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
                        </div>
                        </div> 
                        <br/>
                        
                    </div>
                    <hr/>
                    <br/>
                    <div className="w-[250px]">
                        <Button type="submit" className="btn-blue btn-lg w-full"><FaCloudUploadAlt className='text-[22px] mr-3'/>Publish and View</Button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default AddSubCategory;