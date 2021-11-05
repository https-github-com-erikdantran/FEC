import React, { useState } from 'react';

function UploadPhotos(props) {
  const [photos, setPhotos] = useState({photos: []})


  let handleAddImage = function(e) {
    var newArr = [...photos.photos]
    newArr.push(e.target.files[0])
    setPhotos({photos: newArr})
  }

  let deleteImg = function(e) {
    var newArr = [...photos.photos]
    newArr.splice(e.target.id, 1)
    setPhotos({photos: newArr})
  }

  let upload = function(e) {
    document.getElementById(e.target.name).click()
  }

  var style1 = { display: photos.photos.length > 0 ? 'inline-block' : 'none'}
  var style2 = { display: photos.photos.length > 1 ? 'inline-block' : 'none'}
  var style3 = { display: photos.photos.length > 2 ? 'inline-block' : 'none'}
  var style4 = { display: photos.photos.length > 3 ? 'inline-block' : 'none'}

  return (
    <div className='image-form'>
      {/* <label htmlFor='img0'>Select image: </label> */}
        <div>
          <input type='file' id='img0' name='0' accept='image/*' onChange={handleAddImage}></input><br/>
          <img  onClick={upload} name='img0' src={ photos.photos.length > 0 ? URL.createObjectURL(photos.photos[0]) : 'default-image.jpeg' }></img>
          { photos.photos.length > 0 ? <div id='0' onClick={deleteImg}>&times;</div> : null }
        </div>
        <div style={style1}>
          <input type='file' id='img1' name='1' accept='image/*' onChange={handleAddImage}></input><br/>
          <img onClick={upload} name='img1' src={ photos.photos.length > 1 ? URL.createObjectURL(photos.photos[1]) : 'default-image.jpeg' }></img>
          { photos.photos.length > 1 ? <div id='1' onClick={deleteImg}>&times;</div> : null }
        </div>
        <div style={style2}>
          <input type='file' id='img2' name='2' accept='image/*' onChange={handleAddImage}></input><br/>
          <img onClick={upload} name='img2' src={ photos.photos.length > 2 ? URL.createObjectURL(photos.photos[2]) : 'default-image.jpeg' }></img>
          { photos.photos.length > 2 ? <div id='2' onClick={deleteImg}>&times;</div> : null }
        </div>
        <div style={style3}>
          <input type='file' id='img3' name='3' accept='image/*' onChange={handleAddImage}></input><br/>
          <img onClick={upload} name='img3' src={ photos.photos.length > 3 ? URL.createObjectURL(photos.photos[3]) : 'default-image.jpeg' }></img>
          { photos.photos.length > 3 ? <div id='3' onClick={deleteImg}>&times;</div> : null }
        </div>
        <div style={style4}>
          <input type='file' id='img4' name='4' accept='image/*' onChange={handleAddImage}></input><br/>
          <img onClick={upload} name='img4' src={ photos.photos.length > 4 ? URL.createObjectURL(photos.photos[4]) : 'default-image.jpeg' }></img>
          { photos.photos.length > 4 ? <div id='4' onClick={deleteImg}>&times;</div> : null }
        </div>
    </div>
  )
}


export default UploadPhotos;