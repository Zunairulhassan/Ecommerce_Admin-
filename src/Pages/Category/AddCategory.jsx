import { useContext, useState } from 'react';
import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { MyContext } from '../../MyContext';
import { postData } from '../../utils/api';

const AddCategory = () => {
    const context = useContext(MyContext);
    const [formfield, setformfield] = useState({
        name:"",
        images:[],
    });
    const [previous, setPrevoius] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setformfield({ ...formfield, [name]: value });
    };

    const setPrevoiusFun = (previousArr) => {
        setPrevoius(previousArr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formfield.name.trim()) {
            context?.alertBox?.({ type: 'error', msg: 'Category name is required.' });
            return;
        }

        if (!previous.length) {
            context?.alertBox?.({ type: 'error', msg: 'Please upload at least one image.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                name: formfield.name,
                images: previous,
            };

            const res = await postData('/api/category/create', payload);
            setIsSubmitting(false);

            if (res?.success) {
                context?.alertBox?.({ type: 'success', msg: res.message || 'Category created successfully!' });
                setformfield({ name: '', images: [] });
                setPrevoius([]);
            } else {
                context?.alertBox?.({ type: 'error', msg: res?.message || 'Category creation failed.' });
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            context?.alertBox?.({ type: 'error', msg: 'Unable to create category. Please try again.' });
        }
    };

    return(
        <>
            <section className="p-5 bg-gray-50">
                <form onSubmit={handleSubmit} className="form p-8 py-3" >
                    <div className="scroll max-h-[70vh] overflow-y-scroll">
                        <div className="grid grid-cols-1 mb-3">
                        <div className="col w-[30%]">
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Category Name</h3>
                            <input type="text" name="name" value={formfield.name} className="w-full h-[40px] bg-[#fafafa] border-2 border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" 
                            onChange={onChangeInput}/>
                        </div>
                        </div>  
                        <br/>
                            <h3 className="mb-1 text-black text-[14px] font-[500]">Upload Image</h3>
                       
                       
                        <div className="grid grid-cols-7 gap-4">
                            {
                                previous?.length!==0 && previous.map((image, index)=>{
                                    return(
                                    <div className="uploadBoxWrapper relative" key={index}>
                                        <span className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 top-[-10px] right-[0px] flex items-center justify-center z-50 cursor-pointer"><IoMdClose className="text-white text-[20px]"/></span>
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative"  >
                                        <LazyLoadImage
                                            className='w-full h-full object-cover'
                                            effect="blur"
                                            alt={"images"}
                                            wrapperProps={{
                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                style: {transitionDelay: "1s"},
                                            }}
                                            src={image} // use normal <img> attributes as props
                                            />
                                        </div>
                                    </div>
                                    )
                                })
                            }   
                            <UploadBox multiple={true} name="images" url="api/category/upload" setPrevoiusFun={setPrevoiusFun}/>
                        </div>
                    </div>
                    <hr/>
                    <br/>
                    <div className="w-[250px]">
                        <Button type="submit" disabled={isSubmitting} className="btn-blue btn-lg w-full"><FaCloudUploadAlt className='text-[22px] mr-3'/>{isSubmitting ? 'Saving...' : 'Publish and View'}</Button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default AddCategory;