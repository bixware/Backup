/**
 * Card Masonary
 */
import React from 'react';
import {
   Card,
   CardImg,
   CardTitle,
   CardText,
   CardColumns,
   CardSubtitle,
   CardBody,
   CardImgOverlay
} from 'reactstrap';
import Button from '@material-ui/core/Button';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function CardsMasonry(props) {
   return (
      <div className="cardsmasonry-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.cardsMasonry" />} match={props.match} />
         <CardColumns>
            <Card inverse color="danger">
               <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  <Button variant="contained" color="default">Button</Button>
               </CardBody>
            </Card>
            <Card>
               <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/assets/images/img/gallery-7.jpg`} className="img-fluid" alt="Card image cap" />
               <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <Button variant="contained" color="primary" className="text-white">Button</Button>
               </CardBody>
            </Card>
            <Card inverse color="success">
               <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  <Button variant="contained" color="default">Button</Button>
               </CardBody>
            </Card>
            <Card>
               <CardImg width="100%" src={`${process.env.PUBLIC_URL}/assets/images/img/gallery-10.jpg`} className="img-fluid" alt="Card image cap" />
               <CardImgOverlay className="gradient-warning">
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <CardText>
                     <small>Last updated 3 mins ago</small>
                  </CardText>
               </CardImgOverlay>
            </Card>
            <Card>
               <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/assets/images/img/gallery-8.jpg`} className="img-fluid" alt="Card image cap" />
            </Card>
            <Card body style={{ borderColor: '#333' }}>
               <CardTitle>Special Title Treatment</CardTitle>
               <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
               <Button variant="contained" className="btn-dark text-white">Button</Button>
            </Card>
            <Card body inverse color="primary">
               <CardTitle>Special Title Treatment</CardTitle>
               <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
               <Button variant="contained" color="default">Button</Button>
            </Card>
            <Card>
               <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                  <Button variant="contained" color="primary" className="text-white">Button</Button>
               </CardBody>
               <CardImg bottom width="100%" src={`${process.env.PUBLIC_URL}/assets/images/img/gallery-9.jpg`} className="img-fluid" alt="Card image cap" />
            </Card>
         </CardColumns>
      </div>
   );
}

export default CardsMasonry