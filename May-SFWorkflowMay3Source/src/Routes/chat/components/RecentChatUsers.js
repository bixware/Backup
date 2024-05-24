/**
 * Recent Chat Users
 */
import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';

// components
import UserListItem from './UserListItem';

// actions
import { chatWithSelectedUser, getRecentChatUsers } from 'Store/Actions';

function RecentChatUsers(props) {
   const dispatch = useDispatch();
   const chatAppReducer = useSelector(state => state.chatAppReducer);
   useEffect(() => {
      fetchRecentChatUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

	/**
	 * Fetch Recent User
	 */
	const fetchRecentChatUsers = () => {
      dispatch(getRecentChatUsers());
	}

	/**
	 * Swicth Chat With User
	 * @param {*object} user
	 */
	const switchChatWithUser = (user) => {
      dispatch(chatWithSelectedUser(user));
	}


   const { recentChatUsers, selectedUser } = chatAppReducer;
   if (recentChatUsers === null) {
      return (
         <div className="no-found-user-wrap">
            <h4>No User Found</h4>
         </div>
      );
   }
   return (
      <List className="p-0 mb-0">
         {recentChatUsers && recentChatUsers.map((user, key) => (
            <UserListItem
               selectedUser={selectedUser}
               user={user}
               key={key}
               onClickListItem={() => switchChatWithUser(user)}
            />
         ))}
      </List>
   );
}

export default RecentChatUsers;
