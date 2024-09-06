import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../Firebaseconfig"; // Adjust the import path if necessary
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditArticle = () => {
  const { id } = useParams(); // Get the article ID from URL parameters
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Invalid article ID.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Articles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setImagePreview(data.posterImage || "");
          setDate(data.date);
          setAuthor(data.author);
          setContent(data.content);
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching article: ", err);
        setError("Error fetching article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
      let imageUrl = imagePreview;

      if (image && typeof image === "object") {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const docRef = doc(db, "Articles", id);
      await updateDoc(docRef, {
        title,
        posterImage: imageUrl,
        date,
        author,
        content,
      });

      alert("Article updated successfully!");
      navigate("/article-feed"); // Navigate to ArticleFeed page
    } catch (err) {
      console.error("Error updating article: ", err);
      alert("Failed to update article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="w-full h-screen overflow-auto p-10 space-y-10">
      <button onClick={() => navigate(-1)} className="button-outline">Back</button>
      <h3 className="text-3xl text-center">Edit Article</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-4">
        <div>
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
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditArticle;
