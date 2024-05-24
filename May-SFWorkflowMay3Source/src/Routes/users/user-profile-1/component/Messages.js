/**
 * Messages Page
 */
import React, { useEffect, useState } from 'react';
import { Button, IconButton, FormControlLabel, Checkbox, Avatar, Dialog, DialogContent} from '@material-ui/core';
import classnames from 'classnames';
import { NotificationManager } from 'react-notifications';
import {
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Input,
   InputGroup,
   InputGroupAddon,
   FormGroup,
   Label
} from 'reactstrap';

// api
import api from 'Api';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

export default function Messages(props){
   const [all, setAll] = useState(false);
   const [reloading, setReloading] = useState(false);
   const [messages, setMessages] = useState(null);
   const [allMessages, setAllMessages] = useState(false);
   const [newMessageModal, setNewMessageModal] = useState(false);
   const [viewMessageDialog, setViewMessageDialog] = useState(false);
   const [selectedMessage, setSelectedMessage] = useState(null);
   const [addNewMessageDetail, setAddNewMessageDetail] = useState({
      id: null,
      userName: '',
      userAvatar: '',
      message: '',
      starred: false,
      select: false
   })
   useEffect(() => {
      getUserMessages();
   },[])
 
   // get user messages
   const getUserMessages = () => {
      api.get('userMessages.js')
         .then((response) => {
            setMessages(response.data);
            setAllMessages(response.data);
         })
         .catch(error => {
            // error handling
         })
   }

   const handleChange = (name, checked) => {
      name(checked);
   };

   /**
    * On Reload Messages
    */
   const onReloadMessages = () => {
      setReloading(true);
      setTimeout(() => {
         setReloading(false);
      }, 1500);
   }

   /**
    * Get Search Results
    */
   const getSearchResults = (e) => {
      const searchMessages = allMessages.filter((message) =>
         message.message.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
      setMessages(searchMessages)
   }

   /**
    * Mark Message As Star
    */
   const markMessageAsStar = (index) => {
      let messages = allMessages;
      messages[index].starred = !messages[index].starred;
      setMessages(messages);
      setAllMessages(messages);
   }

   /**
    * On Select Message
    */
   const onSelectMessage = (index) => {
      let messages = allMessages;
      messages[index].select = !messages[index].select;
      setMessages(messages);
      setAllMessages(messages);
   }

   /**
    * Open Write New Message Modal
    */
   const openWriteNewMessageModal = () => {
      setNewMessageModal(true);
   }

   /**
    * Toggle Write New Message Modal
    */
   const toggleWriteNewMessageModal = () => {
      setNewMessageModal(!newMessageModal);
   }

   /**
    * Add New Message
    */
   const addNewMessage = () => {
      let messages = allMessages;
      const { userName, message } = addNewMessageDetail
      if (userName !== '' && message !== '') {
         let data = {
            ...addNewMessageDetail,
            id: new Date().getTime()
         }
         messages.push(data);
         setReloading(true);
         setNewMessageModal(false);
         
         setTimeout(() => {
            setMessages(messages);
            setAllMessages(messages);
            setReloading(false);
         }, 1500);
      }
   }

   /**
    * On Reply Message
    */
   const onReplyMessage = (index) => {
      let messages = allMessages;
      messages[index].replyBox = !messages[index].replyBox;
      setMessages(messages);
      setAllMessages(messages)
   }

   /**
    * Send Reply
    */
   const sendReply = (index) => {
      let messages = allMessages;
      messages[index].replyBox = false;
      setMessages(messages);
      setAllMessages(messages)
      setReloading(true);
      setTimeout(() => {
         setReloading(true);
         NotificationManager.success('Reply Sent Successfully!');
      }, 1500);
   }

   /**
    * Hanlde Close View Message
    */
   const handleCloseViewMessage = () => {
      setViewMessageDialog(false);
   }

   /**
    * View Message Hanlder
    */
   const viewMessage = (message) => {
      setViewMessageDialog(true);
      setSelectedMessage(message);
   }

   return (
      <div className="messages-wrapper">
         <div className="row mb-30">
            <div className="col-sm-5 col-md-4 col-lg-3">
               <Button onClick={() => openWriteNewMessageModal()} variant="contained" color="primary" className="text-white btn-lg btn-block mb-10"><IntlMessages id="button.writeNewMessage" /></Button>
            </div>
            <div className="col-sm-7 col-md-8 col-lg-9">
               <InputGroup>
                  <InputGroupAddon addonType="prepend">
                     <IconButton aria-label="facebook">
                        <i className="zmdi zmdi-search"></i>
                     </IconButton>
                  </InputGroupAddon>
                  <Input placeholder="Search messages" type="text" onChange={(e) => getSearchResults(e)} />
               </InputGroup>
            </div>
         </div>
         <ul className="msg-list list-unstyled ie-flex">
            <li className="d-flex justify-content-between align-items-center">
               <div className="toolbar">
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={all}
                           color="primary"
                           onChange={() => handleChange(setAll)}
                           value="all"
                        />
                     }
                  />
                  <IconButton onClick={() => onReloadMessages()} className="btn-outline-default">
                     <i className="ti-reload"></i>
                  </IconButton>
               </div>
               <span className="fs-14">1-50 of 234</span>
            </li>
            {messages && messages.map((data, key) => (
               <li className="clearfix d-flex" key={key}>
                  <Checkbox
                     checked={data.select}
                     className="pull-left"
                     color="primary"
                     onClick={() => onSelectMessage(key)}
                  />
                  <IconButton className={classnames("pull-left mr-15", { 'text-warning': data.starred })} onClick={() => markMessageAsStar(key)}>
                     <i className="ti-star"></i>
                  </IconButton>
                  <div className="media pull-left">
                     {data.userAvatar !== '' ?
                        <img src={data.userAvatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                        : <Avatar className="mr-15">{data.userName.charAt(0)}</Avatar>
                     }
                     <div className="media-body">
                        <h5>{data.userName}</h5>
                        <p className="text-muted">{data.message}</p>
                        <div className="mb-10">
                           <Button className="btn-default mr-10 btn-xs" onClick={() => onReplyMessage(key)}>
                              <i className="ti-back-right mr-10"></i> Reply
                  </Button>
                           <Button className="btn-default btn-xs" onClick={() => viewMessage(data)}>
                              <i className="ti-eye mr-10"></i> Read
                  </Button>
                        </div>
                        {data.replyBox &&
                           <InputGroup className="w-75">
                              <Input className="mr-20" />
                              <Button color="primary" className="text-white" variant="contained" onClick={() => sendReply(key)}>Send</Button>
                           </InputGroup>
                        }
                     </div>
                  </div>
               </li>
            ))}
         </ul>
         {reloading &&
            <RctSectionLoader />
         }
         <Modal isOpen={newMessageModal} toggle={() => toggleWriteNewMessageModal()} className={props.className}>
            <ModalHeader toggle={() => toggleWriteNewMessageModal()}>Write New Message</ModalHeader>
            <ModalBody>
               <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                     type="text"
                     name="email"
                     id="name"
                     placeholder="Enter Name"
                     value={addNewMessageDetail.userName}
                     onChange={(e) => setAddNewMessageDetail({
                        ...addNewMessageDetail,
                        userName: e.target.value
                     })}
                  />
               </FormGroup>
               <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                     type="textarea"
                     name="text"
                     id="message"
                     value={addNewMessageDetail.message}
                     onChange={(e) => setAddNewMessageDetail({
                           ...addNewMessageDetail,
                           message: e.target.value
                     })}
                  />
               </FormGroup>
            </ModalBody>
            <ModalFooter>
               <Button variant="contained" color="primary" className="text-white" onClick={() => addNewMessage()}>Save</Button>{' '}
               <Button variant="contained" className="btn-danger text-white" onClick={() => toggleWriteNewMessageModal()}>Cancel</Button>
            </ModalFooter>
         </Modal>
         <Dialog open={viewMessageDialog} onClose={() => handleCloseViewMessage()}>
            <DialogContent>
               {selectedMessage !== null &&
                  <div className="clearfix d-flex">
                     <div className="media pull-left">
                        {selectedMessage.userAvatar !== '' ?
                           <img src={selectedMessage.userAvatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                           : <Avatar className="mr-15">{selectedMessage.userName.charAt(0)}</Avatar>
                        }
                        <div className="media-body">
                           <h5>{selectedMessage.userName}</h5>
                           <p className="text-muted">{selectedMessage.message}</p>
                        </div>
                     </div>
                  </div>
               }
            </DialogContent>
         </Dialog>
      </div>
   );
}
