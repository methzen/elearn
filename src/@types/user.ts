// ----------------------------------------------------------------------

import { Circle } from 'src/components/CourseCard';
import { CustomerStripeInvoice, StripePaymentMethod, StripeSubscription } from './stripe';

export type IUserSocialLink = {
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
  youtubeLink: string;
};

export type IUserProfileContribution = {
  contribution: number | null;
  karma: number | null;
};

export type IUserProfileCover = {
  name: string;
  cover: string;
  role: string;
};

export type IUserProfileAbout = {
  about?: string;
  country?: string;
  email?: string;
  job?: string;
  company?: string;
  school?: string;
};

export type IUserProfile = IUserProfileContribution &
  IUserProfileAbout & {
    _id: string;
    socialLinks: IUserSocialLink;
  };

export type IUserProfileFollower = {
  _id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type IUserProfileGallery = {
  _id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type IUserProfileFriend = {
  _id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

// export type IUserProfilePost = {
//   _id: string;
//   by: {
//     _id: string;
//     avatarUrl: string;
//     name: string;
//   };
//   isLiked: boolean;
//   likes: number;
//   score: number;
//   dead: boolean;
//   rank: number;
//   created: Date | string | number;
//   commentCount: number;
//   content: string;
//   personLikes: {
//     name: string;
//     avatarUrl: string;
//   }[];
//   comments: {
//     _id: string;
//     author: {
//       _id: string;
//       avatarUrl: string;
//       name: string;
//     };
//     createdAt: Date | string | number;
//     message: string;
//   }[];
// };
export type IUserComment = {
  _id: string;
  by: {
    _id: string;
    photoURL: string;
    firstname: string;
    lastname: string;
  };
  createdAt: Date | string | number;
  text: string;
  comments?: IUserComment[];
};

export type IUserProfilePost = {
  _id: string;
  by: {
    _id: string;
    photoURL: string;
    firstname: string;
    lastname: string;
  };
  likes: number;
  isLiked: boolean;
  score: number;
  dead: boolean;
  rank: number;
  media: string;
  createdAt: Date | string | number;
  commentCount: number;
  title: string;
  content: string;
  personLikes: {
    _id: string;
    photoURL: string;
    firstname: string;
    lastname: string;
  }[];
  comments: IUserComment[];
};
// ----------------------------------------------------------------------

export type IUserCard = {
  _id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
};

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
  _id: string;
  photoURL: string;
  cover?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
  created?: Date | string | number;
  karma?: number | null;
  about?: string;
  showDead?: boolean;
  address?: string;
  state?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  company?: string;
  isVerified?: boolean;
  status?: string;
  job: string;
  groups?: string[];
  contribution?: number | null;
  showPrivateUserData?: boolean;
  socialLinks?: IUserSocialLink;
};

export type IUserAccountBillingCreditCard = {
  _id: string;
  cardNumber: string;
  cardType: string;
};

export type IUserAccountBillingInvoice = {
  _id: string;
  createdAt: Date | string | number;
  price: number;
};

export type IUserAccountBillingAddress = {
  _id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export interface ProfileData {
  user: IUserAccountGeneral;
  groups: Circle[];
  subscriptions: { data: StripeSubscription[]; object: string; has_more: boolean; url: string };
  paymentMethods: { data: StripePaymentMethod[]; object: string; has_more: boolean; url: string };
  invoices: { data: CustomerStripeInvoice[]; object: string; has_more: boolean; url: string };
}
