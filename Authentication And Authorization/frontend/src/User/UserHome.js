import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import UserNavbar from './UserNavbar'
import Headertoken from '../helper/useheaders';
import { ScaleLoader} from "react-spinners";
import { Navigate } from "react-router-dom";


function UserHome() {
  const headers = Headertoken();
  const [alluser, setAllUser] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true); 
  

  const [editForm, setEditForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
  });

  // GET ALL USER START HERE 
  async function getalluser(page, status) {
    try {
      setTimeout(async () => {
        const res = await axios.get(`http://localhost:4500/getalluser?page=${page}&status=${status}`, headers);
        setAllUser(res.data.getalluser);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setIsLoading(false); 
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getalluser(currentPage, filterStatus);
  }, [currentPage, filterStatus],);

  //  UPDATE STATUS FOR USER 
  const toggleUserStatus = async (_id, isActive) => {
    try {
      const res = await axios.patch(`http://localhost:4500/updatestatus/${_id}`, { isActive }, headers);
      setAllUser((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === _id) {
            return { ...user, isActive };
          }
          return user;
        })
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // UPDATE STATUS OF USER END HERE 

  // UPDATE USER START HERE 
  const editUser = (user) => {
    setEditUserData(user);
    setEditForm({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:4500/updateuser/${editUserData._id}`, editForm, headers);
      if (res.status === 200) {
        toast.success(res.data.msg);
        setShowEditModal(false);
        getalluser(currentPage, filterStatus);
      }
      else {
        toast.error(res.data.msg)
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      console.error(error);
    }
  };
  // UPDATE USER END HERE  

  // DELETE START

  const handleDelete = async (userId, userStatus) => {
    try {
      const res = await axios.delete(`http://localhost:4500/deleteuser/${userId}`, headers);
      if (res.data.success) {
        getalluser(currentPage, userStatus);
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error('Internal error');
    }
  };

  // DELETE END 


  return (
    <>
      <UserNavbar />
      <div className="user-table">
        {isLoading ? ( 
           <div className="loading-spinner">Process....
           <ScaleLoader color={"#ffffff"} loading={isLoading}  />
         </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>👤First Name</th>
                <th>🧔 Last Name</th>
                <th>✉️Email</th>
                <th>📞 Phone Number</th>
                <th>
                  <label>🔵 Status :</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All">All User</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {alluser.length > 0 ? 
                alluser.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.Email}</td>
                      <td>{user.PhoneNumber}</td>
                      <td>
                        <select
                          value={user.isActive ? 'Active' : 'Inactive'}
                          onChange={(e) => {
                            const isActive = e.target.value === 'Active';
                            toggleUserStatus(user._id, isActive);
                          }}
                          className={user.isActive ? 'active' : 'inactive'}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td>
                        <Button variant="warning" onClick={() => editUser(user)}><FontAwesomeIcon icon={faEdit} /></Button>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(user._id, user.isActive)}><FontAwesomeIcon icon={faTrash} /></Button>
                      </td>
                    </tr>
                  );
                }): <p>No user Found Please Signup</p>}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit User Modal */}

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                value={editForm.FirstName}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                value={editForm.LastName}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editForm.Email}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="PhoneNumber"
                value={editForm.PhoneNumber}
                onChange={handleEditFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {/* pagination end */}
    </>
  );
}

export default UserHome;
