import { userModel } from '../models/users.model';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

class User {
  private static instance: User | null = null;

  public static getUserInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      let users = await userModel.find({});
      // .populate('allProducts.id', 'pName pImages pPrice')
      // .populate('user', 'name email')
      // .sort({ _id: -1 });
      if (users) {
        return res.json({ users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req: Request, res: Response) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: 'All filled must be required' });
    } else {
      try {
        let user = await userModel
          .findById(uId)
          .select('name email phoneNumber userImage updateAt createdAt');
        if (user) {
          return res.json({ user });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async createUser(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: 'All fields must be filled.' });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      try {
        let newUser = new userModel({
          email: email,
          password: hashedPassword,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: 'User created successfully!' });
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async editAccountDetails(req: Request, res: Response) {
    let { uId, name, lastName, email } = req.body;

    if (!uId) {
      return res.json({ message: "User don't exist." });
    } else {
      if (!name && !lastName) {
        return res.json({ message: 'All fields must be filled.' });
      } else {
        if (!email) {
          let user = userModel.findByIdAndUpdate(uId, {
            name: name,
            lastName: lastName,
            updatedAt: Date.now(),
          });
          user.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: 'User updated successfully.' });
          });
        } else {
          let user = userModel.findByIdAndUpdate(uId, {
            name: name,
            lastName: lastName,
            email: email,
            updatedAt: Date.now(),
          });
          user.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: 'User updated successfully.' });
          });
        }
      }
    }
  }

  async editAddress(req: Request, res: Response) {
    let {
      uId,
      firstName,
      lastName,
      email,
      street,
      residenceDetails,
      city,
      state,
      country,
      postalCode,
    } = req.body;

    if (!uId) {
      return res.json({ message: "User don't exist." });
    } else {
      if (
        !uId ||
        !firstName ||
        !lastName ||
        !email ||
        !street ||
        !residenceDetails ||
        !city ||
        !state ||
        !country ||
        !postalCode
      ) {
        return res.json({ message: 'All fields must be filled.' });
      } else {
        let user = userModel.findByIdAndUpdate(uId, {
          billingAddress: {
            firstName,
            lastName,
            email,
            street,
            residenceDetails,
            city,
            state,
            country,
            postalCode,
          },
        });
        user.exec((err, result) => {
          if (err) console.log(err);
          return res.json({ success: 'Billing address updated successfully!' });
        });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: 'All filled must be required' });
    } else {
      let user = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      user.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: 'User updated successsfully' });
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: 'All filled must be required' });
    } else {
      const user = await userModel.findOne({ _id: uId });
      if (!user) {
        return res.json({ error: 'Invalid user' });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, user.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: 'Password updated successfully' });
          });
        } else {
          return res.json({
            error: 'Your old password is wrong!',
          });
        }
      }
    }
  }
}

export const usersController = User.getUserInstance();
