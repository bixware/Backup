/**
 * User Block
 */
import React from 'react';

function UserBlock(){
   return (
      <div className="profile-top mb-20">
         <img src={`${process.env.PUBLIC_URL}/assets/images/img/profile-bg.jpg`} alt="profile banner" className="img-fluid" width="1920" height="345" />
            <div className="profile-content">
               <div className="media">
               <img src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" />
                  <div className="media-body pt-25">
                        <div className="mb-20">
                           <h2>Lucile Beck</h2>
                           <p>info@example.com</p>
                        </div>
                  </div>
               </div>
            </div>
      </div>
   );
}

export default UserBlock;
