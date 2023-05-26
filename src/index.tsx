import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux';

import 'rsuite/dist/rsuite-rtl.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style/style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
