import { Card } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

function LoadingPlaceholder() {
    return (
        <> 
            Loading your data...
            <Placeholder as={Card.Title} animation="glow" >
                <Placeholder xs={7} style={{ borderRadius:3 }}  />
                <Placeholder xs={8} style={{ borderRadius:3 }}  />
                <Placeholder xs={10} style={{ borderRadius:3 }}  />
                <Placeholder xs={6} style={{ borderRadius:3 }}  />
            </Placeholder>
        </>
    )
}

export default LoadingPlaceholder
