import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { Authcontext, FirebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom';

const Create = () => {

  const { FireBase } = useContext(FirebaseContext)
  const { user } = useContext(Authcontext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date()
  const history = useHistory()

  const handleSubmit = () => {
    FireBase.storage().ref(`/image/${image}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        console.log(url)
        FireBase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createAt: date.toDateString()
        })
        history.push('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            defaultValue="John"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            defaultValue="John"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
