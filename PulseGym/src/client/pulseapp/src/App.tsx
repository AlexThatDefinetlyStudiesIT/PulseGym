import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/layout';
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
export default App;