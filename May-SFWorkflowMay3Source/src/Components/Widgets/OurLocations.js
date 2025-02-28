/**
 * Our Loactions Widget
 */
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const ourlocationsData = [
	{
		locationId: 1,
		sales: '+ 01 123 456 7890, info@sales.com',
		support: 'info@support.com',
		phone: '12002342345656',
		fax: '+011234567890',
		address: 'E - 51m, Industrial area, Phase 2, Mohali, Punjab, India.'
	},
	{
		locationId: 2,
		sales: '+91123456789, info@example.com',
		support: 'support@info.com',
		phone: '+91123456789',
		fax: '+123456789564',
		address: ''
	},
	{
		locationId: 3,
		sales: '',
		support: 'example@info.com',
		phone: '+39209424892346',
		fax: '+56837653878756',
		address: 'E - 51m, Industrial area, Phase 2, Mohali, Punjab, India.'
	}
]

const locations = [
	{
		id: 1,
		name: 'USA'
	},
	{
		id: 2,
		name: 'India'
	},
	{
		id: 3,
		name: 'UK'
	}
]

function TabContainer({ children }) {
	return (
		<Typography component="div">
			{children}
		</Typography>
	);
}

const ShowLocation = ({ data }) => (
	<List className="p-0 border-top">
		{data.sales !== '' &&
			<ListItem className="d-flex align-items-center border-bottom py-15">
				<span className="w-25">Sales</span>
				<p className="w-75 mb-0">{data.sales}</p>
			</ListItem>
		}
		{data.support !== '' &&
			<ListItem className="d-flex align-items-center border-bottom py-15">
				<span className="w-25">Support</span>
				<a href={`mailto: ${data.support}`} className="d-block w-75 text-dark">{data.support}</a>
			</ListItem>
		}
		{data.phone !== '' &&
			<ListItem className="d-flex align-items-center border-bottom py-15 ">
				<span className="w-25">Phone</span>
				<a href={`tel:${data.phone}`} className="w-75 d-block text-dark">{data.phone}</a>
			</ListItem>
		}
		{data.fax !== '' &&
			<ListItem className="d-flex align-items-center border-bottom py-15">
				<span className="w-25">Fax</span>
				<p className="w-75 mb-0">{data.fax}</p>
			</ListItem>
		}
		{data.address !== '' &&
			<ListItem className="d-flex align-items-center py-15">
				<span className="w-25">Address</span>
				<div className="w-75">
					<address className="mb-0">{data.address}</address>
					<a href="!#" onClick={e => e.preventDefault()} className="text-danger d-block">Get Direction</a>
				</div>
			</ListItem>
		}
	</List>
);

function OurLocations() {
   const [value,setValue] = useState(0);
   
	const handleChange = (event, value) => {
		setValue(value);
	};

	const handleChangeIndex = index => {
      setValue(index);
	};

	const getCountryName = (locationId) =>  {
		for (const location of locations) {
			if (location.id === locationId) {
				return location.name;
			}
		}
	}
   return (
      <div className="location-wrap">
         <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="off"
         >
            {ourlocationsData && ourlocationsData.map((location, key) => (
               <Tab label={getCountryName(location.locationId)} key={key} />
            ))}
         </Tabs>
         <SwipeableViews
            index={value}
            onChangeIndex={handleChangeIndex}
         >
            {ourlocationsData && ourlocationsData.map((location, key) => (
               <TabContainer key={key}>
                  <ShowLocation data={location} />
               </TabContainer>
            ))}
         </SwipeableViews>
      </div>
   );
}

export default OurLocations;
