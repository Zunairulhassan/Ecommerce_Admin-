import { useContext, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { MyContext } from '../../MyContext';
import { uploadData } from "../../utils/api";

const UploadBox = (props) => {
  const context = useContext(MyContext);
  const [uploading, setUploading] = useState(false);
  const [previous, setPrevoius] = useState([]);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const selectedFiles = Array.from(files);
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      const invalidFile = selectedFiles.find((file) => !allowedTypes.includes(file.type));

      if (invalidFile) {
        context?.alertBox?.({
          type: "error",
          msg: "Only jpg, png, jpeg, webp allowed",
        });
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append(props?.name || "images", file);
      });

      setUploading(true);
      setPrevoius([]);

      const res = await uploadData(apiEndPoint, formData);
      setUploading(false);

      const uploadedImages = res?.data?.images || [];
      if (!uploadedImages.length) {
        context?.alertBox?.({
          type: "error",
          msg: res?.data?.message || "Upload failed. No images returned.",
        });
        return;
      }

      props?.setPrevoiusFun?.(uploadedImages);
      setPrevoius(uploadedImages);
      context?.alertBox?.({
        type: "success",
        msg: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error("[UploadBox Error]:", error.response?.data || error.message);
      setUploading(false);
      context?.alertBox?.({
        type: "error",
        msg: error.response?.data?.message || error.response?.data?.error || "Image upload failed. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
        <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChangeFile(e, props?.url)}
          name={props?.name}
          multiple={props.multiple !== undefined ? props.multiple : false}
          className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
        />
      </div>
    </>
  );
};

export default UploadBox;
