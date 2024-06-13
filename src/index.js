import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import SignUp from 'views/auth/signIn/SignUp';
import BookingForm from 'views/admin/default/Booking/BookingForm';
import PaymentForm from 'views/admin/default/Booking/PaymentForm';
import PaymentSuccess from 'views/admin/default/Booking/PaymentSuccess';
import ReviewForm from 'views/admin/default/Booking/ReviewForm';
import Chat from 'views/admin/default/Chat/Chat';
import ChatList from 'views/admin/default/Chat/ChatList';
import AddProperty from 'views/admin/default/Property/AddProperty';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import PropertyDetail from 'views/admin/default/Property/PropertyDetail';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
			<Route path="/sign-up" component={SignUp} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path="/property/:id" component={PropertyDetail} />
			<Route path="/AddProperty" component={AddProperty} />
            <Route path="/sign-up" component={SignUp} /> {/* Добавьте маршрут для SignIn */}
			<Route path="/booking/:id" component={BookingForm} />
			<Route path="/chat/:id" component={Chat} />
			<Route path="/chats" component={ChatList} />
			<Route path="/payment" component={PaymentForm} /> 
			<Route path="/payment-success" component={PaymentSuccess} />
			<Route path="/write-review/:id" component={ReviewForm} /> 
            <Redirect from='/' to='/admin' />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
