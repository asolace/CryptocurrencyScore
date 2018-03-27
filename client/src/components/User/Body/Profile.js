import React from 'react'

const Profile = ({ user }) =>
  <div>
    <img src={user.googlePhotos} alt="profile-img"/> <br />
    Username: {user.username} <br />
    Email: {user.email}
  </div>

export default Profile
