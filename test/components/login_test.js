import { renderComponent , expect } from '../test_helper';
import Login from '../../src/components/login';
import {CHANGE_AUTH} from '../../src/actions/types';
import {authentication} from '../../src/actions';
import authReducer from '../../src/reducers/auth';

describe('Login Component', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Login);
  });

  describe('Rendering elements', () => {

    it('Has correct heading', () => {
      expect(component.find('h2')).to.have.contain('Sign In To 360training.com');
    });

    it('Have three input fields', () => {
      expect(component.find('input[type=text]')).to.exist;
      expect(component.find('input[type=password]')).to.exist;
      expect(component.find('input[type=checkbox]')).to.exist;
    });

    it('Have three buttons', () => {
      expect(component.find('.btn.btn-primary').length).to.equal(3);
    });

    it('Have two hyperlinks', () => {
      expect(component.find('a').length).to.equal(2);
    });
  });

  describe('Actions', () => {

    describe('authentication', () => {

      it('Has the correct type', () => {
        const action = authentication(true);
        expect(action.type).to.equal(CHANGE_AUTH);
      });

    });

  });

  describe('Reducers', () => {

    describe('authentication', () => {

      it('handles action with unknown type', () => {
        expect(authReducer(undefined,{})).to.eql({});
      });

      it('handles action of type CHANGE_AUTH', () => {
        const action = {type:CHANGE_AUTH,payload:"faketoken"}
        expect(authReducer({},action)).to.eql("faketoken");
      });

    });

  });

});
