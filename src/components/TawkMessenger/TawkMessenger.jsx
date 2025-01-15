import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

function TawkMessenger({ propertyId, widgetId }) {
  const tawkMessengerRef = useRef(null);

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
      ref={tawkMessengerRef}
    />
  );
}

export default TawkMessenger;
