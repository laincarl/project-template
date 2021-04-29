import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import './index.less';

const Worker = lazy(() => import('./worker'));

const PageIndex = () => (
  <Router>
    <div className="app-container">
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/worker">worker</Link></li>
      </ul>
      <Suspense fallback="loading...">
        <Switch>
          <Route path="/worker">
            <Worker />
          </Route>
        </Switch>
      </Suspense>
    </div>
  </Router>
);

export default PageIndex;
