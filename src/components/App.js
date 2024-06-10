import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

export default function App(){
    return <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
    

}
