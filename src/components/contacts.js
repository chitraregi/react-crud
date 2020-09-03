import React, { useState, useEffect } from "react";
import { Menu, Table, Icon, Button } from "semantic-ui-react";
import Contactform from "./contactform";
import firebaseDb from "../firebase";

const Contacts = () => {
  var [contObj, setcontObj] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setcontObj({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == "")
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div className="app">
        <Menu
          fluid
          vertical
          style={{
            backgroundSize: "460%",
            fontFamily: "Roboto Slab,serif",
            backgroundColor: "#07689f",
          }}
        >
          <Menu.Item
            className="header"
            style={{ color: "#ffc93c", fontSize: "2rem", textAlign: "center" }}
          >
            CONTACT REGISTER
          </Menu.Item>
        </Menu>
      </div>
      <div
        className="app"
        style={{ backgroundColor: "#a2d5f2", height: "100vh" }}
      >
        <div>
          <Contactform {...{ addOrEdit, currentId, contObj }} />
        </div>
        <div
          style={{
            width: "70%",
            margin: "0.5rem auto",
          }}
        >
          <Table inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Full Name</Table.HeaderCell>
                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(contObj).map((id) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{contObj[id].fullName}</Table.Cell>
                    <Table.Cell>{contObj[id].phoneNumber}</Table.Cell>
                    <Table.Cell>{contObj[id].email}</Table.Cell>
                    <Table.Cell>{contObj[id].address}</Table.Cell>
                    <Table.Cell>
                      <a
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <Button
                          size="mini"
                          inverted
                          color="brown"
                          style={{ margin: "7px", padding: "8px" }}
                        >
                          <Icon name="edit" />
                        </Button>
                      </a>
                      <a
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        <Button
                          size="mini"
                          inverted
                          color="red"
                          style={{ margin: "7px", padding: "8px" }}
                        >
                          <Icon name="trash" />
                        </Button>
                      </a>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
