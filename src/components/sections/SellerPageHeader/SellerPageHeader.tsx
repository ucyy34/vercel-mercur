import {
  SellerFooter,
  SellerHeading,
} from '@/components/organisms';
import { SingleProductSeller } from '@/types/product';

export const SellerPageHeader = ({
  seller,
}: {
  seller: SingleProductSeller;
}) => {
  return (
    <div className='border rounded-sm p-4'>
      <SellerHeading seller={seller} />
      <p
        dangerouslySetInnerHTML={{
          __html: seller.description,
        }}
        className='label-md my-5'
      />
      <SellerFooter seller={seller} />
    </div>
  );
};
