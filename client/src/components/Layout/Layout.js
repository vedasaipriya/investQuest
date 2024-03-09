import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'77vh'}}>
          <Toaster />
          {children}
        </main>

        <Footer/>
    </div>
  );
}


/*const Layout = (props) => {
  return (
    <div>
        <Header/>

        <main style={{minHeight:'80vh'}}>
          {props.children}
        </main>

        <Footer/>
    </div>
  );
};
*/

export default Layout