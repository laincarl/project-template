import ReactDOM from 'react-dom';
import EnsureLocaleLoaded from './components/EnsureLocaleLoaded';
import App from './pages/index';

ReactDOM.render(
  <EnsureLocaleLoaded>
    <App />
  </EnsureLocaleLoaded>,
  document.getElementById('root'),
);
