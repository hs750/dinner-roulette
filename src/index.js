/**
 * This file exists to get around the problem of create-react-app not liking index.jsx combined
 * with airbnd style guide enforcing use of jsx file extention for files containing JSX content.
 * See index.jsx for the root of React compoennts.
 */

import './index.jsx';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();
