import React from 'react';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

export default class ResetPasswordTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form>
        <br />
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="oldPassword" className="tabLabel">
                {' '}
                Old Password{' '}
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter old password here."
              />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="newPassword" className="tabLabel">
                New Password
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password here"
              />
            </Col>
          </Row>
        </FormGroup>
        <button className="todo">Reset</button>
      </Form>
    );
  }
}
