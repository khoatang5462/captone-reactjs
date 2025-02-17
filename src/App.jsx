import './App.css';
import { Router } from './Router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router/>
    </ErrorBoundary>
  );
}

export default App;
