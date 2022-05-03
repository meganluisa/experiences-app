import React, {useState} from 'react';
import axios from 'axios';

export default function FilesUploadComponent () {
 const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  
  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
  }

  const onSubmit = (e) => {
    const formData = new FormData()
    formData.append('photo', selectedFile)
    axios.post("http://localhost:3000/photos", formData, {}).then(res => {
      console.log(res)
    })
  }


    return (
      <div>
                <div>
                    <form action="/photos" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
                        <h3>Photo Upload</h3>
                        <div className="form-group">                           
                            <input type="file" id="photo" name="photo" accept=".jpg, .jpeg, .png" onChange={onFileChange}/><br></br>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    )

}