import ReactDOM from 'react-dom/client';
import App from './App';
import 'rsuite/dist/rsuite-rtl.min.css'
import '../src/style/style.css'
import { Provider } from 'react-redux';
import store from './class/redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
