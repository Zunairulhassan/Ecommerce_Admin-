import { useContext, useState } from 'react';
import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { MyContext } from '../../MyContext';
import { postData, deleteImages } from '../../utils/api';

const AddCategory = () => {
    const context = useContext(MyContext);

    const [formfield, setformfield] = useState({
        name: "",
        images: [],
    });

    const [previous, setPrevoius] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // input change
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setformfield(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // upload callback
    const setPrevoiusFun = (newImages) => {
        console.log('[AddCategory] New images received:', newImages);
        // Accumulate new images with existing ones
        const combinedImages = [...previous, ...newImages];
        console.log('[AddCategory] Combined images:', combinedImages);
        setPrevoius(combinedImages);

        setformfield(prev => ({
            ...prev,
            images: combinedImages
        }));
    };

    // delete image
    const removeImage = async (image, index) => {
        try {
            await deleteImages("/api/category/deleteImage", image);

            const updated = previous.filter((_, i) => i !== index);

            setPrevoius(updated);

            setformfield(prev => ({
                ...prev,
                images: updated
            }));

            context?.alertBox?.({
                type: "success",
                msg: "Image deleted successfully"
            });

        } catch (err) {
            console.error(err);

            context?.alertBox?.({
                type: "error",
                msg: "Failed to delete image"
            });
        }
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formfield.name.trim()) {
            return context?.alertBox?.({
                type: "error",
                msg: "Category name is required"
            });
        }

        if (!previous.length) {
            return context?.alertBox?.({
                type: "error",
                msg: "Upload at least one image"
            });
        }

        setIsSubmitting(true);

        try {
            const res = await postData("/api/category/create", {
                name: formfield.name,
                images: previous
            });
            console.log("UPLOAD RESPONSE:", res);
            setIsSubmitting(false);

            if (res?.success) {
                context?.alertBox?.({
                    type: "success",
                    msg: res.message
                });

                setformfield({ name: "", images: [] });
                setPrevoius([]);
            } else {
                context?.alertBox?.({
                    type: "error",
                    msg: res?.message || "Failed"
                });
            }

        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
        }
    };

    return (
        <section className="p-5 bg-gray-50">
            <form onSubmit={handleSubmit} className="form p-8 py-3">

                {/* NAME */}
                <div className="w-[30%] mb-3">
                    <h3 className="text-sm font-medium">Category Name</h3>

                    <input
                        type="text"
                        name="name"
                        value={formfield.name}
                        onChange={onChangeInput}
                        className="w-full h-[40px] border p-2"
                        autoComplete="off"
                    />
                </div>

                {/* IMAGES */}
                <h3 className="mb-2 font-medium">Upload Images ({previous.length})</h3>

                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>

                    {previous && previous.length > 0 && previous.map((image, index) => (
                        <div key={`image-${index}`} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">

                            <span
                                onClick={() => removeImage(image, index)}
                                className="absolute top-1 right-1 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 z-10 transition shadow-lg"
                                title="Delete image"
                            >
                                <IoMdClose size={16} />
                            </span>

                            <LazyLoadImage
                                src={image}
                                alt={`Category image ${index + 1}`}
                                className="w-full h-[120px] object-cover"
                                effect="blur"
                            />
                        </div>
                    ))}

                    <UploadBox
                        multiple
                        name="images"
                        url="/api/category/upload"
                        setPrevoiusFun={setPrevoiusFun}
                    />
                </div>

                {/* SUBMIT */}
                <div className="mt-5 w-[250px]">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white"
                    >
                        <FaCloudUploadAlt />
                        {isSubmitting ? "Saving..." : "Publish"}
                    </Button>
                </div>

            </form>
        </section>
    );
};

export default AddCategory;