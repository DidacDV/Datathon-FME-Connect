import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    skills: ['React', 'Node.js', 'Python'],
    goals: 'Learn new technologies and network.',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profile</h1>
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
          <p><strong>Goals:</strong> {profile.goals}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Skills:
              <input
                type="text"
                name="skills"
                value={profile.skills.join(', ')}
                onChange={(e) => {
                  const skillsArray = e.target.value.split(',').map((s) => s.trim());
                  setProfile((prevProfile) => ({ ...prevProfile, skills: skillsArray }));
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Goals:
              <textarea
                name="goals"
                value={profile.goals}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
