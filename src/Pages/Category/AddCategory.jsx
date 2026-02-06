import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from '@mui/material';
const AddCategory = () => {
    return(
        <>
            <section className="p-5 bg-gray-50">
                <form action="" className="form p-8 py-3" >
                    <div className="scroll max-h-[70vh] overflow-y-scroll">
                        <div className="grid grid-cols-1 mb-3">
                        <div className="col w-[30%]">
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Product Name</h3>
                            <input type="text" className="w-full h-[40px] bg-[#fafafa] border-2 border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" />
                        </div>
                        </div>  
                        <br/>
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Upload Image</h3>
                        
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
export default AddCategory;