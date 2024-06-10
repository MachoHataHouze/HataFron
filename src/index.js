import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import SignUp from 'views/auth/signIn/SignUp';
import BookingForm from 'views/admin/default/BookingForm';
import PaymentForm from 'views/admin/default/PaymentForm';
import PaymentSuccess from 'views/admin/default/PaymentSuccess';
import ReviewForm from 'views/admin/default/ReviewForm';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import PropertyDetail from 'views/admin/default/PropertyDetail';
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
            <Route path={`/rtl`} component={RtlLayout} />
            <Route path="/property/:id" component={PropertyDetail} />
            <Route path="/sign-up" component={SignUp} /> {/* Добавьте маршрут для SignIn */}
			<Route path="/booking/:id" component={BookingForm} />
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
