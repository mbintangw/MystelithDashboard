import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../../../Firebaseconfig"; // Adjust the import path if necessary
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let posterImage = "";

      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        posterImage = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "Articles"), {
        title,
        posterImage,
        date,
        author,
        content,
      });

      alert("Article added successfully!");
      navigate("/article-feed"); // Navigate to ArticleFeed page
    } catch (error) {
      console.error("Error adding article: ", error);
      alert("Failed to add article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen overflow-auto p-10 space-y-10">
      <button onClick={() => navigate(-1)} className="button-outline">Back</button>
      <h3 className="text-3xl text-center">Add Article</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-4">
  
        <div className="">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label>Poster Image</label>
          <input
            type="file"
            name="image"
            required
            onChange={handleImageChange}
            className=" border border-gray-300 p-2 rounded-md"
          />
            {imagePreview && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
              <button
                type="button"
                onClick={handleCancelImage}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="w-44">
          <label>Date</label>
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className=" border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label>Content</label>
          <EditorToolbar toolbarId={'t2'} />
          <ReactQuill
            theme="snow"
            placeholder="Write something awesome..."
            modules={modules('t2')}
            formats={formats}
            value={content}
            onChange={setContent}
          />
        </div>
        
        <div className="flex justify-center items-center">
          <button type="submit" disabled={loading} className="button-fill">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

    </main>
  );
};

export default AddArticle;
