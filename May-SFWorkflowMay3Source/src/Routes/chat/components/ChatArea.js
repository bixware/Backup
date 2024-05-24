/**
 * Chat Area Component
 */
import React, { useState, useRef } from 'react';
import MessageBlock from './MessageBlock';
import { FormGroup, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

// actions
import { sendMessageToUser } from 'Store/Actions';

// app layouts
import { getAppLayout } from 'Helpers/helpers';

function ChatArea(props) {
   const chatScroll = useRef();
   const [message, setMessage] = useState('')
   const [anchorEl, setAnchorEl] = useState(null)
   const dispatch = useDispatch();
   const chatAppReducer = useSelector(state => state.chatAppReducer);

	let chatOptions = [
			'Mute Notifications',
			'Block',
			'Clear Chat',
			'Send Contact'
		]

	const handleClose = () => {
      setAnchorEl(null);
	};

	const chatOptionsHandler = event => {
      setAnchorEl(event.currentTarget);
	}

	const onSubmitMessage = (event) => {
		event.preventDefault();
		if (message !== '') {
			let data = {
				user: props.selectedUser,
				message: message,
				isAdmin: true,
				time: 'Just Now'
			}
         dispatch(sendMessageToUser(data));
         setMessage('');
			setTimeout(() => {
				chatScroll.current.scrollToBottom();
			}, 200);
		}
	}

	const getScrollHeight = () => {
		const { location } = props;
		const appLayout = getAppLayout(location)
		if (props.fullHeight) {
			return 'calc(100vh - 226px)';
		} else {
			switch (appLayout) {
				case 'app':
					return 'calc(100vh - 198px)';
				case 'agency':
					return 'calc(100vh - 387px)';
				case 'boxed':
					return 'calc(100vh - 387px)';
				case 'horizontal':
					return 'calc(100vh - 250px)';
				default:
					break;
			}
		}
	}

   const { selectedUser, admin_photo_url } = chatAppReducer;
   if (selectedUser === null) {
      return (
         <div className="chat-box-main">
            <div className="text-center">
               <i className="zmdi zmdi-comments font-3x mb-2"></i>
               <Button className="d-none sidebar-toggler" onClick={props.onMenuIconPress}>Select user</Button>
            </div>
         </div>
      );
   }
   return (
      <div className="chat-main-body">
         <div className="chat-head">
            <div className="d-flex justify-content-between align-items-center">
               <div className="media align-items-center">
                  <IconButton
                     className="mr-3 chat-sidebar-toggler d-none"
                     color="inherit"
                     aria-label="open drawer"
                     onClick={props.onMenuIconPress}
                  >
                     <MenuIcon />
                  </IconButton>
                  <div className="mr-10">
                     <img
                        src={selectedUser.photo_url}
                        alt="user profile"
                        className="rounded-circle"
                        width="40"
                        height="40"
                     />
                  </div>
                  <div className="media-body mt-1">
                     <h5 className="mb-0">{selectedUser.first_name}&nbsp;{selectedUser.last_name}</h5>
                     <span className="font-xs text-muted">{selectedUser.status}</span>
                  </div>
               </div>
               <div>
                  <IconButton className="bg-primary text-white video-icon">
                     <i className="zmdi zmdi-videocam"></i>
                  </IconButton>
                  <IconButton className="bg-primary text-white">
                     <i className="zmdi zmdi-attachment-alt"></i>
                  </IconButton>
                  <IconButton
                     aria-owns={anchorEl ? 'simple-menu' : null}
                     aria-haspopup="true"
                     onClick={chatOptionsHandler}
                  >
                     <i className="zmdi zmdi-more-vert"></i>
                  </IconButton>
                  <Menu
                     id="simple-menu"
                     anchorEl={anchorEl}
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     {chatOptions.map((option, key) => (
                        <MenuItem key={key} onClick={handleClose}>{option}</MenuItem>
                     ))}
                  </Menu>
               </div>
            </div>
         </div>
         <Scrollbars
            className="rct-scroll"
            autoHide
            ref={chatScroll}
            style={{ height: getScrollHeight() }}
         >
            <div className="chat-body p-30">
               {selectedUser.previousChats.map((previousChat, key) => (
                  <MessageBlock
                     even={!previousChat.isAdmin}
                     key={key}
                     selectedUserPhotoUrl={selectedUser.photo_url}
                     data={previousChat}
                     adminPhotoUrl={admin_photo_url}
                  />
               ))}
            </div>
         </Scrollbars>
         <div className="chat-footer d-flex px-4 align-items-center py-3">
            <form onSubmit={(event) => onSubmitMessage(event)} className="mr-3 w-100">
               <FormGroup className="mb-0">
                  <Input
                     type="text"
                     id="search-msg"
                     placeholder="Type your message"
                     value={message}
                     className="msg-input"
                     onChange={(event) => setMessage(event.target.value)}
                  />
               </FormGroup>
            </form>
            <Button
               variant="contained"
               color="primary"
               onClick={(event) => onSubmitMessage(event)}
               className="submit-btn bg-primary"
            >
               Send
               <i className="zmdi zmdi-mail-send ml-2"></i>
            </Button>
         </div>
      </div>
   );
}

export default withRouter(ChatArea);
