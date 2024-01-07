/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { JWT, PINATA_URL } from "../utils/constants";

// const initialState = {
//     IpfsHash: "",
//     PinSize: 0,
//     Timestamp: Date.now(),
// };

const FileUpload = ({ account, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await axios.post(PINATA_URL, formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${JWT}`,
                    },
                });
                await contract.addImageURL(res.data.IpfsHash);
                console.log(res.data);
                console.log("File Uploaded");
                setFileName("");
                setFile("");
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError("No file Selected");
        }
    };

    const handleChange = (e) => {
        setError("");
        setFile(e.target.files[0]);

        // const fileReader = new FileReader();
        // fileReader.readAsArrayBuffer(e.target.files[0]);
        // fileReader.onloadend = (el) => {
        // };

    };

    return (
        <section>
            <h1>File Upload Section</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input disabled={!account} type="file" onChange={handleChange} />
                </label>
                <h2>{fileName}</h2>
                <h2 className="text-red-500">{error}</h2>
                <button
                    className="block m-4 bg-emerald-300 text-emerald-800 px-6 py-2 "
                    type="submit">
                    Upload
                </button>
            </form>
        </section>
    );
};

export default FileUpload;
