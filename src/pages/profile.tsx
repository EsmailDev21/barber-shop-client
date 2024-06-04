import { Helmet } from 'react-helmet-async';

import { NotAuthorizedView } from 'src/sections/error';
import ProfileView from 'src/sections/profile/profile-view';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | Barber Shop </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
