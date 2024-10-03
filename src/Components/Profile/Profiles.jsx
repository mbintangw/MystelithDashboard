import React,  { useEffect, useState } from 'react'
import { auth,db } from '../../../Firebaseconfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";


const Profiles = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  
  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        // Jika data tidak ada di Firestore, gunakan data dari Firebase Authentication
        const userData = {
          email: user.email,
          photo: user.photoURL || 'defaultPhotoURL', // Gunakan placeholder jika tidak ada photo
        };
        setUserDetails(userData);

        // Simpan data pengguna ke Firestore jika belum ada
        await setDoc(docRef, userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate ("/login") 
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  return (
    <main className='flex justify-center items-center h-screen'>
      <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3 className='uppercase font-bold'>Welcome {userDetails.firstName} {userDetails.lastName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="button-fill" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </main>
  )
}

export default Profiles
