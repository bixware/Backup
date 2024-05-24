/**
 * Compose Email Component
 */
import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useDispatch } from 'react-redux';

// actions
import { sendEmail, emailSentSuccessfully } from 'Store/Actions';

// intl message
import IntlMessages from 'Util/IntlMessages';

// modules
const modules = {
	toolbar: [
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		[{ 'font': [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
		['link', 'image'],
		['clean'],
		[{ 'align': [] }]
	],
};

// formats
const formats = [
	'header',
	'font',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet', 'indent',
	'link', 'image', 'align'
];

function ComposeEmail(props) {
   const [to, setTo] = useState('');
   const [cc,setCc] = useState('');
   const [bcc,setBcc] = useState('');
   const [subject, setSubject] = useState('');
   const [message, setMessage] = useState('');

   const dispatch = useDispatch();
   
	/**
	 * On Send Email
	 */
	const onSendEmail = () => {
		const { history } = props;
		if (to !== '' && subject !== '' && message !== '') {
			dispatch(sendEmail());
			history.push('/app/mail/folder/sent');
			setTimeout(() => {
            dispatch(emailSentSuccessfully());
			}, 2000);
		}
	}

	/**
	 * On Change Form Values
	 */
	const onChangeFormValue = (key, value) => {
      key(value);
	}

   return (
      <div className="compose-email-container">
         <InputGroup>
            <InputGroupAddon addonType="prepend">
               <InputGroupText>To</InputGroupText>
            </InputGroupAddon>
            <Input
               name="to"
               type="email"
               value={to}
               onChange={(e) => onChangeFormValue(setTo, e.target.value)}
            />
         </InputGroup>
         <InputGroup>
            <InputGroupAddon addonType="prepend">
               <InputGroupText>CC</InputGroupText>
            </InputGroupAddon>
            <Input
               name="cc"
               type="email"
               value={cc}
               onChange={(e) => onChangeFormValue(setCc, e.target.value)}
            />
         </InputGroup>
         <InputGroup>
            <InputGroupAddon addonType="prepend">
               <InputGroupText>BCC</InputGroupText>
            </InputGroupAddon>
            <Input
               name="bcc"
               type="email"
               value={bcc}
               onChange={(e) => onChangeFormValue(setBcc,e.target.value)}
            />
         </InputGroup>
         <InputGroup>
            <InputGroupAddon addonType="prepend">
               <InputGroupText>Subject</InputGroupText>
            </InputGroupAddon>
            <Input
               name="subject"
               type="text"
               value={subject}
               onChange={(e) => onChangeFormValue(setSubject, e.target.value)}
            />
         </InputGroup>
         <ReactQuill
            modules={modules}
            formats={formats}
            value={message}
            onChange={(value) => onChangeFormValue(setMessage,value)}
         />
         <div className="compose-email-actions p-10">
            <Button className="btn-primary text-white" onClick={() => onSendEmail()}>
               <Icon className="mr-10">send</Icon>
               <IntlMessages id="widgets.send" />
            </Button>
         </div>
      </div>
   );
}

export default ComposeEmail;
