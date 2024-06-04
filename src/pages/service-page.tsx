import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import ShopServiceView from 'src/sections/products/view/sevice-view';

// ----------------------------------------------------------------------

export default function ServicePage() {
  const { id } = useParams();
  const service = useAppSelector(selectServicesState).data?.find((s) => s.id === id);
  return (
    <>
      <Helmet>
        <title>Barber Shop | Service: {service.name}</title>
      </Helmet>

      <ShopServiceView service={service} />
    </>
  );
}
