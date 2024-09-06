import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebaseconfig"; // Adjust the import path if necessary

const DetailArticle = () => {
  const { id } = useParams(); // Get the article ID from URL parameters
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "Articles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching article: ", err); // Log the error to console
        setError("Error fetching article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {article ? (
        <div className="container flex flex-col justify-center items-center">
          <h1>{article.title}</h1>
          {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
          <p><strong>Date:</strong> {article.date}</p>
          <p><strong>Author:</strong> {article.author}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          
        </div>
      ) : (
        <p>No article found</p>
      )}
    </div>
  );
};

export default DetailArticle;
