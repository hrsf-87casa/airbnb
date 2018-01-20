import React from 'react';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import Dropzone from 'react-dropzone';
import upload from 'superagent';

export default class PhotoUploadTab extends React.Component {
  constructor(props) {
    super(props);
  }
  onDrop(files) {
    upload
      .post('/api/user/profilepictureupload')
      .attach('profilePicture', files[0])
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        alert('File Uploaded!');
      });
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <br />
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="profilePicture" className="tabLabel">
                Upload a Profile Picture!
              </Label>
            </Col>
            <Col xs="9">
              <Dropzone onDrop={this.onDrop} multiple={false}>
                <div style={{ padding: '12px 12px 12px 12px' }}>
                  {' '}
                  Drop a file or select a file to upload{' '}
                </div>
              </Dropzone>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}
