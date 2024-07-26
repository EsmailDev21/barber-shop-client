import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import UpdateServiceView from 'src/sections/my-services/view/update-service';

// ----------------------------------------------------------------------

export default function UpdateServicePage() {
  const { id } = useParams();
  const service = useAppSelector(selectServicesState).data?.find((s) => s.id === id);

  return (
    <>
      <Helmet>
        <title> Update Service | Barber Shop </title>
      </Helmet>

      <UpdateServiceView service={service} />
    </>
  );
}
