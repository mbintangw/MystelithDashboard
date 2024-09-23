import React, { useState, useEffect } from 'react';
import { db, storage } from '../../Firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const ArticleFeeds = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "Articles"));
      const articlesData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setArticles(articlesData);
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id, posterImage) => {
    try {
      // Create a reference to the file to delete
      const imageRef = ref(storage, posterImage);
  
      // Delete the file
      await deleteObject(imageRef);
  
      // Delete the document from Firestore
      await deleteDoc(doc(db, "Articles", id));
  
      // Update the state to remove the deleted article
      setArticles(articles.filter(article => article.id !== id));
    } catch (e) {
      console.error("Error deleting document or image: ", e);
    }
  };

  return (
    <main className="flex flex-col gap-20 h-screen overflow-auto p-10">
  <div className="flex flex-col gap-4 items-center">
    <h1 className="text-3xl font-bold">Article Feed</h1>
    <Link
      to="/add"
      className="bg-Button text-white px-4 py-2 rounded-full text-center"
    >
      Add Article
    </Link>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {articles.map((article) => (
      <div
        key={article.id}
        className="bg-white rounded-lg shadow-xl shadow-black/50 overflow-hidden flex flex-col "
      >
        <div className="relative">
          <img
            src={article.posterImage}
            alt={article.title}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2 text-white ">
            <Link
              to={`/edit/${article.id}`}
              className="bg-black/50 backdrop-blur-2xl p-2 rounded-full shadow-md hover:scale-110"
            >
              <FaRegEdit />
            </Link>
            <button
              onClick={() => handleDelete(article.id, article.posterImage)}
              className="bg-black/50 backdrop-blur-2xl p-2 rounded-full shadow-md hover:scale-110"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col space-y-2">
          <p className="text-Paragraph text-sm mt-2 flex-grow">
            Written by <span className="font-medium">{article.author}</span> on{" "}
            <span className="">{article.date}</span>
          </p>
          <h1 className="text-lg font-semibold text-Highlight uppercase">{article.title}</h1>
          <div className="text-Paragraph text-sm mt-2 line-clamp-2">
                {stripHtml(article.content)}
          </div>
        </div>

        <Link
            to={`/detail/${article.id}`}
            className="mt-4 inline-block bg-Tertiary text-white px-4 py-2 rounded-tl-full self-end"
          >
            Read more
          </Link>
      </div>
    ))}
  </div>
</main>

  );
};

export default ArticleFeeds;