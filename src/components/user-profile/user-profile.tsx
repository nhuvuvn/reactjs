import React, { useState, useEffect } from 'react';
import { Profile } from '../../models/profile';
import { fetchData } from '../../datasource/fetch-data';
import { ShowUserProfile } from './show-profile';

export function UserProfile() {
  // get profile
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/profile');
        setProfile(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      {profile ? <ShowUserProfile profile={profile} /> : null}
    </div>
  );
}
