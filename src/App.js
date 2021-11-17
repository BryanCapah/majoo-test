
import { lazy, memo, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {
  const TodoList = lazy(() => import('./screens/todo-list'))
  const TodoDetail = lazy(() => import('./screens/todo-detail'))
  const Loading = () => <div></div>


  return (
    <div className='w-full flex justify-center p-10'>
      <div className='App md:w-1/3 w-full'>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                exact
                path='/'
                name='Todo List'
                element={<TodoList />}
              />
              <Route
                exact
                path='/:id'
                name='Todo Detail'
                element={<TodoDetail />}
              />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>

  );
}

export default memo(App);
