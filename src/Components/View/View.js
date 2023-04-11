import React, { useEffect, useState, useContext } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
// import { FirebaseContext } from '../../store/Context';
import { FireBase } from '../../firebase/config';
function View() {

  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  // const {FireBase} = useContext(FirebaseContext)

  useEffect(() => {
    const { userId } = postDetails
    FireBase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createAt.slice(0, 15)}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
