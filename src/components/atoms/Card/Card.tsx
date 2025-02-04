export const Card = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='border rounded-sm py-4 px-2'>
      {children}
    </div>
  );
};
