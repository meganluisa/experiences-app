import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      photo: ''
    }
  }

  onFileChange(e) {
    console.log(e.target.files[0].name);
    this.setState({photo: e.target.files[0]})
  }

  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', this.state.photo)
    axios.post("http://localhost:3000/photos", formData, {}).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="container">
                <div className="row">
                    <form action="/photos" method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
                        <h3>Photo Upload</h3>
                        <div className="form-group">
                            <input type="file" id="photo" name="photo" accept=".jpg, .jpeg, .png" onChange={this.onFileChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    )
  }
}