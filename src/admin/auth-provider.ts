import { DefaultAuthProvider } from 'adminjs';

import {componentLoader} from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';

import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    if (email === DEFAULT_ADMIN.email) {
      return { email };
    }

    const user = await User.findOne({ email });
    
    if(!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    return { email: user.email };
  },
});

export default provider;
