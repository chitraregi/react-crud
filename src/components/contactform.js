import React, { useState, useEffect } from "react";
import { Form, Grid, Segment, Button } from "semantic-ui-react";

const Contactform = (props) => {
  const intialValues = {
    fullName: " ",
    phoneNumber: "",
    email: "",
    address: "",
  };

  var [values, setValues] = useState(intialValues);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...intialValues,
      });
    else
      setValues({
        ...props.contObj[props.currentId],
      });
  }, [props.currentId, props.contObj]);

  const handleChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{
          backgroundSize: "100% 100%",
        }}
        verticalAlign="middle"
        className="contactform"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form autoComplete="off" size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="fullName"
                icon="user"
                iconPosition="left"
                type="text"
                placeholder="name"
                value={values.fullName}
                onChange={handleChange}
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  name="phoneNumber"
                  icon="phone"
                  iconPosition="left"
                  placeholder="PhoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />

                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Input
                fluid
                name="address"
                icon="home"
                iconPosition="left"
                placeholder="Address"
                type="address"
                value={values.address}
                onChange={handleChange}
              />

              <Button
                inverted
                color="violet"
                fluid
                size="medium"
                content={props.currentId == "" ? "Save" : "Update"}
              ></Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Contactform;
