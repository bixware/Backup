/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from "react-helmet";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';
// api
import api from 'Api';
// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
// add new user form
import AddNewUserForm from './AddNewUserForm';
// update user form
import UpdateUserForm from './UpdateUserForm';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

export default function UserProfile(props){
   const deleteConfirmationDialog = useRef();
   const [users, setUsers] = useState(null);
   const [selectedUser, setSelectedUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [addNewUserModal, setAddNewUserModal] = useState(false);
   const [addNewUserDetail, setAddNewUserDetail] = useState({
      id: '',
      name: '',
      avatar: '',
      type: '',
      emailAddress: '',
      status: 'Active',
      lastSeen: '',
      accountType: '',
      badgeClass: 'badge-success',
      dateCreated: 'Just Now',
      checked: false
   });
   const [openViewUserDialog, setOpenViewUserDialog] = useState(false);
   const [editUser, setEditUser] = useState(null);
   const [selectedUsers, setSelectedUsers] = useState(0);
   
   useEffect(() => {
      api.get('userManagement.js')
         .then((response) => {
            setUsers(response.data)
         })
         .catch(error => {
            // error hanlding
         })
   },[])
	
	/**
	 * On Delete
	 */
	const onDelete = (data) => {
      deleteConfirmationDialog.current.open();
      setSelectedUser(data);
	}

	/**
	 * Delete User Permanently
	 */
	const deleteUserPermanently = () => {
		let allUsers = users;
      let indexOfDeleteUser = allUsers.indexOf(selectedUser);
      allUsers.splice(indexOfDeleteUser, 1);
      deleteConfirmationDialog.current.close();
      setLoading(true);
		setTimeout(() => {
         setLoading(false);
         setUsers(allUsers);
         setSelectedUser(null);
			NotificationManager.success('User Deleted!');
		}, 2000);
	}

	/**
	 * Open Add New User Modal
	 */
	const opnAddNewUserModal = (e) => {
      e.preventDefault();
      setAddNewUserModal(true);
	}

	/**
	 * On Reload
	 */
	const onReload = (e) => {
      e.preventDefault();
      setLoading(true);
		setTimeout(() => {
         setLoading(false);
		}, 2000);
	}

	/**
	 * On Select User
	 */
	const onSelectUser = (user) => {
		user.checked = !user.checked;
		let selectedUsers = 0;
		let allUsers = users.map(userData => {
			if (userData.checked) {
				selectedUsers++;
			}
			if (userData.id === user.id) {
				if (userData.checked) {
					selectedUsers++;
				}
				return user;
			} else {
				return userData;
			}
      });
      setUsers(allUsers);
      setSelectedUser(selectedUsers);
	}

	/**
	 * On Change Add New User Details
	 */
	const onChangeAddNewUserDetails = (key, value) => {
      setAddNewUserDetail({
         ...addNewUserDetail,
         [key]: value
      })
	}

	/**
	 * Add New User
	 */
	const addNewUser = () => {
		const { name, emailAddress } = addNewUserDetail;
		if (name !== '' && emailAddress !== '') {
			let allUsers = users;
			let newUser = {
				...addNewUserDetail,
				id: new Date().getTime()
			}
         allUsers.push(newUser);
         setAddNewUserModal(false);
         setLoading(true);

			setTimeout(() => {
            setLoading(false);
            setUsers(allUsers);
				NotificationManager.success('User Created!');
			}, 2000);
		}
	}

	/**
	 * View User Detail Hanlder
	 */
	const viewUserDetail = (data) => {
      setOpenViewUserDialog(true);
      setSelectedUser(data);
	}

	/**
	 * On Edit User
	 */
	const onEditUser = (user) => {
      setAddNewUserModal(true);
      setEditUser(user);
	}

	/**
	 * On Add & Update User Modal Close
	 */
	const onAddUpdateUserModalClose = () => {
      setAddNewUserModal(false);
      setEditUser(null);
	}

	/**
	 * On Update User Details
	 */
	const onUpdateUserDetails = (key, value) => {
      setEditUser({
         ...editUser,
         [key]: value
      })
	}

	/**
	 * Update User
	 */
	const updateUser = () => {
		let indexOfUpdateUser = '';
		let allUsers = users;
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (user.id === editUser.id) {
				indexOfUpdateUser = i
			}
		}
      allUsers[indexOfUpdateUser] = editUser;
      setLoading(true);
      setEditUser(null);
      setAddNewUserModal(false);
		setTimeout(() => {
         setUsers(allUsers);
         setLoading(false);
			NotificationManager.success('User Updated!');
		}, 2000);
	}

	//Select All user
	const onSelectAllUser = (e) => {
		let selectAll = selectedUsers < users.length;
		if (selectAll) {
			let selectAllUsers = users.map(user => {
				user.checked = true
				return user
         });
         setUsers(selectAllUsers);
         setSelectedUsers(selectAllUsers.length);
		} else {
			let unselectedUsers = users.map(user => {
				user.checked = false
				return user;
         });
         setSelectedUsers(0);
         setUsers(unselectedUsers);
		}
	}
   return (
      <div className="user-management">
         <Helmet>
            <title>Reactify | Users Management</title>
            <meta name="description" content="Reactify Widgets" />
         </Helmet>
         <PageTitleBar
            title={<IntlMessages id="sidebar.userManagement" />}
            match={props.match}
         />
         <RctCollapsibleCard fullBlock>
            <div className="table-responsive">
               <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                  <div>
                     <a href="!#" onClick={(e) => onReload(e)} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                     <a href="!#" onClick={e => e.preventDefault()} className="btn-outline-default mr-10">More</a>
                  </div>
                  <div>
                     <a href="!#" onClick={e => e.preventDefault()} className="btn-sm btn-outline-default mr-10">Export to Excel</a>
                     <a href="!#" onClick={(e) => opnAddNewUserModal(e)} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
                  </div>
               </div>
               <table className="table table-middle table-hover mb-0">
                  <thead>
                     <tr>
                        <th className="w-5">
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    indeterminate={selectedUsers > 0 && selectedUsers < users.length}
                                    checked={selectedUsers > 0}
                                    onChange={(e) => onSelectAllUser(e)}
                                    value="all"
                                    color="primary"
                                 />
                              }
                              label="All"
                           />
                        </th>
                        <th>User</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th>Plans Type</th>
                        <th>Date Created</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users && users.map((user, key) => (
                        <tr key={key}>
                           <td>
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       checked={user.checked}
                                       onChange={() => onSelectUser(user)}
                                       color="primary"
                                    />
                                 }
                              />
                           </td>
                           <td>
                              <div className="media">
                                 {user.avatar !== '' ?
                                    <img src={user.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                                    : <Avatar className="mr-15">{user.name.charAt(0)}</Avatar>
                                 }
                                 <div className="media-body">
                                    <h5 className="mb-5 fw-bold">{user.name}</h5>
                                    <Badge color="warning">{user.type}</Badge>
                                 </div>
                              </div>
                           </td>
                           <td>{user.emailAddress}</td>
                           <td className="d-flex justify-content-start">
                              <span className={`badge badge-xs ${user.badgeClass} mr-10 mt-10 position-relative`}>&nbsp;</span>
                              <div className="status">
                                 <span className="d-block">{user.status}</span>
                                 <span className="small">{user.lastSeen}</span>
                              </div>
                           </td>
                           <td><span className={`badge ${user.badgeClass} badge-pill`}>{user.accountType}</span></td>
                           <td>{user.dateCreated}</td>
                           <td className="list-action">
                              <button type="button" className="rct-link-btn" onClick={() => viewUserDetail(user)}><i className="ti-eye"></i></button>
                              <button type="button" className="rct-link-btn" onClick={() => onEditUser(user)}><i className="ti-pencil"></i></button>
                              <button type="button" className="rct-link-btn" onClick={() => onDelete(user)}><i className="ti-close"></i></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
                  <tfoot className="border-top">
                     <tr>
                        <td colSpan="100%">
                           <Pagination className="mb-0 py-10 px-10">
                              <PaginationItem>
                                 <PaginationLink previous href="!#" onClick={e => e.preventDefault()} />
                              </PaginationItem>
                              <PaginationItem active>
                                 <PaginationLink href="!#" onClick={e => e.preventDefault()}>1</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                 <PaginationLink href="!#" onClick={e => e.preventDefault()}>2</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                 <PaginationLink href="!#" onClick={e => e.preventDefault()}>3</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                 <PaginationLink next href="!#" onClick={e => e.preventDefault()} />
                              </PaginationItem>
                           </Pagination>
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </div>
            {loading &&
               <RctSectionLoader />
            }
         </RctCollapsibleCard>
         <DeleteConfirmationDialog
            ref={deleteConfirmationDialog}
            title="Are You Sure Want To Delete?"
            message="This will delete user permanently."
            onConfirm={() => deleteUserPermanently()}
         />
         <Modal isOpen={addNewUserModal} toggle={() => onAddUpdateUserModalClose()}>
            <ModalHeader toggle={() => onAddUpdateUserModalClose()}>
               {editUser === null ?
                  'Add New User' : 'Update User'
               }
            </ModalHeader>
            <ModalBody>
               {editUser === null ?
                  <AddNewUserForm
                     addNewUserDetails={addNewUserDetail}
                     onChangeAddNewUserDetails={onChangeAddNewUserDetails}
                  />
                  : <UpdateUserForm user={editUser} onUpdateUserDetail={onUpdateUserDetails} />
               }
            </ModalBody>
            <ModalFooter>
               {editUser === null ?
                  <Button variant="contained" className="text-white btn-success" onClick={() => addNewUser()}>Add</Button>
                  : <Button variant="contained" color="primary" className="text-white" onClick={() => updateUser()}>Update</Button>
               }
               {' '}
               <Button variant="contained" className="text-white btn-danger" onClick={() => onAddUpdateUserModalClose()}>Cancel</Button>
            </ModalFooter>
         </Modal>
         <Dialog
            onClose={() => setOpenViewUserDialog(false)}
            open={openViewUserDialog}
         >
            <DialogContent>
               {selectedUser !== null &&
                  <div>
                     <div className="clearfix d-flex">
                        <div className="media pull-left">
                           <img src={selectedUser.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                           <div className="media-body">
                              <p>Name: <span className="fw-bold">{selectedUser.name}</span></p>
                              <p>Email: <span className="fw-bold">{selectedUser.emailAddress}</span></p>
                              <p>Type: <span className="badge badge-warning">{selectedUser.type}</span></p>
                              <p>Account Type: <span className={`badge ${selectedUser.badgeClass} badge-pill`}>{selectedUser.accountType}</span></p>
                              <p>Status: {selectedUser.status}</p>
                              <p>Last Seen: {selectedUser.lastSeen}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               }
            </DialogContent>
         </Dialog>
      </div>
   );
}
