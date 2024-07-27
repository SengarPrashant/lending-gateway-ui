import './App.scss';
import Login from './login';
import Layout from './components/Layout';

function App() {
  const loggedinUser = localStorage.getItem('name')
  return (
    <>
      {loggedinUser && <>
        <Layout/>
      </>}
      {!loggedinUser && <Login />}
    </>
  )
}

export default App
