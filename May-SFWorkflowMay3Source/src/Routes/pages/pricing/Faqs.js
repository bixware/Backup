/**
 * Faqs Component
 */
import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardText, CardColumns, CardBody } from 'reactstrap';

// api
import api from 'Api';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function Faqs() {
   const [faqs, setfaqs] = useState(null);
   
   useEffect(() => {
      getFaqs();
   },[])
   
    // get faqs
   const getFaqs = () => {
      api.get('faqs.js')
         .then((response) => {
            setfaqs(response.data);
         })
         .catch(error => {
               // error handling
         })
   }

   return (
      <div>
         <div className="text-center py-40">
            <h2 className="mb-0"><IntlMessages id="widgets.frequentlyAskedQuestions" /></h2>
         </div>
         <div className="faq-wrapper">
            <CardColumns>
               {faqs && faqs.map((faq, key) => (
                  <Card key={key}>
                     <CardBody>
                        <CardTitle>{faq.title}</CardTitle>
                        <CardText>{faq.content}</CardText>
                     </CardBody>
                  </Card>
               ))}
            </CardColumns>
         </div>
      </div>
   );
}

export default Faqs;
