/**
 * Email Listing Header
 */
import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// redux action
import {
   //  updateSearchEmail,
   //  searchEmail,
    onDeleteEmail,
    onEmailMoveToFolder,
    selectAllEMails,
    getUnselectedAllEMails,
    addLabelsIntoEmail
} from 'Store/Actions';

import IntlMessage from 'Util/IntlMessages';

function EmailListingHeader() {
   const [anchorEl, setAnchorEl] = useState(null);
   const [folderMenu, setFolderMenu] = useState(false);
   const [labelMenu, setLabelMenu] = useState(false);
   const dispatch = useDispatch();
   const emailApp = useSelector(state => state.emailApp);
   const { folders, labels, selectedEmails, emails } = emailApp;
   /**
    * On Delete Email
    */
   const deleteEmail = () => {
      dispatch(onDeleteEmail());
   }

    /**
     * Opn Folder Menu
     */
   const openFolderMenuOption = (e) => {
      setFolderMenu(true);
      setAnchorEl(e.currentTarget);
   }

    /**
     * On Folder Menu Item Select
     */
   const onFolderMenuItemSelect = (id) => {
      dispatch(onEmailMoveToFolder(id));
      setAnchorEl(null);
    }

    /**
     * Hanlde Request Close
     */
   const handleRequestClose = () => {
      setAnchorEl(null)
      setLabelMenu(false)
      setFolderMenu(false);
   }

    /**
     * Open Add Labels Menus
     */
   const openAddLabelsMenu = (e) => {
      setAnchorEl(e.currentTarget);
      setLabelMenu(true);
   }

    /**
     * Add Labels Into Mail
     */
   const addLabelsIntoMail = (label) => {
      setAnchorEl(null);
      setLabelMenu(false);
      dispatch(addLabelsIntoEmail(label));
   }
    /**
     * Get Email Actions
     */
   const getEMailActions = () => {
      return (
         <div>
            <Tooltip id="tooltip-move-to" title="Move To" placement="top-start">
               <IconButton onClick={(e) => openFolderMenuOption(e)}>
                  <i className="zmdi zmdi-folder" />
               </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Delete" placement="top-start">
               <IconButton onClick={() => deleteEmail()}>
                  <i className="zmdi zmdi-delete" />
               </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-add-label" title="Add Labels" placement="top-start">
               <IconButton onClick={(e) => openAddLabelsMenu(e)}>
                  <i className="zmdi zmdi-label-alt" />
               </IconButton>
            </Tooltip>
            <Menu id="folder-menu"
               anchorEl={anchorEl}
               open={folderMenu}
               onClose={handleRequestClose}
               MenuListProps={{
                  style: {
                     width: 150,
                  },
               }}>
               {folders.map(folder =>
                  <MenuItem key={folder.id}
                     onClick={() => onFolderMenuItemSelect(folder.id)}
                  >
                     <IntlMessage id={folder.title} />
                  </MenuItem>
               )}
            </Menu>
            <Menu id="label-menu"
               anchorEl={anchorEl}
               open={labelMenu}
               onClose={handleRequestClose}
               MenuListProps={{
                  style: {
                        width: 150,
                  },
               }}>
               {labels.map((label, key) => (
                  <MenuItem key={key} onClick={() => addLabelsIntoMail(label)}>
                     <IntlMessage id={label.name} />
                  </MenuItem>
               ))}
            </Menu>
         </div>
      );
   }

    /**
     * On Search Email
     */
   // const onSearchEmail = (e) => {
   //    dispatch(updateSearchEmail(e.target.value));
   //    dispatch(searchEmail(e.target.value));
   // }

    /**
     * On All Email Select
     */
   const onAllEMailSelect = (e) => {
      const selectAll = selectedEmails < emails.length;
      if (selectAll) {
         dispatch(selectAllEMails());
      } else {
         dispatch(getUnselectedAllEMails());
      }
   }
   return (
      <div className="top-head">
            <div className="d-flex justify-content-start">
               <Checkbox color="primary"
                  indeterminate={selectedEmails > 0 && selectedEmails < emails.length}
                  checked={selectedEmails > 0}
                  onChange={(e) => onAllEMailSelect(e)}
                  value="SelectMail"
               />
               {(selectedEmails > 0) && getEMailActions()}
            </div>
      </div>
   );
}

export default EmailListingHeader;

