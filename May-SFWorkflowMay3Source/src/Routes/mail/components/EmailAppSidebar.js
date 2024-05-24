/**
* Email App Sidebar
* Used To Filter Mail List
*/
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// actions
import { filterEmails } from 'Store/Actions';

//Intl Message
import IntlMessages from 'Util/IntlMessages';

function EmailAppSidebar(props){
   const dispatch = useDispatch();
   const emailApp = useSelector(state => state.emailApp);
	/**
	 * Navigate To Folder Emails
	 */
	const navigateTo = (key) => {
		const { match, history } = props;
		history.push(`${match.url}/folder/${key}`);
	}

	/**
	 * Filter Emails
	 */
	const filterAllEmails = (label) => {
		dispatch(filterEmails(label));
	}

	/**
	 * Get Scroll Height
	 */
	const getScrollHeight = () => {
		const { location } = props;
		const appLayout = getAppLayout(location)
		switch (appLayout) {
			case 'app':
				return 'calc(100vh - 288px)';
			case 'agency':
				return 'calc(100vh - 416px)';
			case 'boxed':
				return 'calc(100vh - 416px)';
			case 'horizontal':
				return 'calc(100vh - 333px)';
			default:
				break;
		}
	}

   const { folders, selectedFolder, labels } = emailApp
   return (
      <Scrollbars
         className="rct-scroll"
         autoHide
         style={{ height: getScrollHeight() }}
      >
         <div className="sidebar-filters-wrap">
            <List className="p-0 filters list-unstyled">
               {folders.map((folder, key) => (
                  <ListItem
                     button
                     key={key}
                     onClick={() => navigateTo(folder.handle)}
                     className={classnames({ 'item-active': selectedFolder === folder.id })}>
                     <i className={`mr-20 zmdi zmdi-${folder.icon}`} />
                     <span className="filter-title">
                        <IntlMessages id={folder.title} />
                     </span>
                  </ListItem>
               ))}
            </List>
            <h6 className="sidebar-title px-20 pt-20">Labels</h6>
            <List className="list-unstyled filters p-0">
               {labels && labels.map((label, key) => (
                  <ListItem button key={key} onClick={() => filterAllEmails(label)}>
                     <span className={`badge-${label.badgeClass} ladgend`}></span>
                     <span className="filter-title"><IntlMessages id={label.name} /></span>
                  </ListItem>
               ))}
            </List>
         </div>
      </Scrollbars>
   );
}


export default withRouter(EmailAppSidebar);
