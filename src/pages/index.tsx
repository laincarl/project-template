import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import {
  FormattedMessage, useIntl,
} from 'react-intl';
import './index.less';

const Worker = lazy(() => import('./worker'));
const Zustand = lazy(() => import('./zustand'));

const PageIndex = () => {
  const intl = useIntl();
  return (
    <Router>
      <div className="app-container">
        <ul>
          <li>
            <Link to="/">
              {intl.formatMessage({
                description: '首页描述',
                defaultMessage: '首页',
              })}
            </Link>
          </li>
          <li>
            <Link to="/worker">
              <FormattedMessage
                description="首页worker描述" // Description should be a string literal
                defaultMessage="首页worker"
              />
            </Link>
          </li>
          <li>
            <Link to="/zustand">
              {intl.formatMessage({
                description: 'zustand',
                defaultMessage: 'zustand',
              })}
            </Link>
          </li>
        </ul>
        <Suspense fallback="loading...">
          <Switch>
            <Route path="/worker">
              <Worker />
            </Route>
            <Route path="/zustand">
              <Zustand />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default PageIndex;
