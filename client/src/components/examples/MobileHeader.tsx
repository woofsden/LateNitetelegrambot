import MobileHeader from '../MobileHeader';

export default function MobileHeaderExample() {
  return (
    <div>
      <MobileHeader
        location="Palm Springs, CA"
        onLocationClick={() => console.log('Location clicked')}
        onNotificationClick={() => console.log('Notifications clicked')}
        onSearch={(query) => console.log('Search:', query)}
      />
    </div>
  );
}