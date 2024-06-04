import { Helmet } from 'react-helmet-async';
import UploadProfilePhotoView from 'src/sections/register/upload-profile-photo';

// ----------------------------------------------------------------------

export default function UploadProfilePhotoPage() {
  return (
    <>
      <Helmet>
        <title> Upload a Picture | Barber Shop</title>
      </Helmet>

      <UploadProfilePhotoView />
    </>
  );
}
