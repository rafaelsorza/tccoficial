import React from "react";
import { useAuth } from '../../../main'

const userButon: React.FC = () => {
    const { currentUser } = useAuth();
    return(
      <>
        <div className="user-info">
            <img
              src={currentUser.photoURL || 'default-avatar.jpg'}
              className="user-avatar"
              alt="User Avatar" /> 

            <div className="user-details">
                <span className="user-name">{currentUser.displayName}</span>
    </div>           </div>
      </>
     
      
    );
    
  };
  
  export default userButon;