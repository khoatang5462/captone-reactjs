import './App.css';

import ErrorBoundary from './components/ErrorBoundary';
import { Router } from './router/Router';

function App() {
  return (
    <ErrorBoundary>
     <Router/>
    </ErrorBoundary>
  );
}

export default App;
